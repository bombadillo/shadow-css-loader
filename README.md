[![npm version](https://badge.fury.io/js/shadow-css-loader.svg)](https://badge.fury.io/js/shadow-css-loader)
[![install size](https://packagephobia.now.sh/badge?p=shadow-css-loader)](https://packagephobia.now.sh/result?p=shadow-css-loader)

# shadow-css-loader

Load css using webpack within a shadow DOM.

# Getting Started

Install the package

`npm install --save-dev shadow-css-loader`

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

Now you can import css files within your app in a shadow DOM:

**app.js**

```js
import css from 'app.css';
```

## Options

|                        Name                         |         Type          |     Default     |                          Description                         |
| :-------------------------------------------------: | :-------------------: | :-------------: | :------------------------------------------------------------|
| **[`customElementTagName`](#customElementTagName)** |      `{string}`       |   `undefined`   | The tag name of the custom element containing the shadow DOM |

### `customElementTagName`

Type: `string`
Default: `undefined`

The tag name of the custom element containing the shadow DOM. The css styles will be injected into the shadow DOM of this element.

**webpack.config.js**
```
{
  test: /\.css$/,
  use: [
    {
      loader: 'shadow-css-loader',
      options: {
        customElementTagName: 'my-element'
      }
    }
  ]
}
```
