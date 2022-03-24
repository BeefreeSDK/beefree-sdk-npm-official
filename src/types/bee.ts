import * as CSS from 'csstype'

export interface IBeeLoader {
  beePluginUrl: string,
  authUrl: string
}

export interface IUrlConfig {
  authUrl: string,
  beePluginUrl: string
}

export interface IBeeOptions {
  shared?: boolean
}

export interface IGetTokenPayload {
  clientId: string,
  clientSecret: string
}

export enum StageModeOptions {
  DESKTOP = 'desktop',
  MOBILE = 'mobile'
}

export enum StageDisplayOptions {
  BLUR = 'blur',
  HIDE = 'hide'
}

export interface ILoadStageMode {
  mode: StageModeOptions,
  display: StageDisplayOptions
}

export type ILoadConfig = {
  [key in keyof ILoadableProps]: unknown
}

export enum LoadWorkspaceOptions {
  DEFAULT = 'default',
  MIXED = 'mixed',
  AMP_ONLY = 'amp_only',
  HTML_ONLY = 'html_only'
}

export enum BeePluginErrorCodes {
  SAVE_UNAVAILABLE = 1000,
  AMP_CONTENT_DETECTED = 1001,
  INVALID_TEMPLATES = 1100,
  TEMPLATE_CANNOT_SAVED = 1200,
  LOCKED_ROW_CLICKED = 1300,
  LOCKED_MODULE_CLICKED = 1310,
  WORKSPACE_NOT_AVAILABLE = 1002,
  GENERIC_BUMP_ERROR = 2000,
  INVALID_TARGET_VERSION = 2100,
  VALIDATION_ERROR_DETAIL = 2200,
  MISSING_TEMPLATE_VERSION = 2300,
  INVALID_TEMPLATE_VERSION = 2400,
  TRASFORMATION_ERROR = 2500,
  BACKWARD_TRASFORMATION_ERROR = 2600,
  SERVICE_ERROR = 3000,
  //File System provider errors
  FSP_GENERIC_ERROR = 3001,
  FSP_BE_GENERIC_ERROR = 3100,
  FSP_RESOURCE_NOT_FOUND = 3200,
  FSP_PERMISSION_DENIED = 3300,
  FSP_RESOURCE_ALREADY_EXIST = 3400,
  FSP_FILE_NOT_UPLOADED = 3450,
  FSP_REQUEST_ERROR = 3500,
  FSP_USER_ERROR = 3600,
  FSP_WRONG_CREDENTIALS = 3650,
  //Auth Errors
  AUTH_HEADER_MISSING = 4001,
  AUTH_BEARER_INVALID = 4005,
  AUTH_TOKEN_EXPIRED = 4010,
  //Bump error
  BUMP_SERVICE_ERROR = 4015,
  //JSON pre-processing errors
  JSON_GENERIC_ERROR = 4101,
  JSON_CODE_TAG_ERROR = 4105,
  JSON_HTML_BLOCK_ERROR = 4110,
  JSON_CONDITIONAL_STATEMENT_ERROR = 4115,
  JSON_ADD_ROW_CONDITIONAL_STATEMENT_ERROR = 4120,
  JSON_ADD_ROW_STYLE_ERROR = 4125,
  JSON_ADD_ROW_CLASS_ERROR = 4130,
  JSON_ADD_ROW_COMPUTED_STYLE_ERROR = 4135,
  JSON_CELL_WIDTH_ERROR = 4140,
  JSON_ADD_COLUMN_BACKGROUND_ERROR = 4145,
  JSON_MAIN_CSS_ERROR = 4190,
  JSON_MAIN_CSS_MEDIA_ERROR = 4191,
  JSON_SPECIFIC_CSS_ERROR = 4192,
  JSON_CSS_RULE_ERROR = 4501,
  JSON_CSS_GENERALE_PAGE_ERROR = 4502,
  JSON_BODY_CSS_ERROR = 4503,
  JSON_COVERTING_CSS_ERROR = 4504,
  //HTML creation errors
  HTML_TO_JSON_CONVERT_ERROR = 4201,
  HTML_COMMUNICATION_TO_JSON__ERROR = 4202,
  HTML_COMMUNICATION_WORKER_TEXT_ERROR = 4210,
  HTML_TEXT_ERROR = 4211,
  HTML_COMMUNICATION_WORKER_BUTTON_ERROR = 4220,
  HTML_BUTTON_ERROR = 4221,
  HTML_COMMUNICATION_WORKER_VIDEO_ERROR = 4230,
  HTML_VIDEO_ERROR = 4231,
  HTML_COMMUNICATION_WORKER_SOCIAL_ERROR = 4240,
  HTML_SOCIAL_ERROR = 4241,
  HTML_COMMUNICATION_WORKER_ICON_ERROR = 4242,
  HTML_ICON_ERROR = 4243,
  HTML_COMMUNICATION_WORKER_MENU_ERROR = 4244,
  HTML_MENU_ERROR = 4245,
  HTML_COMMUNICATION_WORKER_IMAGE_ERROR = 4250,
  HTML_IMAGE_ERROR = 4251,
  HTML_COMMUNICATION_WORKER_MG_ERROR = 4260,
  HTML_CUSTOM_ADDON_ERROR = 4270,
  //POST-PROCESSING
  HTML_POST_GENERIC_ERROR = 4301,
  HTML_POST_IMAGE_URI_ERROR = 4310,
  HTML_POST_CUSTOM_HTML_ERROR = 4320,
  HTML_POST_CUSTOM_CODE_TAG_ERROR = 4330,
  HTML_POST_DISPLAY_CONDITION = 4340,
  //RENDERING ERRORS
  RENDER_GENERIC_ERROR = 4600,
  RENDER_CLEAN_HTML_ERROR = 4601,
  RENDER_CLEAN_TEXT_ERROR = 4602,
  RENDER_CHECK_FORM_ERROR = 4603,
  RENDER_VALIDATION_ERROR = 4604,
  RENDER_VIDEO_FORMAT_NOT_SUPPORTED_ERROR = 4605,
  POST_PROCESSING_FINAL_PAGE_ERROR = 4700
}

export type BeePluginError = {
  code?: BeePluginErrorCodes
  detail?: string
  message: string
  data?: BeePluginErrorData
}

type CSSProperties = CSS.Properties<string | number>

export type BeePluginErrorData = {
  uuid: string
  config: IPluginRow | IPluginModule
}

export enum ModuleTypes {
  DIVIDER = 'mailup-bee-newsletter-modules-divider',
  TEXT = 'mailup-bee-newsletter-modules-text',
  IMAGE = 'mailup-bee-newsletter-modules-image',
  BUTTON = 'mailup-bee-newsletter-modules-button',
  HTML = 'mailup-bee-newsletter-modules-html',
  SOCIAL = 'mailup-bee-newsletter-modules-social',
  EMPTY = 'mailup-bee-newsletter-modules-empty',
  VIDEO = 'mailup-bee-newsletter-modules-video',
  ADDON = 'mailup-bee-newsletter-modules-addon',
  FORM = 'mailup-bee-newsletter-modules-form',
  MERGE_CONTENT = 'mailup-bee-newsletter-modules-merge-content',
  CAROUSEL = 'mailup-bee-newsletter-modules-carousel',
  MENU = 'mailup-bee-newsletter-modules-menu',
  ICONS = 'mailup-bee-newsletter-modules-icons',
  HEADING = 'mailup-bee-newsletter-modules-heading',
  SPACER = 'mailup-bee-newsletter-modules-spacer',
  PARAGRAPH = 'mailup-bee-newsletter-modules-paragraph',
  LIST = 'mailup-bee-newsletter-modules-list'
}

export interface IPluginModule {
  descriptor: {
    [x: string]: unknown // Todo type with possible keys
    computedStyle: IPluginComputedStyle
    style: CSSProperties
    
  }
  type: ModuleTypes
  uuid: string
}

export interface IPluginColumn {
  'grid-columns': number
  modules: IPluginModule[]
  style: CSSProperties
  uuid: string
}

export interface IPluginDisplayCondition {
  after?: string
  before?: string
  className?: string
  description?: string
  isActive: boolean
  label?: string
  type?: string
  name?: string
}

export interface IPluginComputedStyle {
  class?: string
  height?: number | string
  width?: number | string
  hideContentOnAmp?: boolean
  hideContentOnHtml?: boolean
  hideContentOnMobile?: boolean
  hideContentOnDesktop?: boolean
  linkColor?: string
  messageBackgroundColor?: string
  messageWidth?: string
  rowColStackOnMobile?: boolean
  rowReverseColStackOnMobile?: boolean
  iconsDefaultWidth?: number
  padding?: string
  align?:string
  iconSpacing?: {
    [x: string]: string
  }
  itemsSpacing?: string
  iconHeight?: string
}

export interface IPluginContent {
  style?: CSSProperties
  computedStyle?: IPluginComputedStyle
}

export interface IPluginRowContent {
  computedStyle: {
    rowColStackOnMobile: boolean
    rowReverseColStackOnMobile: boolean
  },
  style: CSSProperties
}
export interface IPluginRowContainer {
  style: CSSProperties
  displayCondition?: IPluginDisplayCondition
}

export enum RowLayoutType {
  ONE_COLUMNS_EMPTY = 'one-column-empty',
  TWO_COLUMNS_EMPTY = 'two-columns-empty',
  TWO_COLUMNS_4_8_EMPTY = 'two-columns-4-8-empty',
  TWO_COLUMNS_8_4_EMPTY = 'two-columns-8-4-empty',
  TWO_COLUMNS_3_9_EMPTY = 'two-columns-3-9-empty',
  TWO_COLUMNS_9_3_EMPTY = 'two-columns-9-3-empty',
  THREE_COLUMNS_EMPTY = 'three-columns-empty',
  THREE_COLUMNS_3_3_6_EMPTY = 'three-columns-3-3-6-empty',
  THREE_COLUMNS_3_6_3_EMPTY = 'three-columns-3-6-3-empty',
  THREE_COLUMNS_6_3_3_EMPTY = 'three-columns-6-3-3-empty',
  FOUR_COLUMNS_EMPTY = 'four-columns-empty',
  SIX_COLUMNS_EMPTY = 'six-columns-empty',
}

export interface IPluginRow {
  columns: IPluginColumn[]
  container: IPluginRowContainer
  content: IPluginRowContent
  locked: boolean
  metadata?: Record<string, unknown>
  type: RowLayoutType
  uuid: string
}

export interface IInvitedMention {
  username: string
  value: string
  uid: string | number
}

export interface IPluginForm {
  structure: {
    attributes: Record<string, unknown>
    fields: Record<string, unknown>
    layout: unknown[]
    title: string
    description: string
  }
}

export interface IPluginFilePicker {
  url: string
}

export enum EngageHandle {
  MDM = 'mdm',
}

export type BeePluginContentDialogHandler<K, T = undefined, A = K> = (
  resolve: (data: K) => void,
  reject: () => void,
  args: A,
  handle?: T
) => Promise<void>

export type BeePluginConfigurationsHooks = {
  getMentions?: {
    handler: BeePluginContentDialogHandler<IInvitedMention[], undefined, string>
  },
  getRows?: {
    handler: BeePluginContentDialogHandler<IPluginRow[]>
  }
}

export enum OnCommentChangeEnum {
  NEWCOMMENT = 'NEW_COMMENT',
  DELETECOMMENT = 'COMMENT_DELETED',
  CHANGECOMMENT = 'COMMENT_EDITED',
}

export type BeePluginCommentPayload = {
  author: {
    userHandle: string
    username: string
    userColor: string
  }
  content: string
  elementId: string
  mentions: string[]
  parentCommentId: string
  responses: string[]
  timestamp: string
}

export type BeePluginOnCommentChangePayload = {
  type: OnCommentChangeEnum
  payload: {
    commentId: string
    comment: BeePluginCommentPayload
  }
}

export type BeePluginOnCommentPayload = {
  change: BeePluginOnCommentChangePayload
  comments: unknown
}

export interface IMergeTag {
  name: string
  value: string
  id?: number
}
export interface IMergeContent {
  name: string
  value: string
  id?: number
}

export interface ISpecialLink {
  label: string
  link: string
  type: string
  id?: number
}

export type BeePluginAdvancedPermissionStageToggle = {
  locked: boolean
  engage: {
    enabled: boolean
    handle: EngageHandle.MDM
    tooltip?: string
  }
}

export type BeePluginAdvancedPermission = {
  rows: {
    displayConditions: {
      show: boolean
      locked: boolean
    }
  }
  workspace: {
    stageToggle: BeePluginAdvancedPermissionStageToggle
  }
}

export enum WorkspaceStage {
  desktop = 'desktop',
  mobile = 'mobile',
  global = 'global',
}

export type BeePluginWorkspace = {
  type: LoadWorkspaceOptions
  stage: WorkspaceStage
  displayHidden: StageDisplayOptions
  hideStageToggle: boolean
}

export type IPluginSessionInfo = {
  sessionId: string
}

export interface IEntityContentJson {
  page: {
    body: unknown
    description: string
    rows: IPluginRow[]
    template: {
      name: string
      type: string
      version: string
    }
    title: string
  }
}

export type BeePluginMessageEditDetailPatch = {
  op: string
  path: string
  value: string
}

export type BeePluginMessageEditDetail = {
  code: unknown
  value: string
  description: string
  patches: BeePluginMessageEditDetailPatch[]
}

export enum BeePluginRoles {
  REVIEWER = 'reviewer'
}

export type BeePluginCustomHeader = {
  name: string
  value: string
}

export type IRefreshSavedRow = boolean


export type ILoadableProps = Pick<IBeeConfig, 'advancedPermissions' | 'contentDefaults' | 'customHeaders' | 'rowsConfiguration'>

export interface IBeeConfig {
  uid: string
  container: string
  trackChanges?: boolean
  preventClose?: boolean
  enable_display_conditions?: boolean
  language: string
  mergeTags?: IMergeTag[]
  mergeContents?: IMergeContent[]
  specialLinks?: ISpecialLink[]
  username?: string
  userColor?: string
  userHandle?: string
  commenting?: boolean
  advancedPermissions?: BeePluginAdvancedPermission
  defaultForm?: unknown
  loadingSpinnerTheme?: string
  loadingSpinnerDisableOnSave?: boolean
  editorFonts?: unknown
  roleHash?: string
  role?: BeePluginRoles,
  defaultColors?: string[]
  contentDefaults?: unknown
  customCss?: string
  workspace?: BeePluginWorkspace
  autosave?: number,
  customHeaders?: BeePluginCustomHeader[]
  saveRows?: boolean,
  contentDialog?: {
    engage?: {
      handler: BeePluginContentDialogHandler<Partial<IBeeConfig>, undefined, EngageHandle>
    },
    saveRow?: {
      label: string
      handler: BeePluginContentDialogHandler<IPluginRow>
    }
    specialLinks?: {
      label: string
      handler: BeePluginContentDialogHandler<ISpecialLink>
    }
    mergeTags?: {
      label: string
      handler: BeePluginContentDialogHandler<IMergeTag>
    }
    manageForm?: {
      label: string
      handler: BeePluginContentDialogHandler<IPluginForm>
    },
    filePicker?: {
      label: string
      handler: BeePluginContentDialogHandler<IPluginFilePicker>
    },
    getMention?: {
      label: string
      handler: BeePluginContentDialogHandler<IInvitedMention[], undefined, string>
    }
    onDeleteRow?: {
      label: string
      handler: BeePluginContentDialogHandler<IRefreshSavedRow>
    }
    onEditRow?: {
      label: string
      handler: BeePluginContentDialogHandler<IRefreshSavedRow>
    }
  },
  rowsConfiguration?: Record<string, unknown>
  hooks?: BeePluginConfigurationsHooks
  onLoad: () => void
  onPreview?: () => void
  onTogglePreview?: () => void
  onSessionStarted?: (sessionInfo: IPluginSessionInfo) => void
  onSessionChange?: (sessionInfo: IPluginSessionInfo) => void
  onReady?: (args: Record<string, unknown>) => void
  onSave?: (jsonFile: unknown, htmlFile: unknown) => void
  onSaveRow?: (jsonfile: unknown, html: string) => void
  onError: (error: BeePluginError) => void
  onAutoSave?: (json: string) => void
  onSaveAsTemplate?: (json: Record<string, unknown>) => void
  onSend?: (html: string) => void
  onChange?: (json: string, detail: BeePluginMessageEditDetail, version: number) => void
  onWarning?: (error: BeePluginError) => void
  onComment?: (commentPayload: BeePluginOnCommentPayload, json: string) => void 
  onLoadWorkspace?: (worspaceType: LoadWorkspaceOptions) => void
}