

namespace NodeJS{
  interface ProcessEnv{
    MONGODB_URI:string
    AUTH_SECRET:string
    REFRESH_TOKEN_TTL:number
    REFRESH_TOKEN_SECRET:string
    ACCESS_TOKEN_TTL:Date
  }
}