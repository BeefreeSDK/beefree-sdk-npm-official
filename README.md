# Official BEE plugin wrapper [![Build Status](https://travis-ci.org/samuv/bee-plugin.svg?branch=master)](https://travis-ci.org/samuv/bee-plugin.svg?branch=master)
A simple module to use the [BEE editor](http://beefree.io)

## What is BEE?
Long story short: it's a drag-&-drop editor to author responsive design emails.
It makes it easy and quick to create a great-looking email message that can be used to send a company newsletter, announce a new product, promote a sale, etc.

You can embed it into your application :)
Using with the BEE free version, you can embed the editor anywhere, regardless of the pricing model.

## How to use it

- go to the developer portal [https://developers.beefree.io/signup](https://developers.beefree.io/signup)
- sign up with the free plan
- create your application
- get the clientId and the clientSecret

## Demo

It's free to use on ['https://beefree.io'](https://beefree.io): you don't even need to create an account of any kind.


## Do you want to try out an integration locally?

1. Install Nodejs (also npm, which should come with nodejs already).
2. clone this repository
3. `npm install` or `yarn install`(if you have it installed) in the folder cloned
4. put your `clientId` and `clientSecret` in ./config/integrationKeys.js
5. `npm start`
6. Open `http://localhost:3030`.
7. Have fun!


## How to use this module for your own

### install

> You can either install it with [npm](https://nodejs.org) or [yarn](https://yarnpkg.com).

```sh
npm install --save @mailupinc/bee-plugin
```
or
```sh
yarn add @mailupinc/bee-plugin
```

## Get token
> You need to be authorized to start using the editor: beefree help documentation portal [has a nice post](http://help.beefree.io/hc/en-us/articles/202991192-Initializing-the-plugin) explaining how to do it

It's not really raccomended to do it client side but it's possible with the module, just call getToken

```js
import Bee from '@mailupinc/bee-plugin'

const beeTest = new Bee()

beeTest.getToken(clientId, clientSecret)

```

## Initialize the plugin
> Initialize the BEE instance with a server side generated token

```js
import Bee from '@mailupinc/bee-plugin'

const beeTest = new Bee(token)

```

## Configuring the editor
> It requires a configuration for using the editor, beefree help documentation portal [has a nice post](http://help.beefree.io/hc/en-us/articles/202991192-Initializing-the-plugin) explaining how to do it

Here is an example of the configuration; just read the official documentation for an extended version

```js

const beeConfig = {
  uid: 'test1-clientside', //needed for identify resources of the that user and billing stuff
  container: 'bee-plugin-container', //Identifies the id of div element that contains BEE Plugin
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
> It requires an initial template for start editing, learn more [here](http://help.beefree.io/hc/en-us/articles/203135882-Sample-code-and-templates)

Some json avaible here  [https://github.com/BEE-Plugin/BEE-FREE-templates](https://github.com/BEE-Plugin/BEE-FREE-templates)

## Methods

### getToken(clientId, clientSecret)

Pass your keys on parms and return a promise; example:

```js
const clientId = 'MYclientId'
const clientSecret = 'MYclientSecret'
const beeConfig = {...}
const template = {...}
const beeTest = new Bee()

beeTest.getToken(clientId, clientSecret)
  .then(() => beeTest.start(beeConfig, template))

```

### new Bee(token)
Initializes a class with the token that are stored on constructor

### start(beeConfig, template, endpoint, options)
After the initizalization you can call start for creating the editor on the page; the method needs two parameters:

- BEE configuration (required - js object)
- Template (required - JSON)
- Endpoint (optional - string or null)
- Options (optional - js object e.g. `{ shared: true }`)

this return a promise that has resolved after we call the plugin start function

## After you have started the editor it's possible to trigger this methods

### load(template)
This changes the template; just call `load` with the new template

### reload(template)
This changes the template with trigging the loading dialog; just call `reload` with the new template

### save()
This calls BeePlugin `save`, which in turn will trigger the callback `onSave` defined on the configuration for getting fresh HTML of the email and the JSON template updated.

### saveAsTemplate()
This calls BeePlugin `saveAsTemplate`, which in turn will trigger the callback onSaveAsTemplate defined in the configuration for getting only the current JSON of the instance.

### send()
This calls BeePlugin `send`, which in turn will trigger the callback send defined in the configuration for getting only the current html of the instance.

### preview()
This calls BeePlugin `preview`, which trigger the preview modal inside the editor.

### toggleStructure()
This calls BeePlugin `toggleStructure`, which toggle the structure helper on the editor's stage.

### toggleComments()
This calls BeePlugin `toggleStructure`, which toggle the comments section on the editor's sidebar.

### togglePreview()
This calls BeePlugin `togglePreview`, which open/close the message preview behavior within the editor.

### showComment(uuid)
This calls BeePlugin `showComment`, which opens a specific comment and scrolls the stage to the related element. The method needs one parameter, a comment 'uuid' as a string.

### loadConfig(ClientConfig)
This calls BeePlugin `loadConfig`, which reloads the JSON configuration used to initialize the plugin.

### join(beeConfig, sessionId)
After the initialization you can call join for creating the editor on the page and joining a collaborative editing session; the method needs two parameters:

- BEE configuration (JS object)
- SessionID (string obtained from `onSessionStarted` callback)

this return a promise that has resolved after we call the plugin start function. Visit [the docs](https://docs.beefree.io/co-editing/) for more details about co-editing.

### loadWorkspace(type)
This call BeePlugin `loadWorkspace`, which accepts one of the following parameters: 'default'|'mixed'|'amp_only'|'html_only'. Visit [the docs](https://docs.beefree.io/workspaces/) for more details about workspaces.

### loadStageMode(arg)
This call BeePlugin `loadStageMode`, which accepts an object parameter with the following structure: { mode: 'desktop'|'mobile', display: 'blur'|'hide'}. Visit [the docs](https://docs.beefree.io/mobile-design-mode/#customization-options) for more details about design mode.

## Test (WIP)
```sh
npm test
```
or
```sh
yarn test
```


[node]: https://nodejs.org/en/
[npm]:  https://www.npmjs.com/
[yarn]: https://yarnpkg.com
