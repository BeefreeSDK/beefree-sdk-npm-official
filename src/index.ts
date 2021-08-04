import loadScript from 'load-script'
import { IBeeLoader } from './types/bee'
import beeActions from './utils/Constants'
import { fetchToken } from './services/api'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import { eitherCanExecuteAction, eitherCheckJoinParams, eitherCheckStartParams } from './utils/utils'

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

const { 
  LOAD, 
  SAVE, 
  SEND, 
  PREVIEW, 
  SAVE_AS_TEMPLATE, 
  TOGGLE_STRUCTURE,
  TOGGLE_COMMENTS,
  TOGGLE_PREVIEW,
  SHOW_COMMENT,
  RELOAD,
  LOAD_WORKSPACE,
  LOAD_STAGE_MODE
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
      .then(res => this.token = res.data)
  }

  start(config, template, bucketDir, options) {
    const { bee, token } = this
    debugger
    return pipe(
      eitherCheckStartParams(config, template, token),
      E.fold(
        ({ message }) => new Promise(reject=> reject(message)), //{ throw new Error(message) },
        () => new Promise(resolve => {
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
      )
    )
  }

  join(config, sessionId, bucketDir) {
    const { bee, token } = this
    return pipe(
      eitherCheckJoinParams(config, sessionId, this.token),
      E.fold(
        ({ message }) => { throw new Error(message) },
        () => new Promise(resolve => {
          bee(() => this.BeePlugin.create(token, config, instance => {
            this.instance = instance
            instance.join(sessionId)
            resolve(instance)
          }, bucketDir))
        })
      )
    )
  }

  executeAction(action, param= {}, options= {}) {
    const { instance } = this

    pipe(
      eitherCanExecuteAction(instance, action),
      E.fold(
        ({ message }) => { throw new Error(message) },
        () => instance[action](param, options)
      )
    )
  }

  load(template: Record<string, unknown>) {
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

  showComment(comment) {
    return this.executeAction(SHOW_COMMENT, comment)
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
}
