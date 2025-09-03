"use client"
import Publishes from "@/components/admin/publishes";
import { useLoadingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LawNotes(){
    const router = useRouter()
    const [notes , setNotes] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        async function getNotes(){
            try {
                setLoading(true)
                const res = await fetch("/api/content/lawnotes")
                const data = await res.json()
                // console.log(data.content)
                setNotes(data.content)
            } catch (error) {
                toast.error("Some error occurred while fetching notes")
            }finally{
                setLoading(false)
            }
        }
        getNotes()
    },[])

    return(
        <Publishes note="Law Notes" notesList={notes} section="lawnotes" loading={loading}/>
    )
}