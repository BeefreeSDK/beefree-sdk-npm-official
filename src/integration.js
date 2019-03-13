import Bee from './bee'
import { clientId, clientSecret } from '../config/integrationKeys'

const BEE_TEMPLATE_URL = 'https://rsrc.getbee.io/api/templates/m-bee'

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

const beeConfig = {
  uid: 'test1-clientside',
  container: 'bee-plugin-container',
  autosave: 15,
  language: 'en-US',
  specialLinks,
  mergeTags,
  mergeContents,
  onSave: (jsonFile, htmlFile) => {
    console.log('onSave', jsonFile, htmlFile)
  },
  onSaveAsTemplate: (jsonFile) => {
    console.log('onSaveAsTemplate', jsonFile)
  },
  onAutoSave: (jsonFile) => {
    console.log(`${new Date().toISOString()} autosaving...`)
    window.localStorage.setItem('newsletter.autosave', jsonFile)
  },
  onSend: (htmlFile) => {
    console.log('onSend', htmlFile)
  },
  onError: (errorMessage) => {
    console.log('onError ', errorMessage)
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
  reader.readAsText(templateFile)
}

const addEvents = () => {
  window.document.getElementById('trigger-load')
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
}

beeTest.getToken(clientId, clientSecret)
.then(() => fetch(new Request(BEE_TEMPLATE_URL, { method: 'GET' })))
.then(res => res.json())
.then(template => {
  beeTest.start(beeConfig, template)
   .then(instance =>
     console.log('promise resolve return instance', instance))
  addEvents()
})
