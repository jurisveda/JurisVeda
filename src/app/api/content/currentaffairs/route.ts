import { authOptions } from "@/actions/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(req:NextRequest){
    try{
        const user = getServerSession(authOptions)
        if(!user){
            return NextResponse.json({error:"Unauthorized"},{status: 401})
        }

        const docs = await prisma.currentAffair.findMany({
            select:{
                title: true,
                id: true
            }
        })
        // console.log(docs)
        return NextResponse.json({content:docs},{status:200}) 

    }catch(err){
        return NextResponse.json({error:"Some error occured while fetching currentaffairs"},{status:500})
    }
}