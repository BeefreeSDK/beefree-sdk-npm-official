import Bee from '../src/index'
import { 
  IBeeConfig, IMergeContent, IMergeTag, ISpecialLink, 
  LoadWorkspaceOptions, StageDisplayOptions, StageModeOptions 
} from '../src/types/bee';
declare let saveAs: any;

const BEE_TEMPLATE_URL = 'https://rsrc.getbee.io/api/templates/m-bee'
const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

const specialLinks: ISpecialLink[] = [{
  type: 'unsubscribe',
  label: 'SpecialLink.Unsubscribe',
  link: 'http://[unsubscribe]/'
}, {
  type: 'subscribe',
  label: 'SpecialLink.Subscribe',
  link: 'http://[subscribe]/'
}]
const mergeTags: IMergeTag[] = [{
  name: 'tag 1',
  value: '[tag1]'
}, {
  name: 'tag 2',
  value: '[tag2]'
}]
const mergeContents: IMergeContent[] = [{
  name: 'content 1',
  value: '[content1]'
}, {
  name: 'content 2',
  value: '[content1]'
}]

const userInput = (message: string, sample) => function handler(resolve, reject) {
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

function save(filename: string, content) {
  saveAs(
    new Blob([content], { type: 'text/plain;charset=utf-8' }),
    filename
  );
}

function getParameterByName(name) {
  const newUrl = window.location.href;
  name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(newUrl);
  if (!results) return '';
  if (!results[2]) return '';
  const val = decodeURIComponent(results[2].replace(/\+/g, ' '));
  return val;
}

const beeConfig :IBeeConfig = {
  uid: 'test1-clientside',
  container: 'bee-plugin-container',
  username: getParameterByName('username') || 'Test User',
  userColor: `#${getParameterByName('userColor') || '00aba5'}`,
  commenting: getParameterByName('commenting') === 'true',
  userHandle: getParameterByName('userHandle') || '2468',
  autosave: 15,
  language: 'en-US',
  specialLinks,
  mergeTags,
  mergeContents,
  contentDialog,
  onSave: (_, htmlFile) => save('newsletter-template.html', htmlFile),
  onLoad: () => console.warn('*** [integration] loading a new template...'),
  onSaveAsTemplate: (json: Record<string, unknown>) => void save('newsletter-template.json', json),
  onAutoSave: (jsonFile) => {
    console.log(`${new Date().toISOString()} autosaving...,`, jsonFile)
    window.localStorage.setItem('newsletter.autosave', jsonFile)
  },
  onSend: (htmlFile) => console.log('onSend', htmlFile),
  onError: (errorMessage) => console.log('onError ', errorMessage),
  onChange: (msg, response) => console.warn('*** [integration] (OnChange) message --> ', msg, response),
  onWarning: (e) => console.warn('*** [integration] (OnWarning) message --> ', e.message),
  onPreview: () => console.warn('*** [integration] --> (onPreview) '),
  onTogglePreview: () => console.warn('*** [integration] --> (onTogglePreview) '),
  onSessionStarted: (sessionInfo) => {
    console.warn('*** [integration] --> (onSessionStarted) ', sessionInfo);
    prompt('press ctrl+c to copy the session ID', sessionInfo.sessionId)
  },
  onSessionChange: (sessionInfo) => console.warn('*** [integration] --> (onSessionChange) ', sessionInfo),
}

const beeTest = new Bee()

const loadTemplate = (e, method) => {
  const templateFile = e.target.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    const templateString = reader.result
    const template = JSON.parse(templateString as string)
    if (method === 'load') {
      beeTest.load(template)
    } else {
      beeTest.reload(template)
    }    
  }

  const loadTemplate = document.getElementById('load-template') as HTMLInputElement
  const reloadTemplate = document.getElementById('load-template') as HTMLInputElement

  loadTemplate.value = ''
  reloadTemplate.value = ''
  reader.readAsText(templateFile)
}

const addEvents = () => {
  window.document.getElementById('load-template')?.addEventListener('change', e => loadTemplate(e, 'load'), false)

  window.document.getElementById('reload-template')?.addEventListener('change', e => loadTemplate(e, 'reload'), false)

  window.document.getElementById('trigger-save')?.addEventListener('click', () => beeTest.save(), false)

  window.document.getElementById('trigger-send')?.addEventListener('click', () => beeTest.send(), false)

  window.document.getElementById('trigger-saveAsTemplate')?.addEventListener('click', () => beeTest.saveAsTemplate(), false)

  window.document.getElementById('trigger-preview')?.addEventListener('click', () => beeTest.preview(), false)

  window.document.getElementById('trigger-toggleStructure')?.addEventListener('click', () => beeTest.toggleStructure(), false)

  window.document.getElementById('trigger-preview')?.addEventListener('click', () => beeTest.togglePreview(), false)

  window.document.getElementById('trigger-toggleComments')?.addEventListener('click', () => beeTest.toggleComments(), false)

  window.document.getElementById('trigger-togglePreview')?.addEventListener('click', () => beeTest.togglePreview(), false)

  window.document.getElementById('trigger-showComment')?.addEventListener('click', () => beeTest.showComment('sample-uuid'), false)

  window.document.getElementById('trigger-loadWorkspace')?.addEventListener('click', () => beeTest.loadWorkspace(LoadWorkspaceOptions.MIXED), false)

  window.document.getElementById('trigger-loadStageMode')?.addEventListener(
    'click', () => beeTest.loadStageMode({ mode: StageModeOptions.DESKTOP, display: StageDisplayOptions.BLUR }
  ), false)
  
  window.document.getElementById('trigger-loadConfig')?.addEventListener('click', () => beeTest.loadConfig({
    rowsConfiguration: {
      emptyRows: true,
      defaultRows: true,
    }
  }), false)
}

const conf = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }
beeTest.getToken(process.env.PLUGIN_CLIENT_ID!, process.env.PLUGIN_CLIENT_SECRET!, conf)
  .then(() => fetch(new Request(BEE_TEMPLATE_URL, { method: 'GET' })))
  .then(res => res.json())
  .then(template => {
    const sessionId = getParameterByName('sessionId')
    const shared = getParameterByName('shared') === 'true'
    if (sessionId) {
      beeTest.join(beeConfig, sessionId, '')
    } else {
      beeTest.start(beeConfig, template, '', { shared })
        .then(instance => console.log('promise resolve return instance', instance))
    }
    addEvents()
  }).catch((error) => console.error('error during iniziatialization --> ', error))