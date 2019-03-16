import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import CleanCSS from 'clean-css';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string'
    }
  }
};

export default function(source) {
  const options = getOptions(this);

  validateOptions(schema, options, 'Example Loader');

  source = new CleanCSS({}).minify(source);

  var injectShadowStyles = function(customElementTagName, source) {
    var customElementDomNode = document.querySelector(customElementTagName);

    var injectCssIntoShadowRoot = shadowRoot => {
      var styleTag = document.createElement('style');
      styleTag.textContent = source;
      shadowRoot.appendChild(styleTag);
    };

    const shadowRootDetectionAttemptLimit = 10;
    let shadowRootDetectionAttemptCount = 0;
    var detectShadowRootRendered = () => {
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

  return `export default String((${injectShadowStyles})("${
    options.customElementTagName
  }", "${source.styles}"))`;
}
