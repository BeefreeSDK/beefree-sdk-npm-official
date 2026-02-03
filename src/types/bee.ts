import * as CSS from 'csstype'
import { KebabKeys, RecursivePartial, RequireAtLeastOne, ValueOf } from './utils'
import {
  FileManagerAddon,
  SimpleButton,
  SimpleDivider,
  SimpleHtml,
  SimpleIcons,
  SimpleImage, SimpleList, SimpleMenu, SimpleParagraph,
  SimpleRow, SimpleTitle
} from "./simpleSchemas";

export interface SDKOptions {
  beePluginUrl?: string
  authUrl?: string,
  wrapperInfo?: {
    packageName: string
    packageVersion: string
  }
}

/**
 * @deprecated Use SDKOptions instead
 */
export type IUrlConfig = SDKOptions

export interface IBeeOptions {
  shared?: boolean
}

export interface TemplateLanguage {
  label: string,
  value: string
}

export interface MetadataLanguage {
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

export interface ILanguage {
  language: string
}

export interface IExecCommandReturnValue {
  status: 'success' | 'error'
  data?: Record<string, unknown>
}

export enum SidebarTabs {
  CONTENT = 'content',
  SETTINGS = 'settings',
  ROWS = 'rows',
}

export type ExecCommand = Promise<IExecCommandReturnValue>

export enum ExecCommands {
  SELECT = 'select',
  SCROLL = 'scroll',
  HIGHLIGHT = 'highlight',
  FOCUS = 'focus',
  TAB = 'tab',
}

export interface IExecCommandOptions {
  target?: {
    uuid?: string
    row?: number
    column?: number
    module?: number
    key?: string
    selector?: string
  } | SidebarTabs
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
  FEATURE_NOT_AVAILABLE_FOR_PLAN = 1704,
  GENERIC_BUMP_ERROR = 2000,
  INVALID_TARGET_VERSION = 2100,
  VALIDATION_ERROR_DETAIL = 2200,
  MISSING_TEMPLATE_VERSION = 2300,
  INVALID_TEMPLATE_VERSION = 2400,
  TRASFORMATION_ERROR = 2500,
  BACKWARD_TRASFORMATION_ERROR = 2600,
  SERVICE_ERROR = 3000,
  API_GENERIC_ERROR = 9900,
  GENERIC_ERROR = 9999,
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
  // WEBHOOK ERRORS
  WEBHOOK_CALL_FAILED = 5250,
  // Frontend API errors
  FE_API_GENERIC_ERROR = 7000,
  FE_API_INVALID_COMMAND = 7005,
  FE_API_INVALID_COMMAND_OPTIONS = 7010,
  FE_API_ENTITY_LOCKED = 7020,
  FE_API_ENTITY_NOT_FOUND = 7030,
  FE_API_ELEMENT_NOT_FOUND = 7040,
  FE_API_FORBIDDEN_COMMAND = 7050,
}

export type BeePluginError = {
  code?: BeePluginErrorCodes
  data?: BeePluginErrorData
  detail?: string | Record<string, unknown>
  message: string
  name?: string
}

export enum OnInfoDetailHandle {
  AI_INTEGRATION = 'ai-integration',
  AI_ALT_TEXT = 'ai-alt-text',
  AI_IMAGE_GENERATION = 'ai-image-generation'
}

export type AiIntegrationErrorDetail = {
  handle: OnInfoDetailHandle.AI_INTEGRATION
  promptId: string
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number,
    prompt_tokens_details: {
      cached_tokens: number
    },
    completion_tokens_details: {
      reasoning_tokens: number
    }
  }
}

export type AiAltTextErrorDetail = {
  handle: OnInfoDetailHandle.AI_ALT_TEXT
  uid: string
  consumedImages: number
}

export type AiImageGenerationErrorDetail = {
  handle: OnInfoDetailHandle.AI_IMAGE_GENERATION
  uid: string
  consumedImages: number
}

export type BeePluginInfo = {
  code: BeePluginErrorCodes
  message: string
  detail: AiIntegrationErrorDetail | AiAltTextErrorDetail | AiImageGenerationErrorDetail
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
  LIST: 'mailup-bee-newsletter-modules-list',
  TABLE: 'mailup-bee-newsletter-modules-table',
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
    mobileStyle?: Partial<{
      'font-size': string
      'text-align': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
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
    mobileStyle?: Partial<{
      'font-size': string
      'text-align': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
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
    hoverStyle?: {
      "background-color": string,
      "color": string,
      "border-top": string,
      "border-right": string,
      "border-bottom": string,
      "border-left": string
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
        'direction': string
        'font-family': string
        'font-size': string
        'font-weight': string
        'letter-spacing': string
        'line-height': string
        'max-width': string
        'padding-bottom': string
        'padding-left': string
        'padding-right': string
        'padding-top': string
        'width': string
      }
    }
    mobileStyle?: Partial<{
      'font-size': string
      'text-align': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
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
    mobileStyle?: Partial<{
      'font-size': string
      'text-align': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
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
    mobileStyle?: Partial<{
      align: string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
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
    mobileStyle?: Partial<{
      'font-size': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
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
    mobileStyle?: Partial<{
      'text-align': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
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
    mobileStyle?: Partial<{
      'text-align': string
      'padding-top':string
      'padding-right':string
      'padding-bottom':string
      'padding-left':string
      'font-size': string
    }>
  }
}

export interface IPluginModuleTable {
  type: typeof ModuleTypes.TABLE
  locked?: boolean
  uuid: string
  descriptor: {
    id?: string
    style: {
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    },
    table: {
      content: {
        headers: {
          cells: {
            html: string
          }[]
        }[],
        rows: {
          cells: {
            html: string
          }[]
        }[]
      },
      style: {
        color: string
        'font-size': string
        'font-family': string
        'font-weight': string
        'line-height': string
        'text-align': string
        direction: string
        'letter-spacing': string
        'background-color': string
        'border-top': string
        'border-right': string
        'border-bottom': string
        'border-left': string
      },
      computedStyle: {
        alternateRowBackgroundColor: string
        linkColor: string
        headersFontSize: string
        headersFontWeight: string
        headersTextAlign: string
        headersBackgroundColor: string
        headersColor: string
      }
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

export interface IPluginModuleIcons {
  type: typeof ModuleTypes.ICONS
  locked?: boolean
  descriptor: {
    id?: string
    computedStyle: {
      hideContentOnDesktop: boolean
      hideContentOnMobile: boolean
      iconHeight: string
      iconSpacing: {
        'padding-bottom': string
        'padding-left': string
        'padding-right': string
        'padding-top': string
      }
      itemsSpacing: string
    }
    iconsList: {
      icons: {
        height: string
        href: string
        id: string
        image: string
        target: string
        text: string
        textPosition: string
        width: string
      }[]
    }
    style: {
      color: string
      'font-family': string
      'font-size': string
      'font-weight': string
      'padding-bottom': string
      'padding-left': string
      'padding-right': string
      'padding-top': string
      'text-align': string
    }
    mobileStyle?: Partial<{
      'font-size': string
      'text-align': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
  }
  uuid: string
}

type ModuleVideoMode = (
  {
    mode: 'thumbnail'
    thumbSrc: string
    thumbRatio: string
    iconType: number
    iconColor1: string
    iconColor2: string
    iconSize: number
    iconSrc: string
    controls?: never
    loop?: never
  }
  | {
    mode: 'embedded'
    controls: boolean
    loop: boolean
    thumbSrc?: never
    thumbRatio?: never
    iconType?: never
    iconColor1?: never
    iconColor2?: never
    iconSize?: never
    iconSrc?: never
  }
  | {
    mode: 'custom'
    controls: boolean
    thumbSrc?: never
    thumbRatio?: never
    iconType?: never
    iconColor1?: never
    iconColor2?: never
    iconSize?: never
    iconSrc?: never
    loop?: never
  }
  )


export interface IPluginModuleVideo {
  type: typeof ModuleTypes.VIDEO
  locked?: boolean
  descriptor: {
    id?: string
    video: {
      src: string
    } & ModuleVideoMode
    style: {
      width: string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }
    computedStyle: {
      class: string
      width: string
      hideContentOnMobile: boolean
    }
    mobileStyle?: Partial<{
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
  }
}

export interface IPluginModuleText {
  type: typeof ModuleTypes.TEXT
  locked?: boolean
  descriptor: {
    id?: string
    text: {
      html: string
      style: {
        color: string
        'line-height': string
        'font-family': string
      }
      computedStyle: {
        linkColor: string
      }
    }
    style: {
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }
    computedStyle: {
      hideContentOnMobile: boolean
    }
    mobileStyle?: Partial<{
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
  }
}

export interface IPluginModuleMergeContent {
  type: typeof ModuleTypes.MERGE_CONTENT
  locked?: boolean
  descriptor: {
    id?: string
    mergeContent: IMergeContent
    style: {
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }
    computedStyle: {
      hideContentOnMobile: boolean
    }
  }
}

const LinkTarget = {
  BLANK: '_blank',
  SELF: '_self',
  TOP: '_top',
} as const

export interface IPluginModuleImage {
  type: typeof ModuleTypes.IMAGE
  locked?: boolean
  descriptor: {
    id?: string
    image: {
      alt: string
      title: string
      src: string
      href: string
      target: ValueOf<typeof LinkTarget>
    }
    style: {
      width: string
      'border-radius': string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }
    computedStyle: {
      class: string
      width: string
      hideContentOnMobile: boolean
    }
    mobileStyle?: Partial<{
      class: string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>
  }
}

export interface IPluginModuleHtml {
  type: typeof ModuleTypes.HTML
  locked?: boolean
  descriptor: {
    id?: string
    html: {
      html: string
    },
    style: {
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    },
    computedStyle: {
      hideContentOnMobile: boolean
      hideContentOnDesktop: boolean
      hideContentOnAmp: boolean
      hideContentOnHtml: boolean
    },
  }
}

export interface IPluginModuleEmpty {
  type: typeof ModuleTypes.EMPTY
  descriptor: Record<string, never>
}

interface CarouselSlide {
  type: string
  alt: string
  src: string
  href: string
}

export interface IPluginModuleCarousel {
  type: typeof ModuleTypes.CAROUSEL
  locked?: boolean
  descriptor: {
    id?: string
    carousel: {
      slides: CarouselSlide[],
      autoplayInterval: number
      dotNavigation: boolean
      dotColor: string
      autoPlay: boolean
    },
    style: {
      width: string
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    },
    mobileStyle?: Partial<{
      'padding-top': string
      'padding-right': string
      'padding-bottom': string
      'padding-left': string
    }>,
    computedStyle: {
      hideContentOnMobile: boolean
      hideContentOnAmp: boolean
      height: number
    }
  }
}

export type IPluginModule =
  IPluginModuleButton
  | IPluginModuleCarousel
  | IPluginModuleDivider
  | IPluginModuleEmpty
  | IPluginModuleForm
  | IPluginModuleHeading
  | IPluginModuleHtml
  | IPluginModuleIcons
  | IPluginModuleImage
  | IPluginModuleList
  | IPluginModuleMenu
  | IPluginModuleMergeContent
  | IPluginModuleParagraph
  | IPluginModuleSocial
  | IPluginModuleSpacer
  | IPluginModuleTable
  | IPluginModuleText
  | IPluginModuleVideo

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
  maxRowsDisplayed?: number
  selectedRowType?: string
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

export type MergeContentsHandler = {
  name: string
  value: string
}

export type RowDisplayConditionsHandler = {
  after: string
  before: string
  type: string
  label: string
  description: string
}

export type IUpsellConfiguration = Partial<IBeeConfig>

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
  columns: IPluginColumn[]
  container: IPluginRowContainer
  content: IPluginContent
  type: ValueOf<typeof RowLayoutType>
  uuid: string
  locked?: boolean
  synced?: boolean
  metadata?: Record<string, unknown>
  empty?: boolean
  name?: string
}

export interface IPluginEditDeleteRow {
  handle: string
  label: string
  row: Partial<IPluginRow>
  value: string
}

export interface IInvitedMention {
  username: string
  value: string
  uid: string | number
  userColor?: string
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
  resolve: (data: K, options?: Record<string, unknown>) => void,
  reject: () => void,
  args: A,
  handle?: T
) => void | Promise<void>

export type BeePluginConfigurationsHooks = {
  getMentions?: {
    handler: BeePluginContentDialogHandler<IInvitedMention[], undefined, string>
  },
  getRows?: {
    handler: BeePluginContentDialogHandler<IPluginRow[], undefined, {handle: string; value: string}>
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

export type BeePluginUpdatePayload = {
  content: string
  mentions: string[]
}

export type BeePluginOnCommentChangePayloadWithComment = {
  type: OnCommentChangeEnum.NEWCOMMENT | OnCommentChangeEnum.THREADRESOLVED | OnCommentChangeEnum.THREADREOPENED
  payload: {
    commentId: string
    comment: BeePluginCommentPayload
  }
}

export type BeePluginOnCommentChangePayloadForWithUpdate = {
  type: OnCommentChangeEnum.CHANGECOMMENT
  payload: {
    commentId: string
    update: BeePluginUpdatePayload
  }
}

export type BeePluginOnCommentChangePayloadForWithDeletedComment = {
  type: OnCommentChangeEnum.DELETECOMMENT
  payload: {
    commentId: string
    deletedComment: BeePluginCommentPayload
    deletedResponses: {
      [commentId: string]: BeePluginCommentPayload
    }
  }
}

export type BeePluginOnCommentChangePayload = (
  BeePluginOnCommentChangePayloadWithComment
  | BeePluginOnCommentChangePayloadForWithUpdate
  | BeePluginOnCommentChangePayloadForWithDeletedComment
)

export type BeePluginOnCommentPayload = {
  change: BeePluginOnCommentChangePayload
  comments: {
    [commentId: string]: BeePluginCommentPayload
  }
  threadUsers: {
    contributors: IAuthor[]
  }
  collaboration?: boolean
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

export type CustomAttribute = {
  key: string
  name?: string
  value?: string | boolean | null | string[]
  target: string
  required?: boolean
}

export type CustomAttributes = {
  attributes?: CustomAttribute[]
  enableOpenFields?: boolean
  enableBlocks?: ('social' | 'menu' | 'icons' | 'video' | 'image' | 'button' | 'textToolbar')[]
}

export type DisplayConditionsAdvancedSettings = AdvancedSettingsShowLocked & {
  CanRemoveDisplayConditions?: boolean
  CanEditDisplayConditions?: boolean
}

export type BeePluginAdvancedPermission = RecursivePartial<{
  components: {
    colorPicker?: {
      canViewColorInput: boolean,
      canViewSliders: boolean,
      canSetAlpha: boolean,
      canViewSwatches: boolean,
      canChangeTextEditorColor: boolean
    },
    filePicker?: {
      canApplyEffects: boolean,
      canChangeImage: boolean,
      canChangeVideo: boolean,
      canCreateFolder: boolean,
      canDeleteFile: boolean,
      canDeleteFolder: boolean,
      canImportFile: boolean,
      canSearchFreePhotos: boolean,
      canSearchFreeVideos: boolean,
      canUpload: boolean,
      maxUploadFileSize: number
    }
    linkTypes?: {
      webAddress: {
        show: boolean
      },
      emailAddress: {
        show: boolean
      },
      telephone: {
        show: boolean
      },
      text: {
        show: boolean
      },
      anchor: {
        show: boolean
      }
    }
    advancedPreview?: {
      showTitle: boolean
      showCloseBox: boolean
      devicePresetSizes?: DevicePresetSizes
    }
  }
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
    displayConditions: DisplayConditionsAdvancedSettings
    columnTabs: AdvancedSettingsShowLocked
    hideOnMobile: AdvancedSettingsShowLocked
    rowLayout: AdvancedSettingsShowLocked
    contentBorder: AdvancedSettingsShowLocked
    padding: AdvancedSettingsShowLocked
    roundedCorners: AdvancedSettingsShowLocked
    toolbar: {
      close: AdvancedSettingsShowLocked
      save: AdvancedSettingsShowLocked
      editSyncedRow: AdvancedSettingsShowLocked
    }
    verticalAlign: AdvancedSettingsShowLocked
    columnsSpacing: AdvancedSettingsShowLocked
    columnsBorderRadius: AdvancedSettingsShowLocked
    addon: {
      [uuid: string]: {
        behaviors: AdvancedSettingsBehaviours
      }
    }
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
        hoverStyles: AdvancedSettingsShowLocked
        customAttributes: AdvancedSettingsShowLocked
        direction: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
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
        customAttributes: AdvancedSettingsShowLocked
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
        customAttributes: AdvancedSettingsShowLocked
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
        customAttributes: AdvancedSettingsShowLocked
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
        icons: AdvancedSettingsShowLocked
        fontWeight: AdvancedSettingsShowLocked
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
        customAttributes: AdvancedSettingsShowLocked
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
        customAttributes: AdvancedSettingsShowLocked
      }
    },
    table: {
      behaviors: AdvancedSettingsBehaviours
      textEditor: AdvancedSettingsTextEditor
      properties: {
        columns: AdvancedSettingsShowLocked
        rows: AdvancedSettingsShowLocked
        backgroundColor: AdvancedSettingsShowLocked
        border: AdvancedSettingsShowLocked
        textColor: AdvancedSettingsShowLocked
        linkColor: AdvancedSettingsShowLocked
        fontFamily: AdvancedSettingsShowLocked
        fontWeight: AdvancedSettingsShowLocked
        fontSize: AdvancedSettingsShowLocked
        textAlign: AdvancedSettingsShowLocked
        lineHeight: AdvancedSettingsShowLocked
        letterSpacing: AdvancedSettingsShowLocked
        direction: AdvancedSettingsShowLocked
        padding: AdvancedSettingsShowLocked
        hideOnMobile: AdvancedSettingsShowLocked
        hideOnAmp: AdvancedSettingsShowLocked
        id: AdvancedSettingsShowLocked
        alternateRowBackgroundColor: AdvancedSettingsShowLocked
        headers: AdvancedSettingsShowLocked
      }
    }
    addon: {
      [uuid: string]: {
        behaviors: AdvancedSettingsBehaviours
      }
    }
  }
}>

export enum WorkspaceStage {
  desktop = 'desktop',
  mobile = 'mobile',
  global = 'global',
}

type PopupLayout =
  |'classic-center'
  | 'drawer-left'
  | 'drawer-right'
  | 'bar-bottom'
  | 'bar-top'
  | 'default'
  | 'classic-top-right'
  | 'classic-top-left'
  | 'classic-bottom-right'
  | 'classic-bottom-left'

type PopupTheme =
  | 'bootstrap'
  | 'jQuery'
  | 'custom'
  | 'banner'
  | 'material'
  | 'default'

export type PopupThemeHeader = {
  readonly display?: string
  readonly flexShrink?: number
  readonly alignItems?: string
  readonly justifyContent?: string
  readonly padding?: string
  readonly borderBottom?: string
  readonly borderTopLeftRadius?: string
  readonly borderTopRightRadius?: string
  readonly width?: string
  readonly position?: string
  readonly right?: CSS.Properties
  readonly left?: CSS.Properties
  readonly alignSelf?: string
}

export type PopupThemeStyles = {
  container?: CSS.Properties
  header?: PopupThemeHeader
  content?: CSS.Properties
  footer?: CSS.Properties
  overlay?: CSS.Properties
}

export type PopupLayoutStyles = {
  html?: CSS.Properties
  body?: CSS.Properties
  main?: CSS.Properties
  wrapper?: CSS.Properties
}

export type PopupWorkspaceConfig = {
  contentWidth?: number
  contentWidthMobile?: number
  layout?: PopupLayout
  theme?: PopupTheme
  customStyles?: PopupThemeStyles
  customLayout?: PopupLayoutStyles
  backgroundImage?: string
  backgroundImageMobile?: string
  desktop?: {
    customStyles?: PopupThemeStyles
    customLayout?: PopupLayoutStyles
  }
  mobile?: {
    customStyles?: PopupThemeStyles
    customLayout?: PopupLayoutStyles
  }
}

export type BeePluginWorkspace = {
  displayHidden?: StageDisplayOptions
  editSingleRow?: boolean
  hideStageToggle?: boolean
  popup?: PopupWorkspaceConfig
  stage?: WorkspaceStage
  type?: LoadWorkspaceOptions
}

export type IPluginSessionInfo = {
  sessionId: string
}

const SessionChangeType = {
  USER_JOINED: 'USER_JOINED',
  USER_LEFT: 'USER_LEFT',
} as const

type SessionUser = {
  userColor: string
  userId: string
  username: string
}

export type IPluginSessionChangeInfo = {
  change: {
    type: ValueOf<typeof SessionChangeType>,
    value: SessionUser
  },
  sessionData: {
    users: Record<SessionUser['userId'], SessionUser>
  }
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

export interface IFavicon {
  handle: string
  url: string
}

export interface IEntityJson {
  body: EntityBody
  description: string
  rows: IPluginRow[]
  template: {
    name: string
    type: string
    version: string
  }
  head?: {
    customTags?: string
    meta?: {
      favicon?: IFavicon[]
      lang?: string
      preheader?: string
      subject?: string
      title?: string
      description?: string
    },
  }
  language?: {
    label: string
    value: string
  }
  title: string
}

export interface IEntityContentJson {
  page: IEntityJson
  comments: {
    [commentId: string]: BeePluginCommentPayload
  }
}

export interface ITemplateJson {
  data: {
    json: IEntityContentJson
    version: number
  }
}

export const ContentCodes = {
  TEXT_BLOCK: '01',
  IMAGE_BLOCK: '02',
  BUTTON_BLOCK: '03',
  DIVIDER_BLOCK: '04',
  SOCIAL_BLOCK: '05',
  DYNAMIC_CONTENT_BLOCK: '06',
  HTML_BLOCK: '07',
  VIDEO_BLOCK: '08',
  FORM: '09',
  ICONS: '10',
  MENU: '11',
  ROW: '14',
  MESSAGE: '16',
  SPACER: '18',
  PARAGRAPH: '22',
  LIST: '23',
  TABLE: '26',
} as const;

export const ActionCodes = {
  DROPPED: '00',
  DRAGGED: '01',
  DELETED: '02',
  DUPLICATED: '03',
  CHANGED: '04',
  OPENED: '05',
  CLOSED: '06',
  LOCKED: '07',
  SAVED: '08',
  RESTORED: '09',
  CONTENT_AREA_BACKGROUND_COLOR: '10',
  DO_NOT_STACK_ON_MOBILE: '11',
  ROW_BACKGROUND_IMAGE: '12',
  BACKGROUND_CENTER: '13',
  BACKGROUND_REPEAT: '14',
  BACKGROUND_FULL_WIDTH: '15',
  ROW_DISPLAY_CONDITION: '16',
  REVERSE_STACK_ORDER_ON_MOBILE: '17',
  TEXT_COLOR: '20',
  LINK_COLOR: '21',
  TEXT_EDITED: '23',
  LINE_HEIGHT: '24',
  CONTENT_AREA_WIDTH: '25',
  BACKGROUND_COLOR: '27',
  DEFAULT_FONT: '28',
  PADDING_ALL_SIDES: '30',
  PADDING_LEFT: '31',
  PADDING_RIGHT: '32',
  PADDING_TOP: '33',
  PADDING_BOTTOM: '34',
  HIDE_ON_MOBILE: '40',
  VIDEO_URL: '41',
  PLAY_ICON_TYPE: '42',
  PLAY_ICON_COLOR: '43',
  PLAY_ICON_SIZE: '44',
  ALIGN: '50',
  AUTOMATIC_IMAGE_RESIZING: '51',
  FULL_WIDTH_ON_MOBILE: '52',
  IMAGE_WIDTH: '53',
  ALTERNATE_TEXT: '60',
  DYNAMIC_IMAGE_SRC: '61',
  DYNAMIC_IMAGE_TOGGLE: '62',
  CHANGE_IMAGE: '63',
  IMAGE_LINK: '64',
  BUTTON_ALIGN: '70',
  BUTTON_LINK_TYPE: '71',
  BUTTON_WIDTH: '72',
  BUTTON_AUTO_WIDTH: '73',
  BUTTON_BACKGROUND_COLOR: '74',
  BORDER_RADIUS: '75',
  HTML_EDITED: '80',
  BORDER_ALL_SIDES: '81',
  BORDER_LEFT: '82',
  BORDER_RIGHT: '83',
  BORDER_TOP: '84',
  BORDER_BOTTOM: '85',
  DIVIDER_LINE_TOGGLE: '90',
  DIVIDER_WIDTH: '91',
  DIVIDER_HEIGHT: '92',
  DIVIDER_ALIGN: '93',
  ICON_NAME: '95',
  ICON_ALTERNATE_TEXT: '96',
  ICON_URL: '97',
  ICON_SPACING: '98',
  ICON_ALIGN: '99',
  BACKGROUND_VIDEO: '128',
  PARAGRAPH_SPACING: '129',
  FONT_WEIGHT: '130',
  LIST_TYPE: '131',
  START_LIST: '132',
  LIST_SPACING: '133',
  LIST_INDENT: '134',
  LIST_STYLE_POSITION: '135',
} as const;

type EventCodeKeys = `${keyof typeof ContentCodes}_${keyof typeof ActionCodes}`;

export const EventCodes: Record<EventCodeKeys, string> = Object.fromEntries(
  Object.entries(ContentCodes).flatMap(([contentKey, contentCode]) =>
    Object.entries(ActionCodes).map(([actionKey, actionCode]) => [
      `${contentKey}_${actionKey}`,
      `${contentCode}${actionCode}`,
    ])
  )
) as Record<EventCodeKeys, string>;

export type BeePluginMessageEditDetailPatch = {
  op: string
  path: string
  value: string
}

export type BeePluginMessageEditDetail = {
  code: ValueOf<typeof EventCodes>
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
  mobileStyles: Partial<{
    textAlign: string
    fontSize: string
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

type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TitleDefaultStyles = Partial<Record<TitleLevel, TitleDefaultStyle>>

// TOFIX: this module will probably be removed in the near future
export type ContentDefaultsText = Partial<{
  // we can't use partial for ContentDefaultsText since html is required
  html: string
  styles: Partial<{
    color: string
    linkColor: string
    fontSize: string
    lineHeight: string
    fontFamily: string
  }>
  blockOptions: Partial<{
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    hideContentOnMobile: boolean
  }>
  mobileStyles: Partial<{
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

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
  mobileStyles: Partial<{
    textAlign: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

export type ContentDefaultsButton = Partial<{
  html: string
  label: string
  href: string
  width: string
  styles: Partial<{
    backgroundColor: string
    borderBottom: string
    borderLeft: string
    borderRadius: string
    borderRight: string
    borderTop: string
    color: string
    direction: string
    fontFamily: string
    fontSize: string
    fontWeight: string
    letterSpacing: string
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
  hoverStyles: Partial<{
    backgroundColor: string
    color: string
    borderRight: string
    borderLeft: string
    borderBottom: string
    borderTop: string
  }>
  mobileStyles: Partial<{
    textAlign: string
    fontSize: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
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
  mobileStyles: Partial<{
    align: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

export type ContentDefaultsTable = Partial<{
    styles: {
      color: string,
      fontFamily: string,
      fontWeight: string,
      fontSize: string,
      textAlign: string,
      lineHeight: string,
      letterSpacing: string,
      direction: string,
      linkColor: string,
      backgroundColor: string,
      border: string,
      alternateRowBackgroundColor: string,
      headersFontSize: string,
      headersFontWeight: string,
      headersTextAlign: string,
      headersBackgroundColor: string,
      headersColor: string,
    },
    blockOptions: {
      paddingBottom: string,
      paddingLeft: string,
      paddingRight: string,
      paddingTop: string,
    }
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
  mobileStyles: Partial<{
    textAlign: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
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
  mobileStyles: Partial<{
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
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
  mobileStyles: Partial<{
    fontSize: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

export type ContentDefaultsIcons = Partial<{
  items: {
    image: string
    textPosition: string
    text: string
    alt: string
    title: string
    href: string
    target: string
    width: string
    height: string
  }[]
  styles: Partial<{
    color: string
    fontSize: string
    fontFamily: string
    fontWeight: string
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
  mobileStyles: Partial<{
    textAlign: string
    fontSize: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
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
  mobileStyles: Partial<{
    textAlign: string
    fontSize: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
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
  mobileStyles: Partial<{
    textAlign: string
    fontSize: string
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
  mobileStyles: Partial<{
    textAlign: string
    fontSize: string
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>

export type ContentDefaultsCarousel = Partial<{
  blockOptions: {
    paddingBottom: string,
    paddingLeft: string,
    paddingRight: string,
    paddingTop: string,
    hideContentOnMobile: boolean
  }
  mobileStyles: Partial<{
    paddingTop: string
    paddingRight: string
    paddingBottom: string
    paddingLeft: string
  }>
}>


export type ContentDefaultsRow = Partial<{
  styles: Partial<{
    backgroundColor: string
    columnsBackgroundColor: string
    columnsBorderRadius: string
    columnsPadding: string
    columnsPaddingBottom: string
    columnsPaddingLeft: string
    columnsPaddingRight: string
    columnsPaddingTop: string
    columnsReverseStackOnMobile: boolean
    columnsSpacing: string
    columnsStackOnMobile: boolean
    contentAreaBackgroundColor: string
    padding: string
    paddingBottom: string
    paddingLeft: string
    paddingRight: string
    paddingTop: string
    verticalAlign: string
  }>
  mobileStyles: Partial<{
    padding: string
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
  button: ContentDefaultsButton
  carousel: ContentDefaultsCarousel
  divider: ContentDefaultsDivider
  dynamic: ContentDefaultsDynamic
  form: ContentDefaultsForm
  general: ContentDefaultsGeneral
  icons: ContentDefaultsIcons
  image: ContentDefaultsImage
  list: ContentDefaultsList
  menu: ContentDefaultsMenu
  paragraph: ContentDefaultsParagraph
  row: ContentDefaultsRow
  social: ContentDefaultsSocial
  spacer: ContentDefaultsSpacer
  table: ContentDefaultsTable
  text: ContentDefaultsText
  title: ContentDefaultsTitle
  video: ContentDefaultsVideo
}>

export enum TokenStatus {
  OK = 'ok',
  REFRESHING= 'refreshing'
}

export interface IToken {
  access_token: string
  v2: boolean
}

export type IAddOnResponseButton = {
  type: SimpleButton['type']
  value: SimpleButton
}
export type IAddOnResponseDivider = {
  type: SimpleDivider['type']
  value: SimpleDivider
}
export type IAddOnResponseHTML = {
  type: SimpleHtml['type']
  value: SimpleHtml
}
export type IAddOnResponseIcons = {
  type: SimpleIcons['type']
  value: SimpleIcons
}
export type IAddOnResponseImage = {
  type: SimpleImage['type']
  value: SimpleImage
}
export type IAddOnResponseList = {
  type: SimpleList['type']
  value: SimpleList
}
export type IAddOnResponseMenu = {
  type: SimpleMenu['type']
  value: SimpleMenu
}
export type IAddOnResponseParagraph = {
  type: SimpleParagraph['type']
  value: SimpleParagraph
}
export type IAddOnResponseTitle = {
  type: SimpleTitle['type']
  value: SimpleTitle
}

type SingleModuleAddonResponse =
  | IAddOnResponseButton
  | IAddOnResponseDivider
  | IAddOnResponseHTML
  | IAddOnResponseIcons
  | IAddOnResponseImage
  | IAddOnResponseList
  | IAddOnResponseMenu
  | IAddOnResponseParagraph
  | IAddOnResponseTitle

type IAddOnResponse =
  | SingleModuleAddonResponse
  | IAddOnResponseMixed
  | IAddOnResponseRowAddOn
  | IAddOnResponseFileManager

export type IAddOnResponseMixed = {
  type: 'mixed',
  value: SingleModuleAddonResponse[]
}
export type IAddOnResponseRowAddOn = {
  type: 'rowAddon',
  value: SimpleRow
}

export type IAddOnResponseFileManager = {
  type: 'filemanager'
  value: FileManagerAddon
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
    handler: BeePluginContentDialogHandler<IAddOnResponse, undefined, {
      contentDialogId: string
      hasOpenOnDrop: boolean
      value: Record<string, unknown>
    }>
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
    handler: BeePluginContentDialogHandler<IPluginForm, undefined, IPluginForm['structure']>
  },
  filePicker?: {
    label?: string
    handler: BeePluginContentDialogHandler<IPluginFilePicker>
  },
  getMention?: {
    label?: string
    handler: BeePluginContentDialogHandler<IInvitedMention, undefined, string>
  }
  onDeleteRow?: {
    label?: string
    handler: BeePluginContentDialogHandler<IRefreshSavedRow, undefined, IPluginEditDeleteRow>
  }
  onEditRow?: {
    label?: string
    handler: BeePluginContentDialogHandler<IRefreshSavedRow, undefined, IPluginEditDeleteRow>
  },
  externalContentURLs?: {
    label?: string
    handler: BeePluginContentDialogHandler<CustomRowConfiguration>
  },
  mergeContents?: {
    label?: string
    handler: BeePluginContentDialogHandler<MergeContentsHandler>
  }
  rowDisplayConditions?: {
    label?: string
    handler: BeePluginContentDialogHandler<RowDisplayConditionsHandler>
  },
  upsell?: {
    label?: string
    handler: BeePluginContentDialogHandler<IUpsellConfiguration, undefined, { handle: OnInfoDetailHandle }>
  }
  customAttribute?: {
    label?: string
    handler: BeePluginContentDialogHandler<CustomAttribute>
  }
}

export type BeePluginFont = {
  name: string
  fontFamily: string
  url?: string
  fontWeight?: Record<number, string>
}

export type BeePluginEditorFonts = {
  showDefaultFonts: boolean
  customFonts: BeePluginFont[]
}

export interface FormField {
  type: string;
  label: string;
  canBeRemovedFromLayout: boolean;
  removeFromLayout?: boolean;
  attributes: {
    name: string;
    required?: boolean;
    value?: string;
  };
  options?: {
    label: string;
    value: string;
    type: string;
  }[];
}

export interface DefaultForm {
  structure: FormStructure
}

export interface FormStructure {
  fields: {
    [key: string]: FormField;
  };
  layout: string[][];
  attributes: {
    'accept-charset': string;
    action: string;
    autocomplete: string;
    enctype: string;
    method: string;
    novalidate: boolean;
    target: string;
  };
  title: string;
  description: string;
}

export interface AddOnPartner {
  label?: string
  ctaLabel?: string
  placeholder?: string
}

type BaseDevicePresetSizes = {
  computer?: { width: number; height: number }
  tablet?: { width: number; height: number }
  phone?: { width: number; height: number }
}

export type DevicePresetSizes = RequireAtLeastOne<BaseDevicePresetSizes>

export interface AddOnOpenAI {
  id: 'ai-integration'
  settings: {
    tokensAvailable?: number
    tokensUsed?: number
    tokenLabel?: string
    isPromptDisabled?: boolean
    isSuggestionsDisabled?: boolean
    isUpsellEnabled?: boolean
    upsellTrigger?: number
    metadataGeneration?: boolean
  }
}

export interface AddOnAltTextAI {
  id: 'ai-alt-text'
  settings: {
    imagesAvailable?: number
    imagesUsed?: number
    isIconDisabled?: boolean
    isUpsellEnabled?: boolean
    upsellTrigger?: number
  }
}

export interface AddOnImageGenerationAI {
  id: 'ai-image-generation'
  settings: {
    imagesAvailable?: number
    imagesUsed?: number
    isGenerationDisabled?: boolean
    upsellTrigger?: number
    isUpsellEnabled?: boolean
    folderName?: string
  }
}

export interface AddOnFileManager {
  id: string
  ctaLabel?: string
  ctaDataQA?: string
  ctaColor?: string
  settings: {
    autoInsert?: true
    changeDirectory?: true
  },
}

interface BaseAddon {
  id: string,
  editable?: boolean
  enabled?: boolean
  openOnDrop?: boolean
}

export type AddOn = BaseAddon | AddOnPartner | AddOnOpenAI | AddOnAltTextAI | AddOnImageGenerationAI | AddOnFileManager

export interface Translations {
  [key: string]: string | Translations;
}

export interface TextEditor {
  onChangeDelay: number
}

export type ViewTypes = 'fileManager' | 'editor' | 'preview' | 'imageEditor'

export const PREVIEW_CONTROL = {
  DARK_MODE: 'dark',
  AMP: 'amp',
  LANGUAGE: 'language',
  DEVICE: 'device',
  SIZE: 'size',
  DISPLAY_CONDITIONS: 'DISPLAY_CONDITIONS',
} as const

export type Size = {
  width: number
  height: number
}

export type ValueType<T extends ValueOf<typeof PREVIEW_CONTROL>> =
  T extends 'dark' ? string :
  T extends 'amp' ? string :
  T extends 'language' ? TemplateLanguage :
  T extends 'device' ? string :
  T extends 'size' ? Size :
  unknown


export type onChangePreviewControlArgs<T extends ValueOf<typeof PREVIEW_CONTROL>> = {
  type: T
  value: ValueType<T>
}

export type onChangePreviewControl = <T extends ValueOf<typeof PREVIEW_CONTROL>>(
  args: onChangePreviewControlArgs<T>
) => void

export type DebugFeatures = {
  inspectJson: boolean
  showTranslationKeys: boolean
}
export type DebugConfig = {
  all?: boolean
} & Partial<DebugFeatures>

export interface IBeeConfig {
  container: string
  uid?: string
  trackChanges?: boolean
  preventClose?: boolean
  debug?: DebugConfig
  enable_display_conditions?: boolean
  language?: string
  templateLanguage?: TemplateLanguage
  templateLanguages?: TemplateLanguage[]
  templateLanguageAutoTranslation?: boolean
  mergeTags?: IMergeTag[]
  mergeContents?: IMergeContent[]
  specialLinks?: ISpecialLink[]
  username?: string
  userColor?: string
  userHandle?: string
  commenting?: boolean
  customAssetsOptions?: Record<string, unknown>
  advancedPermissions?: BeePluginAdvancedPermission
  defaultForm?: DefaultForm
  loadingSpinnerTheme?: string
  loadingSpinnerDisableOnDialog?: boolean;
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
  addOns?: AddOn[]
  translations?: Translations
  textEditor?: TextEditor
  customAttributes?: CustomAttributes
  sidebarPosition?: 'left' | 'right' | 'none'
  rowDisplayConditions?: Array<IPluginDisplayCondition>
  enabledAdvancedPreview?: boolean
  titleMaxLevel?: TitleLevel
  onTemplateLanguageChange?: (lang: { label: string, value: string, isMain: boolean }) => void
  onLoad?: (json: IEntityJson) => void
  onPreview?: (opened: boolean) => void
  onTogglePreview?: (toggled: boolean) => void
  onSessionStarted?: (sessionInfo: IPluginSessionInfo) => void
  onSessionChange?: (sessionChangeInfo: IPluginSessionChangeInfo) => void
  onReady?: (args: Record<string, unknown>) => void
  onSave?: (pageJson: string, pageHtml: string, ampHtml: string | null, templateVersion: number, language: string | null) => void
  onSaveRow?: (rowJson: string, rowHtml: string, pageJson: string) => void
  onError?: (error: BeePluginError) => void
  onAutoSave?: (pageJson: string) => void
  onSaveAsTemplate?: (pageJson: string, templateVersion: number) => void
  onStart?: () => void
  onSend?: (pageHtml: string) => void
  onChange?: (json: string, detail: BeePluginMessageEditDetail, version: number) => void
  onRemoteChange?: (json: string, detail: BeePluginMessageEditDetail, version: number) => void
  onWarning?: (error: BeePluginError) => void
  onComment?: (commentPayload: BeePluginOnCommentPayload, json: string) => void
  onInfo?: (info: BeePluginInfo) => void
  onLoadWorkspace?: (worspaceType: LoadWorkspaceOptions) => void
  onViewChange?: (view: ViewTypes) => void
  onPreviewChange?: (preview: onChangePreviewControlArgs<ValueOf<typeof PREVIEW_CONTROL>>) => void
  commentingFiltersOff?: boolean
  logLevel?: number
  titleDefaultConfig?: {
    bold: boolean
  }
  forceSanitizeHTML?: boolean
  mcpEditorClient?: {
    enabled: boolean
    sessionId: string
  }
  metadata?: {
    languages: MetadataLanguage[]
  }
}

export interface IBeeConfigFileManager {
  container: string
  uid?: string
  customCss?: string
  addOns: AddOn[];
  contentDialog?: BeeContentDialogs;
  customAssetsOptions: Record<string, unknown>
  onFilePickerInsert?: (data: unknown) => void
  onFilePickerCancel?: () => void
}

export type { KebabCSSProperties }

export type SaveResponse = {
  data: {
    json: string
    html: string
    htmlAmp: string | null
    version: number
    language: string | null
  }
}

export type SaveAsTemplateResponse = {
  data: {
    json: string
    version: number
  }
}
