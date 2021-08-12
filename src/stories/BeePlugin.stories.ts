import { Story, Meta } from '@storybook/html';
import { createBeePlugin } from './BeePlugin';
import Bee from '../index'
import { fetchTemplate } from '../services/api';


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

const beeConfig = {
  uid: 'test1-clientside',
  container: 'bee-plugin-container',
  username: 'Test User',
  userColor: '00aba5',
  commenting: 'true',
  userHandle:  '2468',
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
  },
  onSessionStarted: (sessionInfo) => {
    console.warn('*** [integration] --> (onSessionStarted) ', sessionInfo);
    prompt('press ctrl+c to copy the session ID', sessionInfo.sessionId)
  },
  onSessionChange: (sessionInfo) => {
    console.warn('*** [integration] --> (onSessionChange) ', sessionInfo);
  },
}

const BEE_TEMPLATE_URL = 'https://rsrc.getbee.io/api/templates/m-bee'
const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

const conf = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }

export default {
  title: 'Example/BeePlugin',
} as Meta;


const Template: Story = () => createBeePlugin()

export const BeePlugin = Template.bind({});

BeePlugin.args = {
  token: '',
};

const beeTest = new Bee()

console.log('PLUGIN_CLIENT_ID --> ', process.env.PLUGIN_CLIENT_ID)
console.log('PLUGIN_CLIENT_SECRET --> ', process.env.PLUGIN_CLIENT_SECRET)

beeTest.getToken(process.env.PLUGIN_CLIENT_ID, process.env.PLUGIN_CLIENT_SECRET, conf)
  .then(() => fetchTemplate({ templateUrl: BEE_TEMPLATE_URL }))
  .then(res => res.data.page)
  .then(template => {
    beeTest.start(beeConfig, template, '', { shared: false })
    .then(instance => {      
      console.log('promise resolve return instance', instance)
   })
})
