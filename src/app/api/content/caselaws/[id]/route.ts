// import { useParams } from "next/navigation";
import { authOptions } from "@/actions/authOptions";
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, props : { params: Promise<{ id: string}>}){
    try {
        const user = await getServerSession(authOptions)
        if(!user){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        const {id} = await props.params
        console.log(id)
        if(id){
            const res = await prisma.caseLaw.findFirst({
                where:{
                    id
                }
            })
            if(res === null) return NextResponse.json({"error":"Invalid Id"},{status: 400})
            return NextResponse.json({"data":res},{status: 200})
        }
        return NextResponse.json({"message":"Please provide Id"} , {status:401})
    } catch (error) {
        
    }
}