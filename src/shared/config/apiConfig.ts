import { Configuration } from '#/generate/configuration'
import { CLIENT_BASE_PATH, SERVER_BASE_PATH } from '../lib/constants'

// export function getApiConfig(): Configuration {
//   const isClient = typeof window !== 'undefined'
//   return new Configuration({
//     basePath: isClient
//       ? CLIENT_BASE_PATH // CSR: Next API proxy
//       : SERVER_BASE_PATH, // SSR: Spring Backend
//   })
// }
export function getApiConfig(): Configuration {
  const isClient = typeof window !== 'undefined'
  const basePath = isClient ? CLIENT_BASE_PATH : SERVER_BASE_PATH

  if (isClient) {
    console.log(`[CLIENT] basePath: ${basePath}`)
  } else {
    console.log(`[SERVER] basePath: ${basePath}`)
  }

  return new Configuration({ basePath })
}
