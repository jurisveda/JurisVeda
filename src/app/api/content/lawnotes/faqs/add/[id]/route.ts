import { authOptions } from "@/actions/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export async function POST(req:NextRequest,props:{params:Promise<{id:string}>}){
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }

        const {id} = await props.params;
        if(!id){
            return NextResponse.json({error:"Invalid Id"},{status:400})
        }

        const body = await req.json()
        const question = body.questions
        const answer = body.answers

        if(!question || !answer){
            return NextResponse.json({error:"Missing data"},{status:400})
        }

        await prisma.lawNoteFaq.create({
            data:{
                question,
                answer,
                noteId: id
            }
        })

        return NextResponse.json({success: true},{status: 200})
        
    } catch (error) {
        return NextResponse.json({error:"Server Error"},{status: 500})
    }
}