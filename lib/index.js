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
  console.log('doing some shit');
  console.log(options);
  source = new _cleanCss.default({}).minify(source);
  console.log(source);

  var injectShadowStyles = function injectShadowStyles(customElementTagName, source) {
    var customElementDomNode = document.querySelector(customElementTagName);
    console.log("trying to find ".concat(customElementTagName));

    var injectCssIntoShadowRoot = function injectCssIntoShadowRoot(shadowRoot) {
      console.log(shadowRoot);
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
        console.log("we've got a shadow root, baby!");
        clearInterval(findShadowRootInterval);
        injectCssIntoShadowRoot(customElementDomNode.shadowRoot);
      } else {
        console.log('no shadow root, dog');
        shadowRootDetectionAttemptCount++;
      }
    };

    var findShadowRootInterval = setInterval(detectShadowRootRendered, 1);
    console.log(customElementDomNode);
  };

  return "export default String((".concat(injectShadowStyles, ")(\"").concat(options.customElementTagName, "\", \"").concat(source.styles, "\"))");
}