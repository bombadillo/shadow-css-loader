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

  console.log('doing some shit');

  console.log(options);

  source = new CleanCSS({}).minify(source);
  console.log(source);

  var injectShadowStyles = function(customElementTagName, source) {
    var customElementDomNode = document.querySelector(customElementTagName);

    console.log(`trying to find ${customElementTagName}`);

    var injectCssIntoShadowRoot = shadowRoot => {
      console.log(shadowRoot);
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

  return `export default String((${injectShadowStyles})("${
    options.customElementTagName
  }", "${source.styles}"))`;
}
