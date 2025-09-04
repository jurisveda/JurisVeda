import { getUploadAuthParams } from "@imagekit/next/server"
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
        const publicKey = process.env.IMAGEKIT_PUBLIC_KEY

        if (!privateKey || !publicKey) {
            console.error('Missing ImageKit environment variables');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
        }

        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        })

        // const now = Math.floor(Date.now() / 1000);
        // const expireDate = new Date(expire * 1000);
        // const timeLeft = expire - now;
        
        // console.log('Token timing:', {
        // now: new Date(now * 1000).toLocaleString(),
        // expires: expireDate.toLocaleString(),
        // timeLeftSeconds: timeLeft,
        // isExpired: timeLeft <= 0
        // });
        
        // if (timeLeft <= 0) {
        // throw new Error('Token already expired');
        // }

        // console.log({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
        return NextResponse.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
    } catch (error) {
        console.error('Error generating auth params:', error)
        return NextResponse.json({ error: 'Failed to generate auth parameters' },{ status: 500 })
    }
}