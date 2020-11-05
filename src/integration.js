import Bee from './bee'
import { clientId, clientSecret } from '../config/integrationKeys'

const BEE_TEMPLATE_URL = 'https://rsrc.getbee.io/api/templates/m-bee'

const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

const specialLinks = [{
  type: 'unsubscribe',
  label: 'SpecialLink.Unsubscribe',
  link: 'http://[unsubscribe]/'
}, {
  type: 'subscribe',
  label: 'SpecialLink.Subscribe',
  link: 'http://[subscribe]/'
}]
const mergeTags = [{
  name: 'tag 1',
  value: '[tag1]'
}, {
  name: 'tag 2',
  value: '[tag2]'
}]
const mergeContents = [{
  name: 'content 1',
  value: '[content1]'
}, {
  name: 'content 2',
  value: '[content1]'
}]

function userInput(message, sample) {
  return function handler(resolve, reject) {
    var data = prompt(message, JSON.stringify(sample));
    return data == null || data == ""
      ? reject()
      : resolve(JSON.parse(data));
  };
}

const contentDialog = {
  filePicker: {
    label: 'Picker',
    handler: (reject, resolve, args) => {
      console.log('reject: ', reject)
      console.log('resolve: ', resolve)
      console.log('args: ', args)
      userInput('Enter image path:', {
        url: 'https://d1oco4z2z1fhwp.cloudfront.net/templates/default/113/rocket-color.png',
      })
    }
  },
}

const beeConfig = {
  uid: 'test1-clientside',
  container: 'bee-plugin-container',
  autosave: 15,
  language: 'en-US',
  specialLinks,
  mergeTags,
  mergeContents,
  contentDialog,
  onSave: (jsonFile, htmlFile) => {
    console.log('onSave', jsonFile, htmlFile)
  },
  onLoad: (jsonFile) => {
    console.error('*** [integration] loading a new template...', jsonFile);
  },
  onSaveAsTemplate: (jsonFile) => {
    console.log('onSaveAsTemplate', jsonFile)
  },
  onAutoSave: (jsonFile) => {
    console.log(`${new Date().toISOString()} autosaving...,`, jsonFile)
    window.localStorage.setItem('newsletter.autosave', jsonFile)
  },
  onSend: (htmlFile) => {
    console.log('onSend', htmlFile)
  },
  onError: (errorMessage) => {
    console.log('onError ', errorMessage)
  }, 
  onChange: (msg, response) => {
    console.warn('*** [integration] (OnChange) message > ', msg, response);
  },
  onWarning: (a, b) => {
    console.warn('*** [integration] (OnWarning) message a > ', a);
  },
  onPreview: () => {
    console.warn('*** [integration] --> (onPreview) ');
  },
  onTogglePreview: () => {
    console.warn('*** [integration] --> (onTogglePreview) ');
  }
}


const beeTest = new Bee()

const loadTemplate = (e) => {
  const templateFile = e.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    const templateString = reader.result
    const template = JSON.parse(templateString)
    beeTest.load(template)
  }

  document.getElementById('choose-template').value = ''
  reader.readAsText(templateFile)
}

const addEvents = () => {
  window.document.getElementById('choose-template')
    .addEventListener('change', loadTemplate, false)

  window.document.getElementById('trigger-save')
    .addEventListener('click', () => beeTest.save(), false)

  window.document.getElementById('trigger-send')
    .addEventListener('click', () => beeTest.send(), false)

  window.document.getElementById('trigger-saveAsTemplate')
    .addEventListener('click', () => beeTest.saveAsTemplate(), false)

  window.document.getElementById('trigger-preview')
    .addEventListener('click', () => beeTest.preview(), false)

  window.document.getElementById('trigger-toggleStructure')
    .addEventListener('click', () => beeTest.toggleStructure(), false)

  window.document.getElementById('trigger-preview')
    .addEventListener('click', () => beeTest.togglePreview(), false)

  window.document.getElementById('trigger-toggleComments')
    .addEventListener('click', () => beeTest.toggleComments(), false)

  window.document.getElementById('trigger-reload')
    .addEventListener('click', () => beeTest.reload(), false)

  window.document.getElementById('trigger-join')
    .addEventListener('click', () => beeTest.join(), false)

  window.document.getElementById('trigger-loadWorkspace')
    .addEventListener('click', () => beeTest.loadWorkspace('mixed'), false)

  window.document.getElementById('trigger-openFilePicker')
    .addEventListener('click', () => beeTest.openFilePicker(), false)
}

const conf = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }

beeTest.getToken(clientId, clientSecret, conf)
  .then(() => fetch(new Request(BEE_TEMPLATE_URL, { method: 'GET' })))
  .then(res => res.json())
  .then(template => {
    beeTest.start(beeConfig, template)
      .then(instance => console.log('promise resolve return instance', instance))
    addEvents()
  })
