/**
 * @file events_manager.js
 * @author tynrare
 * @version 1
 * @module Core/Utils/EventsManager
 */

import CoreEvents from 'events';
//импортим напрямую просто чтоб избежать рекурсивных включений
import logger from '@core/utils/logger.js';

const MAX_LISTENERS = 100;

/**
 * singletone class for managing events
 *
 * @static
 */
class EventsManager extends CoreEvents {
	#listenersCount = 0;

	#listeners = new Map();

	constructor() {
		super();
		this.setMaxListeners(MAX_LISTENERS);
	}

	/**
	 * init function call it somewhere in game clean/enter
	 */
	init() {
		this.#listenersCount = 0;
		this.#listeners.forEach(({ id, func }) => {
			this.removeListener(id, func);
		});
	}

	/**
	 * disables all listeners in selected group
	 *
	 * @param {string} group group to disable
	 */
	discard(group) {
		this.#listeners.forEach((listener) => {
			if (listener.group === group) {
				this.removeListener(listener.id, listener.func);
			}
		});
	}

	/**
	 * adds listener
	 *
	 * @param {string} id id of event
	 * @param {Function} callback callback function
	 * @param {*?} [context=null] scope to apply function to
	 * @param {string} [group='default'] group to add listener to. Used for 'discard()' cleanups
	 * @returns {number} id of listener
	 */

	/* eslint-disable max-params */
	on(id, callback, context = null, group = 'default') {
		logger.log(
			'silly',
			`listen (${group}) event #${this.#listenersCount} "${id}" for function`,
			callback
		);

		let func = callback;
		if (context) {
			func = func.bind(context);
		}

		this.#listeners.set(++this.#listenersCount, { id, func, group });
		super.addListener(id, func);

		return this.#listenersCount;
	}

	/**
	 * according to docs (https://nodejs.org/api/events.html) addListener is alias for on(), but it isn't. So here it alias for on()
	 *
	 * @param {string} id id of event
	 * @param {Function} callback callback function
	 * @param {*?} [context=null] scope to apply function to
	 * @param {string} [group='default'] group to add listener to. Used for 'discard()' cleanups
	 * @returns {number} id of listener
	 */
	addListener(id, callback, context = null, group = 'default') {
		return this.on(id, callback, context, group);
	}
	/* eslint-enable max-params */

	/**
	 * removes listener. If you used addListener|on with 'context' argument, you cant removeListener by 'callback', only by id!
	 *
	 * @param {number|string} id id of event or id that addListener returns
	 * @param {Function?} callback original callback listener used for event. null if you want to remove listener by listener id
	 */
	removeListener(id, callback) {
		if (callback) {
			logger.log('silly', `unlisten event "${id}" for function`, callback);

			super.removeListener(id, callback);
		} else {
			if (!this.#listeners.has(id)) {
				logger.log('silly', `tried to unlisten event #${id} which not exists`);

				return;
			}

			const listener = this.#listeners.get(id);
			logger.log('silly', `unlisten event #${id} ("${listener.id}") for function`, listener.func);

			super.removeListener(listener.id, listener.func);
			this.#listeners.delete(id);
		}
	}

	/**
	 * same as removeListener
	 *
	 * @param {number|string} id id of event or id that addListener returns
	 * @param {Function?} callback original callback listener used for event. null if you want to remove listener by listener id
	 */
	off(id, callback) {
		this.removeListener(id, callback);
	}
}

export default new EventsManager();
