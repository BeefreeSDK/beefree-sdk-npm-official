
import { IAuthStoreState } from '../types'
import { FETCH_BEE_TOKEN } from './actions'
import { IAction, IStoreAction } from './types'

export type FetchBeeTokenPayload = {
  authUrl: string
}

export interface IAuthActions {
  [FETCH_BEE_TOKEN]: IAction<IAuthStoreState, FetchBeeTokenPayload>
}

export const fetchBeeToken = (payload: FetchBeeTokenPayload):
  IStoreAction<FetchBeeTokenPayload> => ({ type: FETCH_BEE_TOKEN, payload })