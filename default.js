/**
 * This file allow you to import proxery "the typescript/ES6 way" with the default options. Example: `import proxery from 'proxery/default';` is the same as `const proxery = require('proxery')();`
 */

module.exports = require('.')();
module.exports.default = module.exports;
