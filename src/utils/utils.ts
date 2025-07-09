import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import {IBeeConfig, IBeeConfigFileManager, IToken} from '../types/bee'
import beeActions from './Constants'

const eitherHasConfig = (config: IBeeConfig | IBeeConfigFileManager) => !config ? E.left(new Error('Config is missing')) : E.right(config)
const eitherHasSessionId = (sessionId: string) => !sessionId ? E.left(new Error('SessionId is missing')) : E.right(sessionId)
const eitherHasToken = (token: IToken) => !token || !token.access_token ? E.left(new Error('Malformed or undefined token, call UNSAFE_getToken() or pass your token on new BEE')) : E.right(token)

export const eitherCheckJoinParams = (config: IBeeConfig, sessionId: string, token: IToken) => pipe(
    eitherHasSessionId(sessionId),
    E.chain(() => eitherHasConfig(config)),
    E.chain(() => eitherHasToken(token))
)

export const eitherCheckStartParams = (config: IBeeConfig | IBeeConfigFileManager, token: IToken) => pipe(
    eitherHasConfig(config),
    E.chain(() => eitherHasToken(token)),
)

const eitherBeeInstanceExist = (instance: unknown) => !instance ? E.left(new Error('Bee is not started')) : E.right(instance)
const eitherIsValidAction = (action: string) => !Object.keys(beeActions).some(x => beeActions[x] === action ) ? E.left(new Error(`${action} is not a correct method`)) : E.right(action)

export const eitherCanExecuteAction = (instance: unknown, action: string) => pipe(
    eitherBeeInstanceExist(instance),
    E.chain(() => eitherIsValidAction(action))
)
