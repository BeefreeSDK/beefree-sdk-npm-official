import * as O from 'fp-ts/lib/Option'

export interface IAuthStoreState {
  maybeToken: O.Option<string>
  isFetchingToken: boolean
}

export interface IStoreState { 
  auth: IAuthStoreState
}