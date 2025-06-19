import { IToken, TokenStatus } from "../types/bee"

const beeActions = {
  CREATE: 'create',
  START: 'start',
  LOAD: 'load',
  SAVE: 'save',
  SEND: 'send',
  PREVIEW: 'preview',
  SAVE_AS_TEMPLATE: 'saveAsTemplate',
  TOGGLE_STRUCTURE: 'toggleStructure',
  TOGGLE_COMMENTS: 'toggleComments',
  TOGGLE_PREVIEW: 'togglePreview',
  TOGGLE_MERGETAGS_PREVIEW: 'toggleMergeTagsPreview',
  SHOW_COMMENT: 'showComment',
  JOIN: 'join',
  RELOAD: 'reload',
  LOAD_WORKSPACE: 'loadWorkspace',
  LOAD_STAGE_MODE: 'loadStageMode',
  LOAD_CONFIG: 'loadConfig',
  LOAD_ROWS: 'loadRows',
  UPDATE_TOKEN: 'updateToken',
  GET_CONFIG: 'getConfig',
  SWITCH_TEMPLATE_LANGUAGE: 'switchTemplateLanguage',
  SWITCH_PREVIEW: 'switchPreview',
  EXEC_COMMAND: 'execCommand',
  GET_TEMPLATE_JSON: 'getTemplateJson',
}

export const mockedEmptyToken : IToken = {
  access_token: '', status: TokenStatus.OK, v2: true, coediting_session_id: null, shared: false
}

export const BEEJS_URL = 'https://app-rsrc.getbee.io/plugin/v2/BeePlugin.js'

export const API_AUTH_URL = 'https://auth.getbee.io/apiauth'

export default beeActions
