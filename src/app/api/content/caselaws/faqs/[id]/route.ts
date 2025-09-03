import { authOptions } from "@/actions/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export async function GET(req:NextRequest,props:{params:Promise<{id:string}>}){
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401});
        }

        const {id} = await props.params;
        if(!id){
            return NextResponse.json({error:"Invalid Id"},{status:400})
        }

        const doc = await prisma.caseLawFaq.findFirst({
            where:{
                noteId: id
            }
        })

        if(!doc){
            return NextResponse.json({data:null},{status: 200})
        }else{
            return NextResponse.json({data:{id:doc.id ,questions: doc.question , answers: doc.answer}},{status: 200})
        }
        
    } catch (error) {
        return NextResponse.json({error:"Server Error"},{status: 500})
    }
}