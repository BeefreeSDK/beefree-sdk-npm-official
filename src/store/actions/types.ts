import { IAuthActions } from "./auth";
import * as A from './actions'

export type ActionPhase<S, P> = (state: S, payload: P) => Partial<S> | Promise<Partial<S>>

export interface IAction<S, P = null> {
  phases: ActionPhase<S, P> | ActionPhase<S, P>[]
}

export interface IStoreAction<P = unknown> {
  type: keyof typeof A
  payload?: P
}

export type StoreActions =
IAuthActions