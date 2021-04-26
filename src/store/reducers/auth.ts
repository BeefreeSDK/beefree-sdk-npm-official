import { IAuthStoreState } from "../types";
import * as O from 'fp-ts/lib/Option'
import { IAuthActions } from "../actions/auth";
import { initStore } from '../store'
import { Stores } from '../config'
import {
  FETCH_BEE_TOKEN
} from '../actions/actions'
import axios, { AxiosResponse } from "axios";


export const defaultState: IAuthStoreState = { 
  maybeToken: O.none,
  isFetchingToken: false
}

const configureStore = (): void => {
  const actions: IAuthActions = {
    [FETCH_BEE_TOKEN]: {
      phases: [
        (): Partial<IAuthStoreState> => ({
          isFetchingToken: true
        }),

        async (state, { authUrl }): Promise<Partial<IAuthStoreState>> => {
          try {
            const response: AxiosResponse = await axios.get(authUrl, { withCredentials: false })

            const { token } = response.data

            return {
              ...state,
              isFetchingToken: false,
              maybeToken: O.some(token)             
            }
          } catch ({ response: { status } }) {

            return {
              ...state,
              isFetchingToken: false
            }
          }
        },        
      ]
    }
  }
  initStore(actions, Stores.auth, { auth: defaultState })
}


export default configureStore