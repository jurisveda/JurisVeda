import { EditorContent, useCurrentEditor } from "@tiptap/react"

export default function EditorContentArea({placeholder}:{placeholder:string | undefined}){
    const {editor} = useCurrentEditor()
    return(
        <div className="w-full flex flex-1 dark:bg-black bg-white mx-auto pt-5">
            <EditorContent editor={editor} className="w-full flex-1" placeholder={placeholder}/>
        </div>
    )
}