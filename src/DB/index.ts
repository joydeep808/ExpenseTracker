import { getErrorMessage } from "@/Util/ExtractError"
import { connect } from "mongoose"

type Connection = {
  isConnected?:number
}

const connection:Connection= {
}

export const DBConnection =async()=>{
  if (connection.isConnected) return // if the connection is already established than it doesn't want to reconnect again 
  try {
    await connect(process.env.MONGODB_URI)
  } catch (error) {
    console.log(getErrorMessage(error)) // extract error
    process.exit(1)
  }
} 