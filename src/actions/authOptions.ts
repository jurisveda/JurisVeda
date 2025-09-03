import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAdmin } from "./db";
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

const ADMIN_KEY = process.env.ADMIN_KEY

export const authOptions : AuthOptions = {
    providers : [
        CredentialsProvider({
            name : "Credential",
            credentials : {
                username: { label: "Username", type: "text", placeholder: "Username" },
                phone: { label: "Phone Number", type: "text", placeholder: "Phone Number" },
                password: { label: "Password", type: "password" , placeholder:"Password"},
                key: { label: "Key", type: "password" , placeholder:"Admin Key"}
            },
            async authorize(credentials : any){
                const username = credentials.username
                const phone = credentials.phone
                const password = credentials.password
                const key = credentials.key
                const response = await prisma.admin.findFirst({
                    where:{
                        name:username,
                        phone
                    }
                })


                if(!response){
                    if(key===ADMIN_KEY){
                        const hashedPass = await bcrypt.hash(password,10)
                        const admin = await createAdmin({username,phone,hashedPass})
                        return{
                            id: admin.id,
                            name: admin.name
                        }
                    }
                    // const hashedPass = await bcrypt.hash(password,10)
                    // const admin = await createAdmin({username , phone , hashedPass})
                    // console.log(admin)

                    return null;
                }
                const validate = await bcrypt.compare(password , response.password)
                if(validate){
                    console.log(validate)
                    console.log(response)
                    return {
                        id : response.id,
                        name : username,
                    }
                }
                return null
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    // session: {
    //     maxAge
    // },
    callbacks : {
        async session({session,token}:any){
            session.id = token.sub
            return session
        }
    }
}