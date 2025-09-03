import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(){
    try{
        const res = await prisma.message.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        });
        return NextResponse.json({data:res},{status:200})
    }catch(error){
        return NextResponse.json({error:"Some error occurred while getting messages"},{status: 500})
    }
}