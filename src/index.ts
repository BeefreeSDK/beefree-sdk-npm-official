import loadScript from 'load-script'
import { pipe } from 'fp-ts/lib/pipeable'
import * as E from 'fp-ts/lib/Either'
import {
  IBeeLoader, ILoadStageMode, IUrlConfig, LoadWorkspaceOptions 
} from './types/bee'
import beeActions from './utils/Constants'
import { fetchToken } from './services/api'
import { eitherCanExecuteAction, eitherCheckJoinParams, eitherCheckStartParams } from './utils/utils'

declare let BeePlugin: any;

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

  constructor(
    token?: string, urlConfig: IUrlConfig = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }
  ) {
    beeLoaderUrl = urlConfig
    this.bee = (call) => load(() => call())
    this.token = token || ''
    this.config = null
    this.instance = null   
  }

  getToken = (
    clientId: string, 
    clientSecret: string, 
    urlConfig:IUrlConfig = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL }
  ) => {
    beeLoaderUrl = urlConfig;
    if (this.token) {
      throw new Error('Toker already declared')
    }

    return fetchToken({ authUrl: urlConfig.authUrl, clientId, clientSecret })
      .then(res => {
        this.token = res.data
        return res.data
      })
  }

  start = (
    config: any, 
    template: any, 
    bucketDir: string, 
    options: any
  ) => {
    const { bee, token } = this    
    return pipe(
      eitherCheckStartParams(config, template, token),
      E.fold(
        ({ message }) => new Promise(reject => reject(message)), //{ throw new Error(message) },
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

  join = (
    config: any, 
    sessionId: string, 
    bucketDir: string
  ) => {
    const { bee, token } = this
    return pipe(
      eitherCheckJoinParams(config, sessionId, this.token),
      E.fold(
        ({ message }) => { throw new Error(message) },
        () => new Promise(resolve => {
          bee(() => BeePlugin.create(token, config, instance => {
            this.instance = instance
            instance.join(sessionId)
            resolve(instance)
          }, bucketDir))
        })
      )
    )
  }

  executeAction = (action, param = {}, options = {}) => {
    const { instance } = this

    pipe(
      eitherCanExecuteAction(instance, action),
      E.fold(
        ({ message }) => { throw new Error(message) },
        () => instance[action](param, options)
      )
    )
  }

  load = (template: Record<string, unknown>) => this.executeAction(LOAD, template)

  save = () => this.executeAction(SAVE)

  saveAsTemplate = () => this.executeAction(SAVE_AS_TEMPLATE)

  send = () => this.executeAction(SEND)
  
  preview = () => this.executeAction(PREVIEW)
  
  toggleStructure = () => this.executeAction(TOGGLE_STRUCTURE)  

  togglePreview = () => this.executeAction(TOGGLE_PREVIEW)

  toggleComments = () => this.executeAction(TOGGLE_COMMENTS)

  showComment = (comment) => this.executeAction(SHOW_COMMENT, comment) 

  reload = (template, options) => this.executeAction(RELOAD, template, options)

  loadWorkspace = (type: LoadWorkspaceOptions) => this.executeAction(LOAD_WORKSPACE, type)

  loadStageMode = (args: ILoadStageMode) => this.executeAction(LOAD_STAGE_MODE, args)
}
