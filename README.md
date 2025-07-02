![alt bee-plugin-logo](https://developers.beefree.io/static/assets/img/bee-plugin-logo.png)

# Official Beefree SDK wrapper [![CI](https://github.com/BeefreeSDK/beefree-sdk-npm-official/actions/workflows/cy.yml/badge.svg?branch=master)](https://github.com/BeefreeSDK/beefree-sdk-npm-official/actions/workflows/cy.yml)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NPM](https://nodei.co/npm/@beefree.io/sdk.png?compact=true)](https://npmjs.org/package/@beefree.io/sdk)


A simple module to use the [Beefree SDK](http://developers.beefree.io)

## Why Beefree SDK?
Choose a reliable, easy-to-integrate multi-content type digital platform you can build on. **Beefree SDK** is more than an embeddable visual builder with a great drag-and-drop user experience. It’s a reliable, highly customizable email, landing page & popup builder.

Go from proof-of-concept to production in days, not months. **Beefree SDK** can be highly customized in how it looks, what it does, and how it interacts with your application. Deliver your business exactly what it needs with a small development effort.

You can embed it into your application!

Visit our developer documentation [https://docs.beefree.io/]


## How to use it

- go to the developer portal [https://developers.beefree.io/signup](https://developers.beefree.io/signup)
- sign up for the Free plan
- create your application
- get the clientId and the clientSecret

## Demo

It's free to use on ['https://beefree.io'](https://beefree.io): you don't even need to create an account of any kind.


## Do you want to try out an integration locally?
This project comes with an example integration to run the SDK builder locally.  
It uses the SDK sources from the `/src` folder.

1. Install Nodejs (also npm, which should come with nodejs already) or Yarn.
2. clone this repository:
   - `git clone https://github.com/BeefreeSDK/beefree-sdk-npm-official.git`
3. `npm install` or `yarn install` (if you have it installed) in the folder cloned
4. rename the local `.env.sample` file to `.env`
5. run `npm start` or `yarn start`
6. Open http://localhost:8081 in your favourite browser.
7. Have fun!
> This demo integration is primarily meant for development purpose on the sources if the Beefree SDK NPM package.

## How to use this module for your own

### install

> You can either install it with [npm](https://nodejs.org) or [yarn](https://yarnpkg.com).

```sh
npm install --save @beefree.io/sdk
```
or
```sh
yarn add @beefree.io/sdk
```

## Initialize the builder
### Get token(clientId, clientSecret)
> You need to be authorized to start using the editor: Beefree help documentation portal [has a nice post](https://docs.beefree.io/beefree-sdk/readme/installation) explaining how to do it

### Important Security Notice
**As of v9.0.0, the `getToken` method has been renamed to `UNSAFE_getToken`.**  
This change makes it clear that this method is intended **only** for quick start tutorials, POCs, and local testing.  
To protect your secret key, we strongly recommend implementing `getToken` on the **server-side** in all production environments.

Pass your credential on `UNSAFE_getToken` method and start the SDK in the returning promise. Example below:

```js
import BeefreeSDK from '@beefree.io/sdk'

// Put your credentials in the .env file
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const beeConfig = {...}

const template = {...}
const beeTest = new BeefreeSDK(token, authConfiguration)

beeTest.UNSAFE_getToken(clientId, clientSecret)
  .then(() => beeTest.start(beeConfig, template))

```

### new Bee(token, authConf?)
> Initialize the BEE instance with a server side generated token

```js

import BeefreeSDK from '@beefree.io/sdk'

const authConf = {...}
const beeConfig = {...}
const template = {...}

// You can add your personal configuration, if you omit some properties, the builder will use its default configuration
const authConf = {
  authUrl: process.env.YOUR_AUTH_URL,
  beePluginUrl: process.env.YOUR_HOST_URL
}
const builder = new BeefreeSDK(token, authConf)
builder.start(beeConfig, template)
```

## Configuring the editor (beeConfig)
> It requires a configuration for using the editor, beefree help documentation portal [has a nice post](https://docs.beefree.io/beefree-sdk/getting-started/readme/installation/configuration-parameters) explaining how to do it

Here is an example of the configuration; just read the official documentation for an extended version.

```js

const beeConfig = {
  container: 'beefree-sdk-container', // Identifies the id of div element that contains the Beefree SDK builder
  language: 'en-US',
  onSave: (jsonFile, htmlFile) => {
    console.log('onSave', jsonFile, htmlFile)
  },
  onSaveAsTemplate: (jsonFile) => {
    console.log('onSaveAsTemplate', jsonFile)
  },
  onSend: (htmlFile) => {
    console.log('onSend', htmlFile)
  },
  onError: (errorMessage) => {
    console.log('onError ', errorMessage)
  }
}

```

## Template JSON
> It requires an initial template to start editing. Learn more [here](http://help.beefree.io/hc/en-us/articles/203135882-Sample-code-and-templates)

Some json avaible here  [https://github.com/BeefreeSDK/beefree-sdk-assets-templates]([https://github.com/BEE-Plugin/BEE-FREE-templates](https://github.com/BeefreeSDK/beefree-sdk-assets-templates))

## After you have started the builder it's possible to trigger this method

## Methods
### start(beeConfig, template, endpoint, options)
After the initialization you can call start to load the builder on the page; the method needs two parameters:

- BEE configuration (required - js object)
- Template (required - JSON)
- Endpoint (optional - string or null)
- Options (optional - js object e.g. `{ shared: true }`)

this returns a promise that is resolved after we call the builder's start function



### load(template)
This changes the template; call `load` with the new template

### reload(template)
This changes the template by trigging the loading dialog; just call `reload` with the new template

### save()
This calls the Beefree SDK `save` method, which in turn will trigger the callback `onSave` defined on the configuration for getting fresh HTML of the email and the JSON template updated.

### saveAsTemplate()
This calls the Beefree SDK `saveAsTemplate` method, which in turn will trigger the callback onSaveAsTemplate defined in the configuration for getting only the current JSON of the instance.

### send()
This calls the Beefree SDK `send` method, which in turn will trigger the callback send defined in the configuration for getting only the current html of the instance.

### preview()
This calls the Beefree SDK `preview` method, which triggers the preview modal inside the editor.

### toggleStructure()
This calls the Beefree SDK `toggleStructure` method, which toggles the structure helper on the editor's stage.

### toggleComments()
This calls the Beefree SDK `toggleStructure` method, which toggles the comments section on the editor's sidebar.

### togglePreview()
This calls the Beefree SDK `togglePreview` method, which opens/closes the message preview behavior within the editor.

### showComment(uuid)
This calls the Beefree SDK `showComment` method, which opens a specific comment and scrolls the stage to the related element. The method needs one parameter, a comment 'uuid' as a string.

### loadConfig(ClientConfig)
This calls the Beefree SDK `loadConfig` method, which reloads the JSON configuration used to initialize the builder.

### join(beeConfig, sessionId)
After the initialization you can call join to load the builder on the page and join a collaborative editing session; the method needs two parameters:

- BEE configuration (JS object)
- SessionID (string obtained from `onSessionStarted` callback)

this returns a promise that has resolved after we call the builder's start function. Visit [the docs](https://docs.beefree.io/co-editing/) for more details about co-editing.

### loadWorkspace(type)
This call the Beefree SDK `loadWorkspace` method, which accepts one of the following parameters: 'default'|'mixed'|'amp_only'|'html_only'. Visit [the docs](https://docs.beefree.io/workspaces/) for more details about workspaces.

### loadStageMode(arg)
This call the Beefree SDK `loadStageMode` method, which accepts an object parameter with the following structure: { mode: 'desktop'|'mobile', display: 'blur'|'hide'}. Visit [the docs](https://docs.beefree.io/mobile-design-mode/#customization-options) for more details about design mode.

### loadConfig(ClientConfig)
This calls the Beefree SDK `loadConfig` method, which reloads the JSON configuration used to initialize the builder.

### updateToken(updateTokenArgs)
This calls the Beefree SDK `updateToken` method, and permits the refresh of the access token.

### getConfig()
This calls the Beefree SDK `getConfig` method and returns the clientConfig used by the SDK. 

[node]: https://nodejs.org/en/
[npm]:  https://www.npmjs.com/
[yarn]: https://yarnpkg.com
