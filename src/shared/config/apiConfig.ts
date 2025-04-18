import { Configuration } from '#/generate/configuration'
import { CLIENT_BASE_PATH, SERVER_BASE_PATH } from '../lib/constants'

export function getApiConfig(): Configuration {
  const isClient = typeof window !== 'undefined'
  return new Configuration({
    basePath: isClient
      ? CLIENT_BASE_PATH // CSR: Next API proxy
      : SERVER_BASE_PATH, // SSR: Spring Backend
  })
}
