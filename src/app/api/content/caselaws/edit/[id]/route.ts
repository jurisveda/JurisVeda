import { authOptions } from "@/actions/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import ImageKit from "imagekit";
import { prisma } from "@/lib/prisma"

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string
})

export async function PUT(req:NextRequest , props:{params:Promise<{id:string}>}){
    try {
        const session = getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        const {id} = await props.params
        if(!id){
            return NextResponse.json({error:"No Id"},{status:400})
        }
        const doc = await prisma.caseLaw.findFirst({
            where:{
                id
            }
        })

        if(!doc){
            return NextResponse.json({error:"No record found with id"},{status: 400})
        }

        const formdata = await req.formData()
        const title = formdata.get("title") as string
        const summary = formdata.get("summary") as string
        const content = formdata.get("content") as string

        if(formdata.has("thumbnail")){
            const thumbnail = formdata.get("thumbnail") as File
            if (!(thumbnail instanceof File) || thumbnail.size === 0){
                return NextResponse.json({error:"Invalid file"},{status: 400})
            }
            const fieldId = doc.thumbnailFieldId
            const buffer = await thumbnail.arrayBuffer()
            const fileBuffer = Buffer.from(buffer)

            const originalFileName = thumbnail.name
            const fileExtension = originalFileName.split(".").pop() || ""

            const uniqueFileName = `${uuidv4()}.${fileExtension}`

            const uploadResponse = await imagekit.upload({
                file: fileBuffer,
                fileName:uniqueFileName,
                folder: "/caselaws",
                useUniqueFileName: false
            })

            await prisma.caseLaw.update({
                where:{
                    id
                },
                data:{
                    title,
                    summary,
                    content,
                    thumbnail: uploadResponse.url,
                    thumbnailFieldId: uploadResponse.fileId
                }
            })

            await imagekit.deleteFile(fieldId)
        }else{
            await prisma.caseLaw.update({
                where:{
                    id
                },
                data:{
                    title,
                    summary,
                    content
                }
            })
        }
        return NextResponse.json({success:"Uploaded Successfully"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Some error occurred"},{status:500})
    }
}