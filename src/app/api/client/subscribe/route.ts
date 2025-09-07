import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:NextRequest){
    try {
        const formdata = await req.formData();
        const fullName = formdata.get("fullName") as string|null;
        const email = formdata.get("email") as string|null;
        const phone = formdata.get("phone") as string|null;
    
        if(!fullName || !email || !phone){
            return NextResponse.json({error:"Missing fields"},{status: 400})
        }
    
        const res = await prisma.subscribed.create({
            data:{
                fullName,
                email,
                phone
            },
            select:{
                id:true
            }
        })

        if(res){
            resend.contacts.create({
                email,
                firstName: fullName.split(" ")[0],
                lastName: fullName.split(" ")[1] ?? "",
                unsubscribed: false,
                audienceId: '83f96cf8-efc3-43af-aa13-8425c1c1146b',
            });
        }

        return NextResponse.json({success:"Subscribed"},{status:200})
    } catch (error) {
        return NextResponse.json({error:"Failed"},{status: 500})
    }
}