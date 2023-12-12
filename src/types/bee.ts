import * as CSS from 'csstype'
import { KebabKeys, RecursivePartial, ValueOf } from './utils'

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

interface TemplateLanguage {
  label: string,
  value: string
}

export interface BeeSaveOptions {
  language?: string
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

export type ILoadConfig = ILoadableProps

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
  POST_PROCESSING_FINAL_PAGE_ERROR = 4700,
  //SESSION TOKEN ERRORS
  EXPIRED_TOKEN_CANNOT_REFRESHED = 5101,
  EXPIRED_TOKEN_MUST_REFRESHED = 5102,
}

export type BeePluginError = {
  code?: BeePluginErrorCodes
  detail?: string
  message: string
  data?: BeePluginErrorData
}

export type BeePluginInfo = {
  code: BeePluginErrorCodes
  message: string
  detail: {
    handle: OnInfoDetailHandle.AI_INTEGRATION
    promptId: string
    usage: {
      completion_tokens: number
      prompt_tokens: number
      total_tokens: number
    }
  }
}

type KebabCSSProperties = KebabKeys<CSS.Properties>

export type BeePluginErrorData = {
  uuid: string
  config: IPluginRow | IPluginModule
}

export const ModuleTypes = {
  DIVIDER: 'mailup-bee-newsletter-modules-divider',
  TEXT: 'mailup-bee-newsletter-modules-text',
  IMAGE: 'mailup-bee-newsletter-modules-image',
  BUTTON: 'mailup-bee-newsletter-modules-button',
  HTML: 'mailup-bee-newsletter-modules-html',
  SOCIAL: 'mailup-bee-newsletter-modules-social',
  EMPTY: 'mailup-bee-newsletter-modules-empty',
  VIDEO: 'mailup-bee-newsletter-modules-video',
  ADDON: 'mailup-bee-newsletter-modules-addon',
  FORM: 'mailup-bee-newsletter-modules-form',
  MERGE_CONTENT: 'mailup-bee-newsletter-modules-merge-content',
  CAROUSEL: 'mailup-bee-newsletter-modules-carousel',
  MENU: 'mailup-bee-newsletter-modules-menu',
  ICONS: 'mailup-bee-newsletter-modules-icons',
  HEADING: 'mailup-bee-newsletter-modules-heading',
  SPACER: 'mailup-bee-newsletter-modules-spacer',
  PARAGRAPH: 'mailup-bee-newsletter-modules-paragraph',
  LIST: 'mailup-bee-newsletter-modules-list'
} as const

export const ModuleDescriptorNames = {
  DIVIDER: 'divider',
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  HTML: 'html',
  SOCIAL: 'social',
  VIDEO: 'video',
  ADDON: 'addon',
  FORM: 'form',
  MERGE_CONTENT: 'mergeContent',
  CAROUSEL: 'carousel',
  MENU: 'menu',
  ICONS: 'icons',
  HEADING: 'heading',
  SPACER: 'spacer',
  PARAGRAPH: 'paragraph',
  LIST: 'list'
} as const

export const ModuleDescriptorOrderNames = {
  DIVIDER: 'Divider',
  TEXT: 'Text',
  IMAGE: 'Image',
  BUTTON: 'Button',
  HTML: 'Html',
  SOCIAL: 'Social',
  VIDEO: 'Video',
  FORM: 'Form',
  MERGE_CONTENT: 'MergeContent',
  CAROUSEL: 'Carousel',
  MENU: 'Menu',
  ICONS: 'Icons',
  HEADING: 'Heading',
  SPACER: 'Spacer',
  PARAGRAPH: 'Paragraph',
  LIST: 'List'
} as const

export interface IModulesGroups {
  label: string,
  collapsable: boolean
  collapsedOnLoad: boolean
  modulesNames: ValueOf<typeof ModuleDescriptorOrderNames>[] | string[]
}

export interface IPluginModuleHeading {
  type: typeof ModuleTypes.HEADING
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    computedStyle: {
      height: number
      width: number
    },
    style: {
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
      'text-align': string
      width: string
    }
    heading: {
      style: {
        color: string
        direction: string
        'font-family': string
        'font-size': string
        'font-weight': string
        'letter-spacing': string
        'line-height': string
        'link-color': string
        'text-align': string
      }
      text: string
      title: 'h1' | 'h2' | 'h3'
    }
  }
}
export interface IPluginModuleParagraph {
  type: typeof ModuleTypes.PARAGRAPH
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    style: Partial<{
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
    }>
    computedStyle: Partial<{
      hideContentOnAmp: boolean
      hideContentOnDesktop: boolean
      hideContentOnHtml: boolean
      hideContentOnMobile: boolean
    }>
    paragraph: {
      computedStyle: Partial<{
        linkColor: string
        paragraphSpacing: string
      }>
      html: string
      style: Partial<{
        color: string
        direction: string
        'font-family': string
        'font-size': string
        'font-weight': string
        'letter-spacing': string
        'line-height': string
        'text-align': string
      }>
    }
  }
}

export interface IPluginModuleButton {
  type: typeof ModuleTypes.BUTTON
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    style: {
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
      'text-align': string
    }
    computedStyle: {
      height: number
      hideContentOnMobile: boolean
      width: number
    }
    button: {
      href: string
      label: string
      style: {
        'background-color': string
        'border-bottom': string
        'border-left': string
        'border-radius': string
        'border-right': string
        'border-top': string
        'color': string
        'font-family': string
        'font-weight': string
        'line-height': string
        'max-width': string
        'padding-bottom': string
        'padding-left': string
        'padding-right': string
        'padding-top': string
        'width': string
      }
    }
  }
}

export interface IPluginModuleList {
  type: typeof ModuleTypes.LIST
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    style: {
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
    }
    computedStyle: {
      hideContentOnAmp: boolean
      hideContentOnDesktop: boolean
      hideContentOnHtml: boolean
      hideContentOnMobile: boolean
    }
    list: {
      html: string
      tag: string
      style: {
        color: string
        direction: string
        'font-family': string
        'font-size': string
        'font-weight': string
        'letter-spacing': string
        'line-height': string
        'text-align': string
      }
      computedStyle: {
        liIndent: string
        liSpacing: string
        linkColor: string
        listStylePosition: string
        listStyleType: string
        startList: string
        startListFrom: string
      }
    }
  }
}
export interface IPluginModuleDivider {
  type: typeof ModuleTypes.DIVIDER
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    style: {
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
    }
    computedStyle: {
      align: string
      hideContentOnMobile: boolean
    }
    divider: {
      style: {
        'border-top': string
        width: string
      }
    }
  }
}

export interface IPluginModuleForm {
  type: typeof ModuleTypes.FORM
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    computedStyle: {
      class: string
      hideContentOnDesktop: boolean
      hideContentOnMobile: boolean
    }
    style: {
      'background-color': string
      'font-family': string
      'font-size': string
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
      'text-align': string
      width: string
    }
    form: {
      attributes: unknown
      structure: unknown
      style: {
        buttons: {
          backgroundColor: string
          'border-bottom': string
          'border-left': string
          'border-radius': string
          'border-right': string
          'border-top': string
          color: string
          'line-height': string
          'max-width': string
          'padding-bottom': string
          'padding-left': string
          'padding-right': string
          'padding-top': string
          'text-align': string
          'font-weight': string
          'font-style': string
          'letter-spacing': string
          width: string
          outer: {
            flexGrow: number
            display: string
            'padding-bottom': string
            'padding-left': string
            'padding-right': string
            'padding-top': string
          },
        }
        fields: {
          backgroundColor: string
          'border-bottom': string
          'border-left': string
          'border-radius': string
          'border-right': string
          'border-top': string
          color: string
          outlineColor: string
          'padding-bottom': string
          'padding-left': string
          'padding-right': string
          'padding-top': string
        }
        labels: {
          color: string
          'font-style': string
          'font-weight': string
          'label-position': string
          'line-height': string
          'text-align': string
          'min-width': string
          'letter-spacing': string
        }
      }
    }
  }
}
export interface IPluginModuleSocialIcon {
  id: string
  image: {
    alt: string
    href: string
    prefix: string
    src: string
    title: string
  }
  name: string
  text: string
  type: string
}

export interface IPluginModuleSocial {
  type: typeof ModuleTypes.SOCIAL
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    style: {
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
      'text-align': string
    }
    computedStyle: {
      height: number
      hideContentOnMobile: boolean
      iconsDefaultWidth: number
      padding: string
      width: number
    }
    iconsList: {
      icons: IPluginModuleSocialIcon[]
    }
  }
}

export interface IPluginModuleMenuItem {
  link: {
    href: string,
    target: string,
    title: string,
  },
  text: string,
}

export interface IPluginModuleMenu {
  type: typeof ModuleTypes.MENU
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    computedStyle: {
      hideContentOnDesktop: boolean
      hideContentOnMobile: boolean
      layout: string
      linkColor: string
      hamburger: {
        backgroundColor: string
        foregroundColor: string
        iconSize: string
        iconType: string
        mobile: boolean
      },
      menuItemsSpacing: {
        'padding-bottom': string
        'padding-left': string
        'padding-right': string
        'padding-top': string
      },
    },
    style: {
      color: string
      'font-family': string
      'font-size': string
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
      'text-align': string
    }
    menuItemsList: {
      items: IPluginModuleMenuItem[]
    }
  }
}

export interface IPluginModuleSpacer {
  type: typeof ModuleTypes.SPACER
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    spacer: {
      style: {
        height: string
      }
    }
    computedStyle: {
      hideContentOnMobile: boolean
    }
  }
}

export type IPluginModule =
  IPluginModuleHeading | IPluginModuleParagraph | IPluginModuleButton |
  IPluginModuleList | IPluginModuleDivider | IPluginModuleForm |
  IPluginModuleSocial | IPluginModuleMenu | IPluginModuleSpacer

export interface IPluginColumn {
  'grid-columns': number
  modules: IPluginModule[]
  style: KebabCSSProperties
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

export type IPluginComputedStyle = Partial<{
  class: string
  height: number | string
  width: number | string
  hideContentOnAmp: boolean
  hideContentOnHtml: boolean
  hideContentOnMobile: boolean
  hideContentOnDesktop: boolean
  linkColor: string
  messageBackgroundColor: string
  messageWidth: string
  rowColStackOnMobile: boolean
  rowReverseColStackOnMobile: boolean
  iconsDefaultWidth: number
  padding: string
  align: string
  paragraphSpacing: string
  liIndent: string
  liSpacing: string
  listStylePosition: string
  listStyleType: string
  startList: string
  startListFrom: string
  itemsSpacing: string
  iconHeight: string
  layout: string
  menuItemsSpacing: {
    [x: string]: string
  }
  iconSpacing: {
    [x: string]: string
  }
  hamburger: {
    [x: string]: unknown
  }
}>

//TOFIX: understand if we can rename
export interface IPluginContent {
  style?: KebabCSSProperties
  //TOFIX: only pick correct properties
  computedStyle?: IPluginComputedStyle
}

export interface IPluginRowContent {
  //TOFIX: only pick correct properties
  computedStyle?: IPluginComputedStyle
  style: KebabCSSProperties
}
export interface IPluginRowContainer {
  style: KebabCSSProperties
  displayCondition?: IPluginDisplayCondition
}

export type RowsConfiguration = {
  emptyRows?: boolean
  defaultRows?: boolean
  externalContentURLs?: CustomRowConfiguration[]
}

export type CustomRowBehaviors = {
  canEdit?: boolean
  canDelete?: boolean
  canDeleteSyncedRows?: boolean
  canEditSyncedRows?: boolean
}

export type CustomRowConfiguration = {
  name?: string
  value?: string
  handle?: string
  isLocal?: boolean
  behaviors?: CustomRowBehaviors
}

export const RowLayoutType = {
  ONE_COLUMNS_EMPTY: 'one-column-empty',
  TWO_COLUMNS_EMPTY: 'two-columns-empty',
  TWO_COLUMNS_4_8_EMPTY: 'two-columns-4-8-empty',
  TWO_COLUMNS_8_4_EMPTY: 'two-columns-8-4-empty',
  TWO_COLUMNS_3_9_EMPTY: 'two-columns-3-9-empty',
  TWO_COLUMNS_9_3_EMPTY: 'two-columns-9-3-empty',
  THREE_COLUMNS_EMPTY: 'three-columns-empty',
  THREE_COLUMNS_3_3_6_EMPTY: 'three-columns-3-3-6-empty',
  THREE_COLUMNS_3_6_3_EMPTY: 'three-columns-3-6-3-empty',
  THREE_COLUMNS_6_3_3_EMPTY: 'three-columns-6-3-3-empty',
  FOUR_COLUMNS_EMPTY: 'four-columns-empty',
  SIX_COLUMNS_EMPTY: 'six-columns-empty',
} as const

export interface IPluginRow {
  // TOFIX name: string
  columns: IPluginColumn[]
  container: IPluginRowContainer
  content: IPluginContent
  locked?: boolean
  metadata?: Record<string, unknown>
  type: ValueOf<typeof RowLayoutType>
  uuid: string
  synced?: boolean
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

export enum OnInfoDetailHandle {
  AI_INTEGRATION = 'ai-integration'
}

export type BeePluginContentDialogHandler<K, T = undefined, A = K> = (
  resolve: (data: K, options?: Record<string, unknown>) => void,
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
  THREADRESOLVED = 'COMMENT_THREAD_RESOLVED',
  THREADREOPENED = 'COMMENT_THREAD_REOPENED'
}

export type IAuthor = {
  userHandle: string
  username: string
  userColor: string
}

export type BeePluginCommentPayload = {
  author: IAuthor
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
  comments: BeePluginCommentPayload[]
  threadUsers: {
    contributors: IAuthor[]
  }
}

export interface IMergeTag {
  name: string
  value: string
  previewValue?: string
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

export type AdvancedSettingsBehaviours = {
  canSelect: boolean
  canAdd: boolean
  canViewSidebar: boolean
  canClone: boolean
  canMove: boolean
  canDelete: boolean
}

export type AdvancedSettingsShowLocked = {
  show: boolean
  locked: boolean
}

export type AdvancedSettingsTextEditor = {
  toolbar: string[]
  fontSizes: string
}

export type BeePluginAdvancedPermission = RecursivePartial<{
  workspace: {
    stageToggle: BeePluginAdvancedPermissionStageToggle
  }
  tabs: {
    rows: AdvancedSettingsShowLocked
    settings: AdvancedSettingsShowLocked
    content: AdvancedSettingsShowLocked
  }
  rows: {
    behaviors: AdvancedSettingsBehaviours
    backgroundColorRow: AdvancedSettingsShowLocked
    backgroundColorContent: AdvancedSettingsShowLocked
    doNotStackOnMobile: AdvancedSettingsShowLocked
    backgroundImage: AdvancedSettingsShowLocked
    backgroundVideo: AdvancedSettingsShowLocked
    displayConditions: AdvancedSettingsShowLocked
    columnTabs: AdvancedSettingsShowLocked
    hideOnMobile: AdvancedSettingsShowLocked
    rowLayout: AdvancedSettingsShowLocked
    toolbar: {
      close: AdvancedSettingsShowLocked
      save: AdvancedSettingsShowLocked
      editSyncedRow: AdvancedSettingsShowLocked
    }
    verticalAlign: AdvancedSettingsShowLocked
  },
  settings: {
    title: AdvancedSettingsShowLocked
    description: AdvancedSettingsShowLocked
    language: AdvancedSettingsShowLocked
    favicon: AdvancedSettingsShowLocked
    contentAreaWidth: AdvancedSettingsShowLocked
    contentAreaAlign: AdvancedSettingsShowLocked
    containerBackgroundColor: AdvancedSettingsShowLocked
    contentBackgroundColor: AdvancedSettingsShowLocked
    defaultFontFamily: AdvancedSettingsShowLocked
    linkColor: AdvancedSettingsShowLocked
    containerBackgroundImage: AdvancedSettingsShowLocked
  }
  columns: {
    behaviors: {
      canResize: boolean
      canAdd: boolean
      canDelete: boolean
    }
  }
  content: {
    title: {
      textEditor: AdvancedSettingsTextEditor
      behaviors: AdvancedSettingsBehaviours
      properties: {
        fontWeight: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
        title: AdvancedSettingsShowLocked
        fontFamily: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        linkColor: AdvancedSettingsShowLocked
        textAlign: AdvancedSettingsShowLocked
        lineHeight: AdvancedSettingsShowLocked
        letterSpacing: AdvancedSettingsShowLocked
        direction: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
        aiIntegration: AdvancedSettingsShowLocked
      }
    }
    viwed: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        id: AdvancedSettingsShowLocked
      }
    },
    spacer: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        height: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      },
    },
    text: {
      textEditor: AdvancedSettingsTextEditor
      behaviors: AdvancedSettingsBehaviours
      properties: {
        letterSpacing: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        linkColor: AdvancedSettingsShowLocked
        lineHeight: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked

      }
    }
    button: {
      textEditor: AdvancedSettingsTextEditor
      behaviors: AdvancedSettingsBehaviours
      properties: {
        link: AdvancedSettingsShowLocked
        buttonWidth: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        backgroundColor: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        textAlign: AdvancedSettingsShowLocked
        buttonLineHeight: AdvancedSettingsShowLocked
        borderRadius: AdvancedSettingsShowLocked
        contentPadding: AdvancedSettingsShowLocked
        border: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        fontWeight: AdvancedSettingsShowLocked
        fontFamily: AdvancedSettingsShowLocked
        letterSpacing: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
        aiIntegration: AdvancedSettingsShowLocked
      }
    }
    image: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        imageWidth: AdvancedSettingsShowLocked
        textAlign: AdvancedSettingsShowLocked
        dynamicImage: AdvancedSettingsShowLocked
        imageSelector: AdvancedSettingsShowLocked
        inputText: AdvancedSettingsShowLocked
        link: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    divider: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        dividerMode: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        linkColor: AdvancedSettingsShowLocked
        lineHeight: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    social: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        iconsMode: AdvancedSettingsShowLocked
        icons: AdvancedSettingsShowLocked
        align: AdvancedSettingsShowLocked
        iconSpacing: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    dynamic: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        mergeContent: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    html: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        htmlEditor: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    video: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        videoUrl: AdvancedSettingsShowLocked
        videoIcon: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    form: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        width: AdvancedSettingsShowLocked
        textAlign: AdvancedSettingsShowLocked
        fontFamily: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        labelTextColor: AdvancedSettingsShowLocked
        labelLineHeight: AdvancedSettingsShowLocked
        labelTextAlign: AdvancedSettingsShowLocked
        labelStyle: AdvancedSettingsShowLocked
        labelPosition: AdvancedSettingsShowLocked
        labelMinWidth: AdvancedSettingsShowLocked
        labelLetterSpacing: AdvancedSettingsShowLocked
        fieldTextColor: AdvancedSettingsShowLocked
        fieldBackgroundColor: AdvancedSettingsShowLocked
        fieldPadding: AdvancedSettingsShowLocked
        fieldBorder: AdvancedSettingsShowLocked
        fieldBorderRadius: AdvancedSettingsShowLocked
        fieldOutline: AdvancedSettingsShowLocked
        buttonWidth: AdvancedSettingsShowLocked
        buttonTextColor: AdvancedSettingsShowLocked
        buttonBackgroundColor: AdvancedSettingsShowLocked
        buttonAlign: AdvancedSettingsShowLocked
        buttonPadding: AdvancedSettingsShowLocked
        buttonOuterPadding: AdvancedSettingsShowLocked
        buttonBorder: AdvancedSettingsShowLocked
        buttonBorderRadius: AdvancedSettingsShowLocked
        buttonLetterSpacing: AdvancedSettingsShowLocked
        buttonStyle: AdvancedSettingsShowLocked
        layOutFields: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    icons: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        fontFamily: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        align: AdvancedSettingsShowLocked
        letterSpacing: AdvancedSettingsShowLocked
        iconSize: AdvancedSettingsShowLocked
        itemsSpacing: AdvancedSettingsShowLocked
        iconSpacing: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
      }
    }
    paragraph: {
      behaviors: AdvancedSettingsBehaviours
      textEditor: AdvancedSettingsTextEditor
      properties: {
        fontFamily: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
        fontWeight: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        linkColor: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        lineHeight: AdvancedSettingsShowLocked
        textAlign: AdvancedSettingsShowLocked
        direction: AdvancedSettingsShowLocked
        letterSpacing: AdvancedSettingsShowLocked
        paragraphSpacing: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
        aiIntegration: AdvancedSettingsShowLocked
      },
    },
    list: {
      behaviors: AdvancedSettingsBehaviours
      textEditor: AdvancedSettingsTextEditor
      properties: {
        tag: AdvancedSettingsShowLocked
        listStyleType: AdvancedSettingsShowLocked
        fontFamily: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
        fontWeight: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        linkColor: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        lineHeight: AdvancedSettingsShowLocked
        textAlign: AdvancedSettingsShowLocked
        direction: AdvancedSettingsShowLocked
        letterSpacing: AdvancedSettingsShowLocked
        startListFrom: AdvancedSettingsShowLocked
        liSpacing: AdvancedSettingsShowLocked
        liIndent: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
        aiIntegration: AdvancedSettingsShowLocked
      },
    },
    menu: {
      behaviors: AdvancedSettingsBehaviours
      properties: {
        fontFamily: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        linkColor: AdvancedSettingsShowLocked
        align: AdvancedSettingsShowLocked
        letterSpacing: AdvancedSettingsShowLocked
        layout: AdvancedSettingsShowLocked
        separator: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hamburger: AdvancedSettingsShowLocked
        itemSpacing: AdvancedSettingsShowLocked
        menuItems: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked

      }
    }
    addon: {
      [uuid: string]: {
        behaviors: AdvancedSettingsBehaviours
      }
    }
  }
}>

export type IAiAddon = {
  id: 'ai-integration'
  settings?: {
    tokensAvailable?: number
    tokensUsed?: number
    tokenLabel?: string
    isPromptDisabled?: boolean
    isSuggestionsDisabled?: boolean
  }
}

export enum WorkspaceStage {
  desktop = 'desktop',
  mobile = 'mobile',
  global = 'global',
}

export type BeePluginWorkspace = {
  type?: LoadWorkspaceOptions
  stage?: WorkspaceStage
  displayHidden?: StageDisplayOptions
  hideStageToggle?: boolean
  editSingleRow?: boolean
}

export type IPluginSessionInfo = {
  sessionId: string
}

export type FontElement = {
  fontFamily: string
  name: string
  url?: string
}

export type EntityBody = {
  type: string
  webFonts: FontElement[]
  container: {
    style: {
      "background-color": string
    }
  }
  content: {
    style: {
        "font-family": string
        color: string
    }
    computedStyle: {
        align: string
        linkColor: string
        messageBackgroundColor: string
        messageWidth: string
    }
  }
}

export interface IEntityContentJson {
  page: {
    body: EntityBody
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

// TOFIX: Need to remove some properties with Omit generics
export type ILoadableProps = Partial<IBeeConfig>

export type ContentDefaultsTitle = Partial<{
  // TOFIX: understand why they are not handled in the plugin
  // hideContentOnMobile: boolean
  defaultHeadingLevel: string
  blockOptions: Partial<{
    align: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

export type TitleDefaultStyle = Partial<{
  color: string
  'font-size': string
  'font-weight': string
  'font-family': string
  'link-color': string
  'line-height': string
  'text-align': string
  'direction': string
  'letter-spacing': string
}>

export type TitleDefaultStyles = {
  h1: TitleDefaultStyle
  h2: TitleDefaultStyle
  h3: TitleDefaultStyle
}

// TOFIX: this module will probably be removed in the near future
export type ContentDefaultsText = {
  // we can't use partial for ContentDefaultsText since html is required
  html: string
  styles?: Partial<{
    color: string
    linkColor: string
    fontSize: string
    lineHeight: string
    fontFamily: string
  }>
  blockOptions?: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    hideContentOnMobile: boolean
  }>
}

export type ContentDefaultsImage = Partial<{
  alt: string
  href: string
  src: string
  width: string
  blockOptions: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    align: string
    hideContentOnMobile: boolean
  }>
}>

export type ContentDefaultsButton = Partial<{
  html: string
  label: string
  href: string
  width: string
  styles: Partial<{
    color: string
    fontSize: string
    fontFamily: string
    fontWeight: string
    backgroundColor: string
    borderBottom: string
    borderLeft: string
    borderRadius: string
    borderRight: string
    borderTop: string
    lineHeight: string
    maxWidth: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
  }>,
  blockOptions: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    align: string
    hideContentOnMobile: boolean
  }>
}>

export type ContentDefaultsDivider = Partial<{
  width: string
  line: string
  align: string
  blockOptions: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    hideContentOnMobile: boolean
  }>
}>

export type ContentDefaultsSocial = Partial<{
  icons: IPluginModuleSocialIcon[]
  blockOptions: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    align: string
    hideContentOnMobile: boolean
    // TOFIX: understand why they are not handled in the plugin
    // height: number
    // TOFIX: understand why they are not handled in the plugin
    // width: number
    // TOFIX: understand why they are not handled in the plugin
    // iconWidth: number
  }>
}>

export type ContentDefaultsDynamic = Partial<{
  blockOptions: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    hideContentOnMobile: boolean
  }>
}>

export type ContentDefaultsVideo = Partial<{
  src: string
  blockOptions: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    hideContentOnMobile: boolean
  }>
}>

export type ContentDefaultsForm = Partial<{
  structure: unknown
  styles: Partial<{
    width: string
    fontSize: string
    fontFamily: string
  }>
  labelsOptions: Partial<{
    color: string
    lineHeight: string
    fontWeight: string
    fontStyle: string
    align: string
    position: string
    letterSpacing: string
    minWidth: string
  }>
  fieldsOptions: Partial<{
    color: string
    backgroundColor: string
    outlineColor: string
    borderRadius: string
    borderTop: string
    borderRight: string
    borderBottom: string
    borderLeft: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
  }>
  buttonsOptions: Partial<{
    color: string
    backgroundColor: string
    borderRadius: string
    borderTop: string
    borderRight: string
    borderBottom: string
    borderLeft: string
    lineHeight: string
    align: string
    width: string
    maxWidth: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    marginBottom: string
    margingLeft: string
    marginRight: string
    marginTop: string
    letterSpacing: string
    fontStyle: string
    fontWeight: string
  }>
  blockOptions: Partial<{
    align: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    backgroundColor: string
    hideContentOnMobile: boolean
    hideContentOnDesktop: boolean
  }>
}>

export type ContentDefaultsIcons = Partial<{
  items: unknown
  styles: Partial<{
    color: string
    fontSize: string
    fontFamily: string
  }>
  blockOptions: Partial<{
    align: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    hideContentOnMobile: boolean
    hideContentOnDesktop: boolean
    itemSpacing: string
    iconHeight: string
  }>
  iconSpacing: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
  }>
}>

export type ContentDefaultsMenu = Partial<{
  items: unknown
  styles: Partial<{
    color: string
    linkColor: string
    fontSize: string
    fontFamily: string
  }>
  hamburger: Partial<{
    mobile: boolean
    foregroundColor: string
    backgroundColor: string
    iconSize: string
    iconType: string
  }>
  blockOptions: Partial<{
    align: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    layout: string
    hideContentOnMobile: boolean
    hideContentOnDesktop: boolean
  }>
  itemsSpacing: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
  }>
}>

export type ContentDefaultsSpacer = Partial<{
  height: string
  blockOptions: Partial<{
    hideContentOnMobile: boolean
  }>
}>

export type ContentDefaultsParagraph = Partial<{
  styles: Partial<{
    color: string
    fontSize: string
    fontFamily: string
    fontWeight: string
    lineHeight: string
    textAlign: string
    direction: string
    letterSpacing: string
    linkColor: string
    paragraphSpacing: string
  }>
  blockOptions: Partial<{
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

export type ContentDefaultsList = Partial<{
  styles: Partial<{
    color: string
    fontSize: string
    fontFamily: string
    fontWeight: string
    lineHeight: string
    textAlign: string
    direction: string
    letterSpacing: string
    linkColor: string
    liSpacing: string
    liIndent: string
    listType: string
    listStyleType: string
    startList: string
    listStylePosition: string
  }>
  blockOptions: Partial<{
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

export type ContentDefaultsGeneral = Partial<{
  backgroundColor: string
  contentAreaBackgroundColor: string
  defaultFont: string
  linkColor: string
  contentAreaWidth: string
}>

export type ContentDefaults = Partial<{
  title: ContentDefaultsTitle
  text: ContentDefaultsText
  image: ContentDefaultsImage
  button: ContentDefaultsButton
  divider: ContentDefaultsDivider
  social: ContentDefaultsSocial
  dynamic: ContentDefaultsDynamic
  video: ContentDefaultsVideo
  form: ContentDefaultsForm
  paragraph: ContentDefaultsParagraph
  spacer: ContentDefaultsSpacer
  menu: ContentDefaultsMenu
  icons: ContentDefaultsIcons
  list: ContentDefaultsList
  general: ContentDefaultsGeneral
}>

export enum TokenStatus {
  OK = 'ok',
  REFRESHING= 'refreshing'
}
export interface IToken {
  access_token: string
  v2: boolean
  status: TokenStatus
}

export interface IAddOnResponseImage {
  type: 'image',
  value: {
    alt: string,
    href: string,
    src: string,
    dynamicSrc: string
  }
}
export interface IAddOnResponseHTML {
  type: 'html',
  value: {
    html: string
  }
}
export interface IAddOnResponseMixed {
  type: 'mixed',
  value: Record<string, string>[] //todo define the specific type for this part
}
export interface IAddOnResponseRowAddOn {
  type: 'rowAddon',
  value: Record<string, string> //todo define the specific type for this part
}

export type BeeContentDialogs = {
  engage?: {
    handler: BeePluginContentDialogHandler<Partial<IBeeConfig>, undefined, EngageHandle>
  },
  saveRow?: {
    label?: string
    handler: BeePluginContentDialogHandler<Record<string, unknown>, undefined, IPluginRow>
  }
  editSyncedRow?: {
    label?: string
    description?: string
    notPermittedDescription?: string
    handler: BeePluginContentDialogHandler<boolean, undefined, IPluginRow>
  }
  addOn?: {
    label: string
    handler: BeePluginContentDialogHandler<IAddOnResponseImage | IAddOnResponseHTML | IAddOnResponseMixed | IAddOnResponseRowAddOn>
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
    label?: string
    handler: BeePluginContentDialogHandler<IPluginForm>
  },
  filePicker?: {
    label?: string
    handler: BeePluginContentDialogHandler<IPluginFilePicker>
  },
  getMention?: {
    label?: string
    handler: BeePluginContentDialogHandler<IInvitedMention[], undefined, string>
  }
  onDeleteRow?: {
    label?: string
    handler: BeePluginContentDialogHandler<IRefreshSavedRow, undefined, unknown>
  }
  onEditRow?: {
    label?: string
    handler: BeePluginContentDialogHandler<IRefreshSavedRow, undefined, unknown>
  },
  externalContentURLs?: {
    label?: string
    handler: BeePluginContentDialogHandler<CustomRowConfiguration>
  }
}

export type BeePluginFont = {
  name: string
  fontFamily: string
  url?: string
  fontWeight: Record<number, string>
}

export type BeePluginEditorFonts = {
  showDefaultFonts: boolean
  customFonts: BeePluginFont[]
}

export interface IBeeConfig {
  uid?: string
  container: string
  trackChanges?: boolean
  preventClose?: boolean
  enable_display_conditions?: boolean
  language?: string
  templateLanguage?: TemplateLanguage
  templateLanguages?: TemplateLanguage[]
  mergeTags?: IMergeTag[]
  mergeContents?: IMergeContent[]
  specialLinks?: ISpecialLink[]
  username?: string
  userColor?: string
  userHandle?: string
  commenting?: boolean
  customAssetsOptions?: Record<string, unknown>
  advancedPermissions?: BeePluginAdvancedPermission
  defaultForm?: unknown
  loadingSpinnerTheme?: string
  loadingSpinnerDisableOnSave?: boolean
  editorFonts?: BeePluginEditorFonts
  roleHash?: string
  role?: BeePluginRoles,
  defaultColors?: string[]
  contentDefaults?: ContentDefaults
  defaultModulesOrder?: ValueOf<typeof ModuleDescriptorOrderNames>[] | string[]
  modulesGroups?: IModulesGroups[]
  customCss?: string
  workspace?: BeePluginWorkspace
  autosave?: number,
  customHeaders?: BeePluginCustomHeader[]
  saveRows?: boolean,
  autoScrollTo?: string,
  contentDialog?: BeeContentDialogs,
  rowsConfiguration?: RowsConfiguration
  hooks?: BeePluginConfigurationsHooks
  defaultTab?: 'content' | 'rows' | 'settings'
  titleDefaultStyles?: TitleDefaultStyles
  disableColorHistory?: boolean
  disableBaseColors?: boolean
  onLoad?: (json: IEntityContentJson) => void
  onPreview?: (opened: boolean) => void
  onTogglePreview?: (toggled: boolean) => void
  onSessionStarted?: (sessionInfo: IPluginSessionInfo) => void
  onSessionChange?: (sessionInfo: IPluginSessionInfo) => void
  onReady?: (args: Record<string, unknown>) => void
  onSave?: (pageJson: string, pageHtml: string, ampHtml: string | null, templateVersion: number, language: string | null) => void
  onSaveRow?: (rowJson: string, rowHtml: string, pageJson: string) => void
  onError?: (error: BeePluginError) => void
  onAutoSave?: (pageJson: string) => void
  onSaveAsTemplate?: (pageJson: string, templateVersion: number) => void
  onStart?: () => void
  onSend?: (pageHtml: string) => void
  onChange?: (json: string, detail: BeePluginMessageEditDetail, version: number) => void
  onWarning?: (error: BeePluginError) => void
  onComment?: (commentPayload: BeePluginOnCommentPayload, json: string) => void
  onInfo?: (info: BeePluginInfo) => void
  onLoadWorkspace?: (worspaceType: LoadWorkspaceOptions) => void
}

export type { KebabCSSProperties }
