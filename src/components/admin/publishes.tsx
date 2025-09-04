"use client"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLoadingStore } from "@/lib/store";
import NoContent from "./NoContent";
import Notecard from "./Notecard";
import Loading from "@/components/LoadingPage";

interface noteType {
  id: string;
  title: string;
}

export default function AdminNotes({
  note = "Law Note",
  notesList,
  section,
  loading
}: {
  note?: string;
  notesList: noteType[] | null;
  section: string;
  loading: boolean
}) {
  const router = useRouter();
  // const loading = useLoadingStore((s)=>s.loading)
  // if(loading) return null;
  if(loading){
    return(
      <Loading/>
    )
  }

  return (
      <div className={cn("w-full max-w-7xl mx-auto py-2 flex-1 flex flex-col my-10 px-4 sm:px-6 lg:px-8")}>        
        {(!notesList || notesList.length===0) ? (
          <NoContent section={section}/>
        ) : (
          <div className={cn("max-w-5xl w-full flex flex-col mt-5 mx-auto")}>
            <div className={cn("flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700")}>
              <h1 className={cn("text-xl md:text-2xl font-semibold text-neutral-800 dark:text-white")}>
                {note}
              </h1>
              <Button
                onClick={() => router.push(`/admin/${section}/add`)}
                className={cn("flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer")}
              >
                <Plus className={cn("w-4 h-4")} />
                <span className={cn("text-sm md:text-base")}>Add Note</span>
              </Button>
            </div>

            <div className={cn("space-y-3 mt-6")}>
              {notesList.map((note) => (
                <Notecard
                  key={note.id}
                  title={note.title}
                  id={note.id}
                  section={section}
                />
              ))}
            </div>
          </div>
        )}
      </div>
  );
}