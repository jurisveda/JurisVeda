import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function POST(req:NextRequest){
    try {
        const formdata = await req.formData();
        const fullName = formdata.get("fullName") as string|null;
        const email = formdata.get("email") as string|null;
        const phone = formdata.get("phone") as string|null;
    
        if(!fullName || !email || !phone){
            return NextResponse.json({error:"Missing fields"},{status: 400})
        }
    
        await prisma.subscribed.create({
            data:{
                fullName,
                email,
                phone
            }
        })

        return NextResponse.json({success:"Subscribed"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Failed"},{status: 500})
    }
}