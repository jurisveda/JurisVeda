"use client"

import Editcontent from "@/components/admin/Editcontent"
import { useParams } from "next/navigation"

export default function EditCurrentAffairs(){
    const {id} = useParams()
    return(
        <Editcontent section="currentaffairs" id={id}/>
    )
}