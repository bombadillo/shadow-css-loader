"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _loaderUtils = require("loader-utils");

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _cleanCss = _interopRequireDefault(require("clean-css"));

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
  (0, _schemaUtils.default)(schema, options, 'Example Loader');
  source = new _cleanCss.default({}).minify(source);

  var injectShadowStyles = function injectShadowStyles(customElementTagName, source) {
    var customElementDomNode = document.querySelector(customElementTagName);

    var injectCssIntoShadowRoot = function injectCssIntoShadowRoot(shadowRoot) {
      var styleTag = document.createElement('style');
      styleTag.textContent = source;
      shadowRoot.appendChild(styleTag);
    };

    var shadowRootDetectionAttemptLimit = 10;
    var shadowRootDetectionAttemptCount = 0;

    var detectShadowRootRendered = function detectShadowRootRendered() {
      if (shadowRootDetectionAttemptCount >= shadowRootDetectionAttemptLimit) {
        clearInterval(findShadowRootInterval);
        return;
      }

      if (customElementDomNode.shadowRoot) {
        clearInterval(findShadowRootInterval);
        injectCssIntoShadowRoot(customElementDomNode.shadowRoot);
      } else {
        shadowRootDetectionAttemptCount++;
      }
    };

    var findShadowRootInterval = setInterval(detectShadowRootRendered, 1);
  };

  return "export default String((".concat(injectShadowStyles, ")(\"").concat(options.customElementTagName, "\", \"").concat(source.styles, "\"))");
}