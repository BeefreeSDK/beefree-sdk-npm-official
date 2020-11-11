import loadScript from 'load-script'
import beeActions from './utils/Constants'

const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'

const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

let beeLoaderUrl = null; 

const load = (bee) => {
  loadScript(beeLoaderUrl.beePluginUrl, err => {
    if (err) {
      throw new Error('BeePlugin.js is not reachable')
    }
    return bee()
  })
}

const beeExists = instance => {
  if (!instance) {
    throw new Error('Bee is not started')
  }
}

const isValidAction = action => {
  const actions = Object.keys(beeActions)
  if (!actions.some(x => beeActions[x] === action)) {
    throw new Error('Is not a correct method')
  }
}

const { 
  LOAD, 
  SAVE, 
  SEND, 
  PREVIEW, 
  SAVE_AS_TEMPLATE, 
  TOGGLE_STRUCTURE,
  TOGGLE_COMMENTS,
  RELOAD,
  JOIN,
  OPEN_FILE_PICKER,
  LOAD_WORKSPACE
} = beeActions

export default class Bee {
  constructor(token, urlConfig = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }) {    
    beeLoaderUrl = urlConfig
    this.bee = (call) => load(() => call())
    this.token = token || null
    this.config = null
    this.instance = null    
  }

  getToken(clientId, clientSecret, urlConfig = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }) {
    beeLoaderUrl = urlConfig;
    const beeConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}`,
      mode: 'cors',
    }
    if (this.token) {
      throw new Error('Toker already declared')
    }
    
    
    return fetch(new Request(beeLoaderUrl.authUrl, beeConfig))
      .then(res => res.json())
      .then(token => {
        this.token = token
        return token
      })
  }

  start(config, template, bucketDir) {
    const { bee, token } = this
    if (!config || !template) {
      throw new Error('Config or template are missing')
    }
    if (!this.token) {
      throw new Error('Token NOT declared, call getToken or pass token on new BEE')
    }
    return new Promise(resolve => {
      bee(() => BeePlugin.create(token, config, instance => {
        this.instance = instance
        instance.start(template)
        resolve(instance)
      }, bucketDir))
    })
  }

  executeAction(action, param, options) {
    const { instance } = this
    beeExists(instance)
    isValidAction(action)
    return instance[action](param, options)
  }

  load(template) {
    return this.executeAction(LOAD, template)
  }

  save() {
    return this.executeAction(SAVE)
  }

  saveAsTemplate() {
    return this.executeAction(SAVE_AS_TEMPLATE)
  }

  send() {
    return this.executeAction(SEND)
  }

  join(sessionId) {
    return this.executeAction(JOIN, sessionId)
  }

  preview() {
    return this.executeAction(PREVIEW)
  }

  toggleStructure() {
    return this.executeAction(TOGGLE_STRUCTURE)
  }

  toggleComments() {
    return this.executeAction(TOGGLE_COMMENTS)
  }

  reload(template, options) {
    return this.executeAction(RELOAD, template, options)
  }
  
  loadWorkspace(type) {
    return this.executeAction(LOAD_WORKSPACE, type)
  }
}
