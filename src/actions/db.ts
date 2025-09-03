"use server"
import { prisma } from '@/lib/prisma'

interface create{
    username : string,
    phone : string,
    hashedPass : string
}

interface contentCreation{
  content:string,
  title:string,
  summary:string,
  url:string,
  fieldId:string,
  createdBy:string,
  updatedBy:string
}


// creating contents


export async function setLawnotes({ content , title , summary , url , fieldId , createdBy , updatedBy}:contentCreation){
  try{
    await prisma.lawNote.create({
      data:{
        title,
        content,
        summary,
        thumbnail:url,
        thumbnailFieldId:fieldId,
        createdBy,
        updatedBy
      }
    })
  }catch(error){
    console.error('Error uploading lawnotes content to db: ', error)
    throw new Error('Failed to upload caselaw to db')
  }
}
export async function setCaselaws({content , title , summary , url , fieldId , createdBy , updatedBy}:contentCreation){
  try{
    await prisma.caseLaw.create({
      data:{
        title,
        content,
        summary,
        thumbnail:url,
        thumbnailFieldId:fieldId,
        createdBy,
        updatedBy
      }
    })
  }catch(error){
    console.error('Error uploading caselaws content to db: ', error)
    throw new Error('Failed to upload caselaw to db')
  }
}
export async function setCurrentaffair({content , title , summary , url , fieldId , createdBy , updatedBy}:contentCreation){
  try{
    await prisma.currentAffair.create({
      data:{
        title,
        content,
        summary,
        thumbnail:url,
        thumbnailFieldId:fieldId,
        createdBy,
        updatedBy
      }
    })
  }catch(error){
    console.error('Error uploading currentaffair content to db:', error)
    throw new Error('Failed to upload currentaffair content to db')
  }
}

export async function createAdmin({username , phone , hashedPass} : create){
    try {
        const res = await prisma.admin.create({
            data: {
                name : username,
                phone,
                password : hashedPass
            }
        })
        return res;
    } catch (error) {
        console.error('Error while creating admin', error)
        throw new Error('Failed to create admin')
    }
}
