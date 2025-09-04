"use client"
import AddFAQComponent from "@/components/admin/Addfaqs";
import EditFAQComponent from "@/components/admin/Editfaqs";
import Loading from "@/components/LoadingPage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ManageFAQs(){
    const { id } = useParams()
    const[loading , setLoading] = useState<boolean>(true)
    const [mode , setMode] = useState<"ADD"|"EDIT"|null>(null)
    const [questions , setQuestions] = useState<string[]>([])
    const [answers , setAnswers] = useState<string[]>([])
    const [faqId , setfaqId] = useState<string|null>(null)
    useEffect(()=>{
        async function fetchFAQs(){
            try {
                const res = await fetch(`/api/content/caselaws/faqs/${id}`)
                if(!res.ok){
                    throw new Error()
                }
                const JSONdata = await res.json()
                if(!JSONdata.data){
                    setMode("ADD")
                }else{
                    setQuestions(JSONdata.data.questions)
                    setAnswers(JSONdata.data.answers)
                    setfaqId(JSONdata.data.id)
                    setMode("EDIT")
                }
            } catch (error) {
                toast.error("Error while fetching faqs !")
                console.error("Error while loading faqs: ",error)
            }finally{   
                setLoading(false)
            }
        }
        fetchFAQs()
    },[])

    if(loading){
        return <Loading/>
    }

    if(mode==="ADD"){
        return <AddFAQComponent section="caselaws" id={id}/>
    }

    if(mode==="EDIT"){
        return <EditFAQComponent existingAnswers={answers} existingQuestions={questions} section="caselaws" id={faqId}/>
    }
}