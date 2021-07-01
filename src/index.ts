import loadScript from 'load-script'
import { IBeeLoader } from './types/bee'
import beeActions from './utils/Constants'
import { fetchToken } from './services/api'

const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'

const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

let beeLoaderUrl: IBeeLoader = {
  beePluginUrl: '',
  authUrl: ''
}

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
  LOAD_WORKSPACE
} = beeActions


export default class Bee {
  token: string
  bee: any
  config: any
  instance: any
  BeePlugin: any = null

  constructor(token, urlConfig = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }) {    
    beeLoaderUrl = urlConfig
    this.bee = (call) => load(() => call())
    this.token = token || null
    this.config = null
    this.instance = null    
  }

  getToken(clientId, clientSecret, urlConfig = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }) {
    beeLoaderUrl = urlConfig;
    if (this.token) {
      throw new Error('Toker already declared')
    }

    return fetchToken({ authUrl: urlConfig.authUrl, clientId, clientSecret })
      .then(res => console.log('response on get token --> ', res))
      // .then(token => {
      //   this.token = token
      //   return token
      // })
  }

  start(config, template, bucketDir, options) {
    const { bee, token } = this
    if (!config || !template) {
      throw new Error('Config or template are missing')
    }
    if (!this.token) {
      throw new Error('Token NOT declared, call getToken or pass token on new BEE')
    }
    return new Promise(resolve => {
      bee(() => this.BeePlugin.create(token, config, instance => {
        this.instance = instance
        instance.start(template, options)
        resolve(instance)
      }, bucketDir))
    })
  }

  join(config, sessionId, bucketDir) {
    const { bee, token } = this
    if (!config || !sessionId) {
      throw new Error('Config or session id are missing')
    }
    if (!this.token) {
      throw new Error('Token NOT declared, call getToken or pass token on new BEE')
    }
    return new Promise(resolve => {
      bee(() => this.BeePlugin.create(token, config, instance => {
        this.instance = instance
        instance.join(sessionId)
        resolve(instance)
      }, bucketDir))
    })
  }

  executeAction(action, param= {}, options= {}) {
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
