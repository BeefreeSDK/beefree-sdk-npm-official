import { IFetchTokenPayload } from '../types/api'

export const fetchToken = async ({ authUrl, clientId, clientSecret, uid }: IFetchTokenPayload) => {
  const payload = {
    grant_type: 'password',
    client_id: clientId,
    client_secret: clientSecret,
    uid,
  }

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorResponse = await response.json()
    throw new Error(errorResponse?.message)
  }

  return Promise.resolve(response)
}
