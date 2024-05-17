

namespace NodeJS{
  interface ProcessEnv{
    MONGODB_URI:string
    AUTH_SECRET:string
    REFRESH_TOKEN_TTL:number
    REFRESH_TOKEN_SECRET:string
    ACCESS_TOKEN_TTL:Date
    REDIS_FULL_URL:string
    REDIS_USERNAME:string
    REDIS_USER:string
    REDIS_PORT:number
    REDIS_PASSWORD:string
    EMAIL:string
    EMAIL_PASSWORD:string
    EMAIL_PORT:number
    EMAIL_NAME:string
  }
}