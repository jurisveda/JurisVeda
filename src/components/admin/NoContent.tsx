"use client"
import { cn } from "@/lib/tiptap-utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function NoContent({section}:{section:string}){
    const router = useRouter()
    return(
        <div className={cn("w-full flex-1 flex flex-col items-center justify-center dark:text-white text-neutral-700 space-y-4")}>
            <div className={cn("text-center space-y-2")}>
              <h2 className={cn("text-2xl font-semibold")}>No contents available</h2>
              <p className={cn("text-neutral-500 dark:text-neutral-400")}>
                Start by adding some content to get started
              </p>
            </div>
            <Button
              onClick={() => router.push(`/admin/${section}/add`)}
              className={cn("flex items-center gap-2 cursor-pointer")}
            >
              <Plus className={cn("w-4 h-4")} />
              Add Some Content
            </Button>
          </div>
    )
}