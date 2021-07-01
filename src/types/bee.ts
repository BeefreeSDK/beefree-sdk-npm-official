export interface IBeeLoader {
  beePluginUrl: string
  authUrl: string
}

export interface IUrlConfig {
  authUrl: string
  beePluginUrl: string
}

export interface IBee {
  token: string
  urlConfig?: IUrlConfig
  onGetTokenCompleted: (token: string) => void
}