import loadScript from 'load-script'
import beeActions from './utils/Constants'

const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/BeePlugin.js'
const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

const load = (bee) => {
  loadScript(BEEJS_URL, err => {
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

const { LOAD, SAVE, SEND, PREVIEW, SAVE_AS_TEMPLATE, TOGGLE_STRUCTURE } = beeActions

export default class Bee {
  constructor(token) {
    this.bee = (call) => load(() => call())
    this.token = token || null
    this.config = null
    this.instance = null
  }

  getToken(clientId, clientSecret) {
    const config = {
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
    return fetch(new Request(API_AUTH_URL, config))
    .then(res => res.json())
    .then(token => {
      this.token = token
      return token
    })
  }

  start(config, template) {
    const { bee, token } = this
    if (!config || !template) {
      throw new Error('Config or template are missing')
    }
    if (!this.token) {
      throw new Error('Token NOT declared, call getToken or pass token on new BEE')
    }
    return new Promise(resolve => {
      bee(() =>
        BeePlugin.create(token, config, instance => {
          this.instance = instance
          instance.start(template)
          resolve(instance)
        })
      )
    })
  }

  executeAction(action, param) {
    const { instance } = this
    beeExists(instance)
    isValidAction(action)
    return instance[action](param)
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
}
