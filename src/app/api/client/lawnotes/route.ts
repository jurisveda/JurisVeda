import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(req:NextRequest){
    try{
        const docs = await prisma.lawNote.findMany({
            select:{
                title: true,
                id: true,
                summary:true,
                thumbnail: true
            }
        })
        // console.log(docs)
        return NextResponse.json({content:docs},{status:200}) 

    }catch(err){
        return NextResponse.json({error:"Some error occured while fetching lawnotes"},{status:500})
    }
}