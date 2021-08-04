import { IUrlConfig } from "../types/bee"

export interface BeePluginProps {
  token: string
  urlConfig?: IUrlConfig
}

export const createBeePlugin = ({ token, urlConfig }: BeePluginProps) => {
  const pluginContainer = document.createElement('div')
  pluginContainer.setAttribute("id", "bee-plugin-container");
  return pluginContainer
}