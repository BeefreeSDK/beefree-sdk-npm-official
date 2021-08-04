import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import beeActions from './Constants'

const eitherHasConfig = (config: any) => !config ? E.left(new Error('Config is missing')) : E.right(config)
const eitherHasSessionId = (sessionId: string) => !sessionId ? E.left(new Error('SessionId is missing')) : E.right(sessionId)
const eitherHasToken = (token: string) => !token ? E.left(new Error('Token NOT declared, call getToken or pass token on new BEE')) : E.right(token)
const eitherHasTemplate = (template: Record<string, unknown>) => !template ? E.left(new Error('template is missing')) : E.right(template)

export const eitherCheckJoinParams = (config: any, sessionId: string, token: string) => pipe(
    eitherHasSessionId(sessionId),
    E.chain(() => eitherHasConfig(config)),
    E.chain(() => eitherHasToken(token))
)

export const eitherCheckStartParams = (config: any, template: Record<string, unknown>, token: string) => pipe(
    eitherHasConfig(config),
    E.chain(() => eitherHasToken(token)),
    E.chain(() => eitherHasTemplate(template))
)

const eitherBeeInstanceExist = (instance: any) => !instance ? E.left(new Error('Bee is not started')) : E.right(instance)
const eitherIsValidAction = (action: string) => !beeActions[action] ? E.left(new Error(`${action} is not a correct method`)) : E.right(action)

export const eitherCanExecuteAction = (instance: any, action: string) => pipe(
    eitherBeeInstanceExist(instance),
    E.chain(() => eitherIsValidAction(action))
)