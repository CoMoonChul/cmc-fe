import { Configuration } from '#/generate/configuration'
import { USER } from '#/generate'

const api = new USER.JoinControllerApi(new Configuration({ basePath: '/api' }))

export async function login(userId: string) {
  const response = await api.checkUserId(userId)
  return response
}
