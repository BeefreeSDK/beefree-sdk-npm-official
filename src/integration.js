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

const userInput = (message, sample) => function handler(resolve, reject) {
  const data = prompt(message, JSON.stringify(sample));
  return data == null || data === ''
    ? reject()
    : resolve(JSON.parse(data));
}

const contentDialog = {
  filePicker: {
    label: 'Picker',
    handler: userInput('Enter image path:', {
      url: 'https://d1oco4z2z1fhwp.cloudfront.net/templates/default/113/rocket-color.png',
    })
  },
}

function save(filename, content) {
  saveAs(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
    filename
  );
}

function getParameterByName(name, url) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  var val = decodeURIComponent(results[2].replace(/\+/g, " "));
  return val;
}

const beeConfig = {
  uid: 'test1-clientside',
  container: 'bee-plugin-container',
  username: getParameterByName('username') || 'Test User',
  userColor: `#${getParameterByName('userColor') || '00aba5'}`,
  commenting: getParameterByName('commenting') == 'true' ? true : false,
  userHandle: getParameterByName('userHandle') || '2468',
  autosave: 15,
  language: 'en-US',
  specialLinks,
  mergeTags,
  mergeContents,
  contentDialog,
  onSave: (jsonFile, htmlFile) => {
    console.log('onSave', jsonFile, htmlFile)
    save('newsletter-template.html', htmlFile)
  },
  onLoad: (jsonFile) => {
    console.error('*** [integration] loading a new template...', jsonFile);
  },
  onSaveAsTemplate: (jsonFile) => {
    console.log('onSaveAsTemplate', jsonFile)
    save('newsletter-template.json', jsonFile)
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
  },
  onSessionStarted: function (sessionInfo) {
    console.warn('*** [integration] --> (onSessionStarted) ', sessionInfo);
    prompt("press ctrl+c to copy the session ID", sessionInfo.sessionId)
  },
  onSessionChange: function (sessionInfo) {
    console.warn('*** [integration] --> (onSessionChange) ', sessionInfo);
  },
}

const beeTest = new Bee()

const loadTemplate = (e, method) => {
  const templateFile = e.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    const templateString = reader.result
    const template = JSON.parse(templateString)
    if (method === 'load') {
      beeTest.load(template)
    } else {
      beeTest.reload(template)
    }    
  }
  document.getElementById('load-template').value = ''
  document.getElementById('reload-template').value = ''
  reader.readAsText(templateFile)
}

const addEvents = () => {
  window.document.getElementById('load-template')
    .addEventListener('change', e => loadTemplate(e, 'load'), false)

  window.document.getElementById('reload-template')
    .addEventListener('change', e => loadTemplate(e, 'reload'), false)

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

  window.document.getElementById('trigger-loadWorkspace')
    .addEventListener('click', () => beeTest.loadWorkspace('mixed'), false)
}

const conf = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }

beeTest.getToken(clientId, clientSecret, conf)
  .then(() => fetch(new Request(BEE_TEMPLATE_URL, { method: 'GET' })))
  .then(res => res.json())
  .then(template => {
    const sessionId = getParameterByName('sessionId')
    const shared = getParameterByName('shared') === 'true'
    if (sessionId) {
      beeTest.join(beeConfig, sessionId, null)
    } else {
      beeTest.start(beeConfig, template, null, { shared })
        .then(instance => console.log('promise resolve return instance', instance))
    }
    addEvents()
  })
