import { authOptions } from "@/actions/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string
})

export async function DELETE(request:NextRequest, props : { params: Promise<{ id: string}>}){
    try{
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }

        const {id} = await props.params

        const record = await prisma.lawNote.findUnique({
            where:{id},
            select:{thumbnailFieldId:true}
        })

        if(!record){
            return NextResponse.json({success:"Record not found"},{status: 400})
        }

        if(record.thumbnailFieldId){
            await imagekit.deleteFile(record.thumbnailFieldId)
        }
        
        await prisma.lawNote.delete({
            where:{id}
        })

        return NextResponse.json({success:"Deleted suceessfully"},{status: 200})
    }catch(error){
        return NextResponse.json({error:"Some error occurred while deleting note"},{status: 500})
    }
}