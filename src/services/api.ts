import { IFetchTemplate, IFetchTokenPayload } from '../types/api'
import axios from './axios'

export const fetchToken = ({ authUrl, clientId, clientSecret, uid }:IFetchTokenPayload) => {
  const payload = {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    uid
  }
  return axios.post(authUrl, payload)
}

export const fetchTemplate = ({ templateUrl }: IFetchTemplate) => axios.get(templateUrl)
