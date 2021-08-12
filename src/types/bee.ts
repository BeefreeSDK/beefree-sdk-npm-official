export interface IBeeLoader {
  beePluginUrl: string,
  authUrl: string
}

export interface IUrlConfig {
  authUrl: string,
  beePluginUrl: string
}

export interface IBee {
  token: string,
  urlConfig?: IUrlConfig,
  onGetTokenCompleted: (token: string) => void
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

export enum LoadWorkspaceOptions {
  DEFAULT = 'default',
  MIXED = 'mixed',
  AMP_ONLY = 'amp_only',
  HTML_ONLY = 'html_only'
}
