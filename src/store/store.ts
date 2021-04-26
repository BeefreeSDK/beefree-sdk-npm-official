import { IStoreState } from "./types"
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'
import { Stores as StoreNames } from './config'
import { StoreActions } from "./actions/types"

let state: Readonly<IStoreState>
let actions: StoreActions
const stores = new Map<string, keyof typeof StoreNames>()

export const initStore = (
  storeActions: Partial<StoreActions>, storeName: keyof typeof StoreNames,
  initialState: Partial<IStoreState>,
) => {
  actions = { ...actions, ...storeActions }

  pipe(
    Object.keys(storeActions),
    A.map(storeActionName => stores.set(storeActionName, storeName)),
  )

  if (initialState) state = { ...state, ...initialState }
}
