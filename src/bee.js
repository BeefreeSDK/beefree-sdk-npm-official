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
  TOGGLE_PREVIEW,
  TOGGLE_MERGETAGS_PREVIEW,
  SHOW_COMMENT,
  RELOAD,
  LOAD_WORKSPACE,
  LOAD_STAGE_MODE,
  LOAD_CONFIG
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

  start(config, template, bucketDir, options) {
    const { bee, token } = this
    if (!config || !template) {
      throw new Error('Config or template are missing')
    }
    if (!this.token) {
      throw new Error('Token NOT declared, call getToken or pass token on new BEE')
    }
    return new Promise(resolve => {
      bee(() => BeePlugin.create(
        token,
        { ...config, startOrigin: '[npm] @mailupinc/bee-plugin' },
        instance => {
          this.instance = instance
          instance.start(template, options)
          resolve(instance)
        }, bucketDir
      ))
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
      bee(() => BeePlugin.create(token, config, instance => {
        this.instance = instance
        instance.join(sessionId)
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

  preview() {
    return this.executeAction(PREVIEW)
  }

  toggleStructure() {
    return this.executeAction(TOGGLE_STRUCTURE)
  }

  togglePreview() {
    return this.executeAction(TOGGLE_PREVIEW)
  }

  toggleComments() {
    return this.executeAction(TOGGLE_COMMENTS)
  }

  toggleMergeTagsPreview() {
    return this.executeAction(TOGGLE_MERGETAGS_PREVIEW)
  }

  showComment(comment) {
    return this.executeAction(SHOW_COMMENT, comment)
  }

  reload(template, options) {
    return this.executeAction(RELOAD, template, options)
  }

  reload(template, options) {
    return this.executeAction(RELOAD, template, options)
  }

  loadWorkspace(type) {
    return this.executeAction(LOAD_WORKSPACE, type)
  }

  loadStageMode(mode) {
    return this.executeAction(LOAD_STAGE_MODE, mode)
  }

  loadConfig(config) {
    return this.executeAction(LOAD_CONFIG, config)
  }
}
