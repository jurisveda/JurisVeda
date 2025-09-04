"use client"
import { cn } from "@/lib/tiptap-utils";
import { LoaderFive } from "./ui/loader";
import { useLoadingStore } from "@/lib/store";
import { useEffect } from "react";

export default function Loading(){
    const loading = useLoadingStore((s)=> s.loading)

    if(!loading) return null;

    return(
        <div className={cn("fixed z-50 inset-0 dark:text-white backdrop-blur-lg flex items-center justify-center bg-white/10")}>
          <LoaderFive text="Loading..."/>
        </div>
    )
}