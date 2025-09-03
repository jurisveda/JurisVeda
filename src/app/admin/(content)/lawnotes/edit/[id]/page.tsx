"use client"

import Editcontent from "@/components/admin/Editcontent"
import { useParams } from "next/navigation"

export default function EditLawNotes(){
    const {id} = useParams()
    return(
        <Editcontent section="lawnotes" id={id}/>
    )
}