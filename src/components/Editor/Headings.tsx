import { Heading1, Heading2, Heading3, Heading4 } from "lucide-react"
import { Editor, useEditorState } from "@tiptap/react"
import { Toggle } from "../ui/toggle"

const HeadingOptions = [
  {
    tool: "Heading 1",
    Icon: <Heading1 className="dark:text-white"/>,
    click: (editor: Editor|null) => {editor?.chain().focus().toggleHeading({level:1}).run()},
    isActive: (toolbarState: any) => toolbarState?.isHeading1 ?? false
  },
  {
    tool: "Heading 2",
    Icon: <Heading2 className="dark:text-white"/>,
    click: (editor: Editor|null) => {editor?.chain().focus().toggleHeading({level:2}).run()},
    isActive: (toolbarState: any) => toolbarState?.isHeading2 ?? false
  },
  {
    tool: "Heading 3",
    Icon: <Heading3 className="dark:text-white"/>,
    click: (editor: Editor|null) => {editor?.chain().focus().toggleHeading({level:3}).run()},
    isActive: (toolbarState: any) => toolbarState?.isHeading3 ?? false
  },
  {
    tool: "Heading 4",
    Icon: <Heading4 className="dark:text-white"/>,
    click: (editor: Editor|null) => {editor?.chain().focus().toggleHeading({level:4}).run()},
    isActive: (toolbarState: any) => toolbarState?.isHeading4 ?? false
  },
]

export const Headings = ({editor}:{editor:Editor|null}) => {
  const toolbarState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      return {
        isHeading1: editor.isActive('heading' , {level:1}),
        isHeading2: editor.isActive('heading' , {level:2}),
        isHeading3: editor.isActive('heading' , {level:3}),
        isHeading4: editor.isActive('heading' , {level:4}),
      }
    }
  })
  
  return (
    <>
      {HeadingOptions.map((heading)=>(
        <Toggle 
          key={heading.tool} 
          onClick={() => heading.click(editor)} 
          pressed={heading.isActive(toolbarState)} 
          className="data-[state=on]:bg-amber-300 hover:bg-amber-100 dark:hover:bg-amber-300 cursor-pointer mx-1"
        >
          {heading.Icon}
        </Toggle>
      ))}
    </>
  )
}