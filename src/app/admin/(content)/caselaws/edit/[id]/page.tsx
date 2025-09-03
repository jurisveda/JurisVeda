"use client"

import Editcontent from "@/components/admin/Editcontent"
import { useParams } from "next/navigation"

export default function EditCaselaws(){
    const {id} = useParams()
    return(
        <Editcontent section="caselaws" id={id}/>
    )
}