"use client"
import Publishes from "@/components/admin/publishes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CurrentAffairs(){
    const router = useRouter()
    const [notes , setNotes] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        async function getNotes(){
            try {
                setLoading(true)
                const res = await fetch("/api/content/currentaffairs")
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
        <Publishes note="Current Affairs" notesList={notes} section="currentaffairs" loading={loading}/>
    )
}