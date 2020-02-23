# Language

[![ru](./maintenance/docs/repo-readme/res/lang-select-ru.png)](./maintenance/docs/repo-readme/ru.md)
[![en](./maintenance/docs/repo-readme/res/lang-select-en.png)](./README.md)
[![help](./maintenance/docs/repo-readme/res/lang-select-help.png)](./maintenance/docs/misc/help-with-translation.md)

# Webpack template

[![DeepScan grade](https://deepscan.io/api/teams/5038/projects/6835/branches/59639/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5038&pid=6835&bid=59639)

## Overview

My webpack template with:
- Debug dev server
- Babel preset
- async/await. It adds additional 900kB, so if you want to disable it - delete `require("babel-polyfill")` in index.js
- logger instead default console (cgn.logger.log)
- eslinter. Also [jsdoc plugin](https://github.com/gajus/eslint-plugin-jsdoc) for it
- tests, coverage stats

## Building/Running/Tests

- `npm install` — for first start
- `npm watch` — debug dev-server
- `npm run manual-test-watch` — debug manual tests on dev-server
- `npm run unit-test` — debug auto tests in node.js (for CI)
- `npm run unit-test-watch` — debug auto tests in browser with dev-server
- `npm run build-prod` — build for production
- `npm run build-dev` — build for debug
- `npm run manual-test-build` — build manual tests
- `npm run docs` — docs

## Usage

### Tests

=== Manual tests

`npm run manual-test-watch` - environment where you can write your own /whatever you want/ cases.

How to add new case:
 - Create file `./src/test/manual/*.mtest.js`
 - Add new require entry in `/src/test/manual.js::testCasesList`

=== Auto tests

`npm run unit-test`, `npm run unit-test-watch` - mocha tests. First in node (For testing you code in CI), second in browser with interactive, hot reload, etc.

How to add new case:
 - Create file `./src/test/auto/*.test.js`
 - Add new require entry in `/src/test/auto.js`

### Builds

 all builds lays in ./dist folder

`npm run build-prod` builds in production mode with minification, without source maps.
`npm run build-dev` builds with source maps
`npm run manual-test-build` builds manual tests with source maps

### Docs

`npm run docs` builds jsdoc docs. You can find it in ./docs folder
