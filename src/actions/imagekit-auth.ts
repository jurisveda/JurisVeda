'use server'

import { getUploadAuthParams } from "@imagekit/next/server"

export async function getImageKitAuthParams() {
    try {
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
        const publicKey = process.env.IMAGEKIT_PUBLIC_KEY

        if (!privateKey || !publicKey) {
            console.error('Missing ImageKit environment variables');
            throw new Error('Server configuration error')
        }

        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        })

        console.log({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
        
        return { 
            token, 
            expire, 
            signature, 
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            success: true
        }
    } catch (error) {
        console.error('Error generating auth params:', error)
        return({error ,success:false})
        throw new Error('Failed to generate auth parameters')
    }
}
