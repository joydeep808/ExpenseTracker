"use server"
import fs from 'fs'
import path from 'path'
export async function upLoadVideo(formData:any){
  const file:{
    name:string
  } = formData.get("file")
 
  const fileContent = Buffer.from(formData.get("fileContent") , "base64")

  // console.log(fileContent)
  // const fileBuffer = Buffer.from(fileContent.split(',')[1], 'base64');
  // console.log(fileBuffer)
  // const filePath = path.join("./public" , file.name)
   fs.writeFileSync(`./${file.name}` ,fileContent )

  
}