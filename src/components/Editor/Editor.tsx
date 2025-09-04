"use client"
import { useEditor,EditorContext } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from '@tiptap/extension-image'
import { TextAlign } from "@tiptap/extension-text-align"
import { Highlight } from "@tiptap/extension-highlight"
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import { useEffect, useMemo } from "react"
import EditorContentArea from "./EditorContentArea"
import ToolBar from "./Tools"
import { MAX_FILE_SIZE } from "@/lib/tiptap-utils"
import Link from "@tiptap/extension-link"

interface TiptapEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({content , onContentChange , placeholder}:TiptapEditorProps){
    const CustomLink = Link.extend({
        inclusive: false,
    })

    const editor = useEditor({
        editorProps:{
            attributes:{
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
                spellcheck: "false",
                class:"caret-purple-300 h-full py-2 px-4 dark:text-white text-black focus:outline-none prose max-w-none prose-sm prose-headings:my-1 prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0"
            }
        },
        extensions:[
            StarterKit.configure({
                link: false
            }),
            CustomLink.configure({
                openOnClick: false,
                linkOnPaste: true,
                autolink: true,
                protocols: ['http', 'https', 'ftp', 'ftps', 'mailto', 'tel'],
                validate: (href) => {
                    return /^https?:\/\//.test(href) || /^mailto:/.test(href) || /^tel:/.test(href)
                },
                HTMLAttributes: {
                    class: 'prose-link',
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'w-64 h-48 object-contain',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            TextStyle,
            FontSize
        ],
        content,
        onUpdate: ({editor}) => {
            const htmlContent = editor.getHTML()
            onContentChange(htmlContent)
        },
        immediatelyRender: false,
    })

    const editorContextValue = useMemo(()=>({editor}),[editor])
    
    return(
        <div className="w-full flex flex-col flex-1 border-1">
            <EditorContext.Provider value={editorContextValue}>
                <ToolBar/>
                <div className="max-w-7xl w-full flex flex-col flex-1 mx-auto">
                    <EditorContentArea placeholder={placeholder}/>
                </div>
            </EditorContext.Provider>
        </div>
    )
}