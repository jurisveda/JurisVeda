import { uploadToImageKit } from "@/actions/uploadUtil";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import ImageKit from "imagekit";
import { authOptions } from "@/actions/authOptions";
import { setCurrentaffair } from "@/actions/db";

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string
})

export async function POST(request:NextRequest){
    try {

        const user = await getServerSession(authOptions)


        const formData = await request.formData()
        const thumbnail = formData.get("thumbnail") as File
        const title = formData.get("title") as string
        const summary = formData.get("summary") as string
        const content = formData.get("content") as string

        // if(!thumbnail.type.startsWith("image/")){
        //     return NextResponse.json({error: "Only images are allowed"} , {status : 401})
        // }
        // const createdBy = formData.get("thumbnail")
        // const updatedBy = formData.get("thumbnail")
        // console.log(thumbnail,title,content)

        const buffer = await thumbnail.arrayBuffer()
        const fileBuffer = Buffer.from(buffer)

        const originalFileName = thumbnail.name
        const fileExtension = originalFileName.split(".").pop() || ""

        const uniqueFileName = `${uuidv4()}.${fileExtension}`

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName:uniqueFileName,
            folder: "/currentaffairs",
            useUniqueFileName: false
        })

        // const imageKitURL = await uploadToImageKit(thumbnail,uniqueFileName)
        console.log((user as any).id)
        await setCurrentaffair({
            content,
            title,
            summary,
            url: uploadResponse.url,
            fieldId: uploadResponse.fileId,
            createdBy: (user as any).id,
            updatedBy: (user as any).id
        })
        
        return NextResponse.json({success:"Uploaded"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Some error occured"},{status:500})
    }
}