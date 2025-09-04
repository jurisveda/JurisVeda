"use client"
import FAQSection from "@/components/client/FaqCard"
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
    const [note , setNote] = useState<noteType|null>(null)
    // const [error , setError] = useState<string|null>(null)
    const [loading , setLoading] = useState<boolean>(false)
    
    useEffect(()=>{
        async function getNote(){
            try {
                setLoading(true)
                const res = await fetch(`/api/client/caselaws/get/${id}`)
                const resData = await res.json()
                if(!res.ok){
                    // setError(resData.error)
                    toast.error("Can't fetch notes right now !!")
                    router.push("/caselaws")
                    return
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
            <div className="min-h-screen max-w-5xl w-full bg-white dark:bg-neutral-900 dark:text-white flex items-center justify-center mx-auto">
                Loading Content...
            </div>
        )
    }
    
    return(
        <div className="max-w-5xl w-full bg-white dark:bg-neutral-900 text-black flex flex-col flex-2/12 pt-10 mx-auto">
            <div className="text-center w-full">
                <div className="relative mb-8">
                    <img 
                        src={note?.thumbnail} 
                        alt="Hero image" 
                        className="w-full h-64 object-cover rounded-b-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black rounded-b-lg"></div>
                </div>
                
                <h1 className="text-lg md:text-3xl dark:text-white font-bold mb-6 px-5">
                    {note?.title}
                </h1>
                
                {note?.content && <p className="flex flex-col text-justify prose max-w-none prose-sm prose-headings:my-1 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 md:px-10 px-5 leading-relaxed" dangerouslySetInnerHTML={{__html: note?.content}}></p>}
            </div>
            {(note?.questions && note?.answers) && <FAQSection questions={note.questions} answers={note.answers} length={note.questions.length}/>}
            {/* <FAQSection/> */}
        </div>
    )
}