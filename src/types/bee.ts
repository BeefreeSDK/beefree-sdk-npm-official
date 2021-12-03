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

//contentDefaults
//advancedPermissions
//rowsConfiguration
//customHeaders
export interface ILoadConfig {
  [key: string]: unknown;
}

export enum LoadWorkspaceOptions {
  DEFAULT = 'default',
  MIXED = 'mixed',
  AMP_ONLY = 'amp_only',
  HTML_ONLY = 'html_only'
}

export type BeePluginError = {
  code?: number
  detail?: string
  message: string
}

type CSSProperties = CSS.Properties<string | number>

export interface IPluginRow {
  columns: unknown[]
  container: {
    style: CSSProperties
  }
  content: unknown
  locked: boolean
  metadata: Record<string, unknown>
  type: string
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

export type BeePluginContentDialogHandler<K, T = undefined> = (
  resolve: (data: K) => void,
  reject: () => void,
  args: K,
  handle?: T
) => Promise<void>

export type BeePluginConfigurationsHooks = {
  getMentions?: {
    handler: BeePluginContentDialogHandler<IInvitedMention>
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
    rows: unknown[]
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
      handler: BeePluginContentDialogHandler<EngageHandle>
    },
    saveRow?: {
      label: string
      handler: BeePluginContentDialogHandler<IPluginRow>
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
      handler: BeePluginContentDialogHandler<IInvitedMention>
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