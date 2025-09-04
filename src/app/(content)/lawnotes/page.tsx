"use client"
import { cn } from "@/lib/utils";
import { Card } from "@/components/client/Card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface optionsType{
    id:string,
    title:string,
    summary:string,
    thumbnail:string
}

export default function LawNotes(){
    const [options , setOptions] = useState<optionsType[]|null>(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    useEffect(()=>{
        async function getNotes(){
            try {
                setLoading(true)
                const res = await fetch("/api/client/lawnotes")
                if(!res.ok){
                    setError(true)
                    return
                }
                const data = await res.json()
                // console.log(data.content)
                setOptions(data.content)
            } catch (error) {
                toast.error("Some error occurred while fetching notes")
            }finally{
                setLoading(false)
            }
        }
        getNotes()
    },[])

    if(loading){
        return(
            <div className={cn("max-w-5xl w-full flex-1 flex justify-center items-center dark:text-white text-black mx-auto")}>Loading...</div>
        )
    }

    if(error){
        return(
            <div className={cn("max-w-5xl w-full flex-1 flex justify-center items-center dark:text-white text-black mx-auto")}>Sorry can't fetch notes right now.</div>
        )
    }

    if(options?.length===0){
        return(
            <div className="h-screen w-full flex justify-center items-center dark:text-white text-black">
                No content posted
            </div>
        )
    }

    return(
        <div className={cn("max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 px-5 py-6 pt-20 mx-auto")}>
            {options && options.map((option)=>(
                <Card key={option.id} thumbnail={option.thumbnail} title={option.title} summary={option.summary} id={option.id} section="lawnotes"/>
            ))}
        </div>
    )
}