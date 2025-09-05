"use client"
import FAQSection from "@/components/client/FaqCard"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface noteType{
    title:string,
    thumbnail:string,
    content:string,
    questions?:string[] | null,
    answers?:string[] | null
}

export default function Show(){
    const router = useRouter()
    const {id} = useParams()
    const [note , setNote] = useState<noteType>({title:"",thumbnail:"",content:""})
    // const [error , setError] = useState<string|null>(null)
    const [loading , setLoading] = useState(true)
    
    useEffect(()=>{
        async function getNote(){
            try {
                const res = await fetch(`/api/client/caselaws/get/${id}`)
                const resData = await res.json()
                if(!res.ok){
                    throw new Error()
                }
                setNote(resData.data)
                // console.log(resData.data)
            } catch (error: any) {
                toast.error("Some error occurred")
                router.push("/caselaws")
            } finally{
                setLoading(false)
            }
        }
        getNote()
    },[id])

    if(loading){
        return(
            <div className="min-h-screen max-w-6xl w-full bg-notes dark:text-white flex items-center justify-center mx-auto">
                Loading Content...
            </div>
        )
    }
    
    return(
        <div className="max-w-6xl w-full bg-notes text-black flex flex-col flex-2/12 pt-10 mx-auto">
            <div className="text-center w-full">
                <div className="relative mb-8 aspect-[5/2] overflow-hidden rounded-lg">
                    <Image 
                        src={`${note.thumbnail}?tr=w-1200,h-800,fo-auto`} 
                        alt="Hero image" 
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                </div>
                
                <h1 className="text-lg md:text-3xl dark:text-white font-bold mb-6 px-5">
                    {note.title}
                </h1>
                
                <p className="flex flex-col text-justify prose prose-sm sm:prose-base md:prose-lg lg:prose-xl xl:prose-2xl max-w-none prose-headings:my-1 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 leading-relaxed" 
                dangerouslySetInnerHTML={{__html: note.content}} 
                />
            </div>
            {(note.questions && note?.answers) && <FAQSection questions={note.questions} answers={note.answers} length={note.questions.length}/>}
        </div>
    )
}