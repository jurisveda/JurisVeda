import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
// fullName,email,phone,message
export async function POST(req:NextRequest){
    try {
        const {fullName , email , phone , message} = await req.json()
    
        await prisma.message.create({
            data:{
                fullName,
                email,
                phone,
                message
            }
        })
        return NextResponse.json({success:true},{status:200})
    } catch (error) {
        return NextResponse.json({error:true},{status: 500})
    }
}