import { authOptions } from "@/actions/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(request:NextRequest){
    try{
        const session = getServerSession(authOptions)
        if(!session){
             return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        const lawNotes = await prisma.lawNote.count()
        const caseLaws = await prisma.caseLaw.count()
        const currentAffairs = await prisma.currentAffair.count()

        const counts = {lawNotes,caseLaws,currentAffairs}

        return NextResponse.json({data:counts},{status:200})
    }catch(error){
        return NextResponse.json({error:"Some error occurred while fetching counts"},{status:500})
    }
}