"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _loaderUtils = require("loader-utils");

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
};

function _default(source) {
  var options = (0, _loaderUtils.getOptions)(this);
  (0, _schemaUtils.default)(schema, options, 'Example Loader'); // Apply some transformations to the source...

  console.log('doing some shit');
  return "export default (function() { console.log('test'); })()";
}