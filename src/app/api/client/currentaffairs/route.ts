import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(req:NextRequest){
    try{
        const docs = await prisma.currentAffair.findMany({
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
        return NextResponse.json({error:"Some error occured while fetching currentaffairs"},{status:500})
    }
}