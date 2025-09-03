"use client"
import Publishes from "@/components/admin/publishes";
import { useLoadingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CaseLaws(){
    const router = useRouter()
    const [notes , setNotes] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        async function getNotes(){
            try {
                const res = await fetch("/api/content/caselaws")
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
        <Publishes note="Case Laws" notesList={notes} section="caselaws" loading={loading}/>
    )
}