import Bee from '../src/index'
import {
  BeeContentDialogs,
  ContentDefaults,
  CustomAttributes,
  IAddOnResponseImage,
  IBeeConfig, IMergeContent, IMergeTag, ISpecialLink,
  LoadWorkspaceOptions, ModuleDescriptorOrderNames, RowDisplayConditionsHandler, StageDisplayOptions, StageModeOptions, TokenStatus
} from '../src/types/bee';
declare let saveAs: any;

let accessToken = ''

const BEE_TEMPLATE_URL = 'https://rsrc.getbee.io/api/templates/m-bee'
//const BEE_BLANK_TEMPLATE_URL = 'http://storage.googleapis.com/pre-bee-app-integration-23fc44e0713f/blank.json'
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

const handleSpecialLinks = (resolve) => {
  const mockedSpecialLinks: ISpecialLink = { id: 1, label: 'Sample special links', link: 'http://sample.com', type: 'test'}
  return resolve(mockedSpecialLinks)
}

const handleMergeTags = (resolve) => {
  const mockedMergeTg: IMergeTag = { name: 'Sample merge tag', value:'Lorem Ipsum'}
  return resolve(mockedMergeTg)
}

const handleImageAddOnResponse = (resolve) => {
  const mockedAddOnResponse: IAddOnResponseImage = {
    type: 'image',
    value: {
      alt: 'Lorem Ipsum',
      dynamicSrc: '{{sample}}',
      href: 'https://picsum.photos/id/237/200/300',
      src: 'https://picsum.photos/id/237/200/300'
    }
  }
  return resolve(mockedAddOnResponse)
}
const handleRowDisplayConditionsResponse = (resolve) => {
  const mockedRowDisplayConditions: RowDisplayConditionsHandler = {
    after: 'sample-after',
    before: 'sample-before',
    description: 'sample-description',
    label: 'sample-label',
    type: 'sample-type',
  }
  return resolve(mockedRowDisplayConditions)
}

const contentDialogs: BeeContentDialogs = {
  filePicker: {
    label: 'Picker',
    handler: userInput('Enter image path:', {
      url: 'https://d1oco4z2z1fhwp.cloudfront.net/templates/default/113/rocket-color.png',
    })
  },
  specialLinks: {
    label: 'Special links',
    handler: handleSpecialLinks
  },
  mergeTags: {
    label: 'Merge Tags',
    handler: handleMergeTags
  },
  addOn: {
    label: 'Add On',
    handler: handleImageAddOnResponse
  },
  rowDisplayConditions: {
    label: 'Row Display Conditions',
    handler: handleRowDisplayConditionsResponse
  },
  customAttribute: {
    label: 'Custom Attributes',
    handler: userInput('Enter custom attributes:', {
      key: 'data-',
      value: 'sample',
      target: 'link'
    })
  }
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

const contentDefaults: ContentDefaults = {
  general: {
    contentAreaWidth: '666px'
  }
}

const customAttributes: CustomAttributes = {
  enableOpenFields: true,
  attributes: [
    {
      key: "data-country",
      value: ['us', 'italy', 'france', 'germany'],
      target: "link"
    },
    {
      key: "Deeplink",
      value: true,
      target: "link"
    },
    {
      key: "data-segment",
      value: ['travel', 'luxury'],
      target: "link"
    },
    {
      key: "data-descriptor",
      value: "",
      target: "link"
    },
    {
      key: "data-campaign",
      value: ['ua001', 'ua002'],
      target: "link"
    },
    {
      key: "class",
      target: "tag"
    }
  ]
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
  customAttributes,
  specialLinks,
  mergeTags,
  mergeContents,
  contentDialog: contentDialogs,
  contentDefaults,
  modulesGroups: [
    {
      label: 'Text',
      collapsable: true,
      collapsedOnLoad: false,
      modulesNames: [
        ModuleDescriptorOrderNames.HEADING,
        ModuleDescriptorOrderNames.PARAGRAPH,
        ModuleDescriptorOrderNames.LIST
      ]
    },
    {
      label: 'UI',
      collapsable: true,
      collapsedOnLoad: false,
      modulesNames: [
        ModuleDescriptorOrderNames.IMAGE,
        ModuleDescriptorOrderNames.BUTTON,
        ModuleDescriptorOrderNames.DIVIDER,
        ModuleDescriptorOrderNames.SPACER,
        ModuleDescriptorOrderNames.VIDEO,
        ModuleDescriptorOrderNames.ICONS,
        ModuleDescriptorOrderNames.HTML,
        ModuleDescriptorOrderNames.MENU,
        ModuleDescriptorOrderNames.SOCIAL,
      ]
    },
    {
      label: 'Others',
      collapsable: true,
      collapsedOnLoad: false,
      modulesNames: [
       'Dynamics Contents',
       'Gifs',
       'Stickers',
      ]
    }
  ],
  defaultModulesOrder: [
    'Button',
    'Html',
    'Icons',
    ModuleDescriptorOrderNames.VIDEO,
    ModuleDescriptorOrderNames.HTML,
    ModuleDescriptorOrderNames.IMAGE,
    'Stickers'
  ],
  customAssetsOptions: {
    pendo: { // sample pendo integration
      variables: {
        pendo_visitor_id: 123,
        pendo_visitor_email: '',
        pendo_visitor_role: 'admin',
        pendo_visitor_customer_id: 123,
        pendo_account_id: 122,
        pendo_account_state: 233,
        pendo_account_plan_level: 444,
      },
    },
  },
  sidebarPosition: 'left',
  rowDisplayConditions: [{
    isActive: true,
    after: '<test>',
    before: '</test>',
    className: 'myClassName',
    description: 'lorem ipsum',
    label: 'lorem ipsum',
    name: 'Lorem ipsum'
  }],
  onSave: (_, htmlFile) => save('newsletter-template.html', htmlFile),
  onLoad: (json) => console.warn('*** [integration] loading a new template... ', json),
  onSaveAsTemplate: (json) => void save('newsletter-template.json', json),
  onAutoSave: (jsonFile) => {
    console.log(`${new Date().toISOString()} autosaving...,`, jsonFile)
    window.localStorage.setItem('newsletter.autosave', jsonFile)
  },
  onSend: (htmlFile) => console.log('onSend', htmlFile),
  onError: (errorMessage) => console.log('onError ', errorMessage),
  onChange: (msg, response) => console.warn('*** [integration] (OnChange) message --> ', msg, response),
  onWarning: (e) => console.warn('*** [integration] (OnWarning) message --> ', e.message),
  onPreview: (opened) => console.warn(`*** [integration] --> (onPreview) preview open status ${opened}`),
  onTogglePreview: (toggled) => console.warn(`*** [integration] --> (onTogglePreview) toggle status ${toggled}`),
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

  window.document.getElementById('trigger-updateToken')?.addEventListener('click', () => beeTest.updateToken({
    access_token: accessToken,
    status: TokenStatus.REFRESHING,
    v2: true,
    shared: false,
    coediting_session_id: null
  }), false)

  window.document.getElementById('trigger-loadWorkspace')?.addEventListener('click', () => beeTest.loadWorkspace(LoadWorkspaceOptions.MIXED), false)

  window.document.getElementById('trigger-loadStageMode')?.addEventListener(
    'click', () => beeTest.loadStageMode({ mode: StageModeOptions.DESKTOP, display: StageDisplayOptions.BLUR }
  ), false)

  window.document.getElementById('trigger-loadConfig')?.addEventListener('click', () => beeTest.loadConfig({
    rowsConfiguration: {
      emptyRows: true,
      defaultRows: true
    }
  }), false)

  window.document.getElementById('trigger-getConfig')?.addEventListener('click', () => {
    const config = beeTest.getConfig()
    console.log('config --> ', config)
  }, false)
}

const conf = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }
beeTest.getToken(process.env.PLUGIN_CLIENT_ID!, process.env.PLUGIN_CLIENT_SECRET!, conf)
  .then((res) => {
    accessToken = res.access_token
    return fetch(new Request(BEE_TEMPLATE_URL, { method: 'GET' }))
  })
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
  }).catch((error) => console.error('error during iniziatialization ', error))
