import loadScript from 'load-script'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import {
  IBeeConfig,
  IEntityContentJson,
  IBeeOptions,
  ILoadConfig,
  ILoadStageMode,
  LoadWorkspaceOptions,
  IToken,
  BeeSaveOptions,
  ILanguage,
  IBeeConfigFileManager,
  ExecCommand,
  ExecCommands,
  IExecCommandOptions,
  ITemplateJson,
  SaveResponse,
  SaveAsTemplateResponse,
  SDKOptions,
  LoadConfigOptions,
} from './types/bee'
import beeActions, { mockedEmptyToken, BEEJS_URL, API_AUTH_URL } from './utils/Constants'
import { fetchToken } from './services/api'
import { eitherCanExecuteAction, eitherCheckJoinParams, eitherCheckStartParams } from './utils/utils'
import * as beeTypes from './types/bee'

// this is the global variable injected from BeePlugin.js
declare let BeePlugin: any;

let beeLoaderUrl = ''

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
  LOAD_CONFIG,
  LOAD_ROWS,
  UPDATE_TOKEN,
  GET_CONFIG,
  SWITCH_TEMPLATE_LANGUAGE,
  SWITCH_PREVIEW,
  EXEC_COMMAND,
  GET_TEMPLATE_JSON,
} = beeActions

class Bee {
  token: IToken
  instance: any
  wrapperInfo?: SDKOptions['wrapperInfo']

  constructor(
    token?: IToken,
    options?: SDKOptions,
  ) {
    beeLoaderUrl = options?.beePluginUrl ?? BEEJS_URL
    this.token = token || mockedEmptyToken
    this.instance = null
    this.wrapperInfo = options?.wrapperInfo
  }

  bee = (bee) => {
    loadScript(beeLoaderUrl, err => {
      if (err) {
        throw new Error('BeePlugin.js is not reachable')
      }
      return bee()
    })
  }

  UNSAFE_getToken = (
    clientId: string,
    clientSecret: string,
    uid: string,
    options?: SDKOptions,
  ) => {

    const localUrlConfig = {
      authUrl: options?.authUrl ?? API_AUTH_URL,
      beePluginUrl: options?.beePluginUrl ?? BEEJS_URL,
    }

    if (this.token && this.token.access_token) {
      throw new Error('Token already declared')
    }

    return fetchToken({ authUrl: localUrlConfig.authUrl, clientId, clientSecret, uid })
      .then(async (res) => {
        this.token = await res.json()
        return this.token
      })
  }

  start = (
    config: IBeeConfig,
    template: IEntityContentJson | object, //user can pass an empty object in some specific cases
    bucketDir?: string,
    options?: IBeeOptions
  ) => {
    const { bee, token } = this
    return pipe(
      eitherCheckStartParams(config, token),
      E.fold(
        ({ message }) => new Promise(reject => reject(message)),
        () => new Promise(resolve => {
          const { packageVersion: wrapperVersion, packageName: wrapperName } = this.wrapperInfo ?? {}
          bee(() => BeePlugin.create(
            token,
            {
              ...config,
              startOrigin: `[npm] ${wrapperName ?? process.env.NPM_PACKAGE_NAME}`,
              startOriginVersion: wrapperVersion ?? process.env.NPM_PACKAGE_VERSION,
            },
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

  startFileManager = (
    config: IBeeConfigFileManager,
    bucketDir?: string,
    options?: IBeeOptions
  ) => {
    const { bee, token } = this
    return pipe(
      eitherCheckStartParams(config, token),
      E.fold(
        ({ message }) => new Promise(reject => reject(message)),
        () => new Promise(resolve => {
          bee(() => BeePlugin.create(
            token,
            {
              ...config,
              startOrigin: `[npm] ${process.env.NPM_PACKAGE_NAME}`,
              startOriginVersion: process.env.NPM_PACKAGE_VERSION,
            },
            instance => {
              this.instance = instance
              instance.start(options)
              resolve(instance)
            }, bucketDir
          ))
        })
      )
    )
  }

  join = (
    config: IBeeConfig,
    sessionId: string,
    bucketDir?: string,
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

  executeAction = <A = void>(action: string, param = {}, options = {}): A => {
    const { instance } = this
    return pipe(
      eitherCanExecuteAction(instance, action),
      E.fold(
        ({ message }) => { throw new Error(message) },
        () => instance[action](param, options)
      )
    )
  }

  executeGetConfigAction = () :IBeeConfig => {
    const { instance } = this

    return instance[GET_CONFIG]()
  }



  load = (template: IEntityContentJson) => this.executeAction(LOAD, template)

  loadRows = () => this.executeAction(LOAD_ROWS)

  save = (options?: BeeSaveOptions) => this.executeAction<Promise<SaveResponse>>(SAVE, options)

  saveAsTemplate = () => this.executeAction<Promise<SaveAsTemplateResponse>>(SAVE_AS_TEMPLATE)

  send = (args?: ILanguage) => this.executeAction(SEND, args)

  preview = () => this.executeAction(PREVIEW)

  toggleStructure = () => this.executeAction(TOGGLE_STRUCTURE)

  togglePreview = () => this.executeAction(TOGGLE_PREVIEW)

  toggleComments = () => this.executeAction(TOGGLE_COMMENTS)

  toggleMergeTagsPreview = () => this.executeAction(TOGGLE_MERGETAGS_PREVIEW)

  showComment = (comment) => this.executeAction(SHOW_COMMENT, comment)

  reload = (template: IEntityContentJson, options?: IBeeOptions) => this.executeAction(RELOAD, template, options)

  loadWorkspace = (type: LoadWorkspaceOptions) => this.executeAction(LOAD_WORKSPACE, type)

  loadStageMode = (args: ILoadStageMode) => this.executeAction(LOAD_STAGE_MODE, args)

  loadConfig = (args: ILoadConfig, options?: LoadConfigOptions) => this.executeAction<Promise<IBeeConfig>>(LOAD_CONFIG, args, options)

  updateToken = (updateTokenArgs: IToken) => this.executeAction(UPDATE_TOKEN, updateTokenArgs)

  getConfig = () => this.executeGetConfigAction()

  switchTemplateLanguage = (args: ILanguage) => this.executeAction(SWITCH_TEMPLATE_LANGUAGE, args)

  switchPreview = (args?: ILanguage) => this.executeAction(SWITCH_PREVIEW, args)

  execCommand = (command: ExecCommands, options?: IExecCommandOptions): ExecCommand => this.executeAction(EXEC_COMMAND, command, options)

  getTemplateJson = () => this.executeAction<Promise<ITemplateJson>>(GET_TEMPLATE_JSON, {})
}


export default Bee
export { beeTypes }
