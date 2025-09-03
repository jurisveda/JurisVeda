import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function GET(request:NextRequest,props:{params : Promise<{id:string}>}){
    try{
        const {id} = await props.params
        if(!id){
            return NextResponse.json({error:"Please provide Id"},{status: 400})
        }

        const doc = await prisma.lawNote.findFirst({
            where:{
                id
            }
        })
        const faq = await prisma.lawNoteFaq.findFirst({
            where:{
                noteId: id
            }
        })

        if(doc){
            const {title,content,thumbnail} = doc
            const returnData = {
                title,content,thumbnail,questions:faq?.question ?? null,answers:faq?.answer ?? null
            }
            return NextResponse.json({data:returnData},{status:200})
        }
        return NextResponse.json({error:"No record found by this id"},{status: 404})

    }catch(error){
        return NextResponse.json({error:"Error occurred while fetching doc"},{status:500})
    }
}