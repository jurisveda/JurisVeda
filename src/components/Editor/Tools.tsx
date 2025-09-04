import { Bold, Italic, Underline, Strikethrough, Code,AlignRight, AlignCenter, AlignLeft, AlignJustify, List, ListOrdered, MoonStar, Sun, CloudUpload } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Editor , useCurrentEditor, useEditorState } from "@tiptap/react"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { OwnImageUploadBtn } from "./Uploadbtn"
import { LinkPopover } from './LinkPopover'
import { Headings } from './Headings'
import HighlightComp from "./Highlighter"
import { FontSizeDropdown } from "./FontSizeDropDown"

interface ToolbarOption {
  tool: string
  Icon: ReactNode
  click: (editor: Editor | null) => void
  isActive: (toolbarState: any) => boolean
}

const Separator = () => {
  return(
    <div className="mx-2 py-2 self-stretch">
      <div className="w-px h-full bg-black dark:bg-white"></div>
    </div>
  )
}


const options: ToolbarOption[] = [
  {
    tool: "Bold",
    Icon: <Bold className="dark:text-white"/>,
    click: (editor: Editor | null) => {
      if(editor && !editor.state.selection.empty){
        const {from,to} = editor.state.selection
        editor?.chain().focus().setTextSelection({from,to}).toggleBold().setTextSelection(to).toggleBold().run()
      }
    },
    isActive: (toolbarState: any) => toolbarState?.isBold ?? false
  },
  {
    tool: "Italic",
    Icon: <Italic className="dark:text-white"/>,
    click: (editor: Editor | null) => {
      if(editor && !editor.state.selection.empty){
        const {from,to} = editor.state.selection
        editor?.chain().focus().setTextSelection({from,to}).toggleItalic().setTextSelection(to).toggleItalic().run()
      }
    },
    isActive: (toolbarState: any) => toolbarState?.isItalic ?? false
  },
  {
    tool: "Underline",
    Icon: <Underline className="dark:text-white"/>,
    click: (editor: Editor | null) => {
      if(editor && !editor.state.selection.empty){
        const {from,to} = editor.state.selection
        editor?.chain().focus().setTextSelection({from,to}).toggleUnderline().setTextSelection(to).toggleUnderline().run()
      }
    },
    isActive: (toolbarState: any) => toolbarState?.isUnderlined ?? false
  },
  {
    tool: "Strike",
    Icon: <Strikethrough className="dark:text-white"/>,
    click: (editor: Editor | null) => {
      if(editor && !editor.state.selection.empty){
        const {from,to} = editor.state.selection
        editor?.chain().focus().setTextSelection({from,to}).toggleStrike().setTextSelection(to).toggleStrike().run()
      }
    },
    isActive: (toolbarState: any) => toolbarState?.isStriked ?? false
  },
  {
    tool: "Code",
    Icon: <Code className="dark:text-white"/>,
    click: (editor: Editor | null) => {
      if(editor && !editor.state.selection.empty){
        const {from,to} = editor.state.selection
        editor?.chain().focus().setTextSelection({from,to}).toggleCode().setTextSelection(to).toggleCode().run()
      }
    },
    isActive: (toolbarState: any) => toolbarState?.isCode ?? false
  },
]

const alignmentsOptions = [
  {
    tool: "RightAlign",
    Icon: <AlignRight className="dark:text-white"/>,
    click: (editor: Editor | null) => { editor?.chain().focus().toggleTextAlign("right").run() },
    isActive: (toolbarState: any) => toolbarState?.isRight ?? false
  },
  {
    tool: "LeftAlign",
    Icon: <AlignLeft className="dark:text-white"/>,
    click: (editor: Editor | null) => { editor?.chain().focus().toggleTextAlign("left").run() },
    isActive: (toolbarState: any) => toolbarState?.isLeft ?? false
  },
  {
    tool: "CenterAlign",
    Icon: <AlignCenter className="dark:text-white"/>,
    click: (editor: Editor | null) => { editor?.chain().focus().toggleTextAlign("center").run() },
    isActive: (toolbarState: any) => toolbarState?.isCenter ?? false
  },
  {
    tool: "JustifyAlign",
    Icon: <AlignJustify className="dark:text-white"/>,
    click: (editor: Editor | null) => { editor?.chain().focus().toggleTextAlign("justify").run() },
    isActive: (toolbarState: any) => toolbarState?.isJustify ?? false
  },
]

const listOptions = [
  {
    tool: "BulletList",
    Icon: <List className="dark:text-white"/>,
    click: (editor: Editor | null) => { editor?.chain().focus().toggleBulletList().run()},
    isActive: (toolbarState: any) => toolbarState?.isBullet ?? false
  },
  {
    tool: "OrderedList",
    Icon: <ListOrdered className="dark:text-white"/>,
    click: (editor: Editor | null) => { editor?.chain().focus().toggleOrderedList().run()},
    isActive: (toolbarState: any) => toolbarState?.isOrdered ?? false
  },
]

const HorizontalRuleComp = ({editor,toolbarState}:{editor: Editor|null,toolbarState: any}) => {
  const click = () => { editor?.chain().focus().setHorizontalRule().run() }
  const isActive = () => toolbarState?.isHr ?? false
  return(
    <Toggle pressed={isActive()} onClick={click} className="data-[state=on]:bg-amber-300 dark:hover:bg-amber-300 hover:bg-amber-100 cursor-pointer dark:text-white text-black mx-1">
      Hr
    </Toggle>
  )
}

const UploadTodb = ({editor}:{editor:Editor|null}) => {
  const [content , setContent] = useState<any>(null)
  if(!editor) return null

  const handleClick = () => {
    const itGoes = editor.getHTML()
    setContent(itGoes)
    console.log(itGoes)
  }

  return(
    <Toggle
      onClick={handleClick} 
      className="data-[state=on]:bg-amber-300 dark:hover:bg-amber-300 hover:bg-amber-100 cursor-pointer dark:text-white text-black mx-1">
      <CloudUpload className="dark:text-white"/>
    </Toggle>
  )
}

export default function ToolBar() {
  const { editor } = useCurrentEditor()
  const [theme , setTheme] = useState<string|null>(null)
  
  const toolbarState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      const fontSize = editor.getAttributes('textStyle').fontSize
      return {
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isUnderlined: editor.isActive('underline'),
        isStriked: editor.isActive('strike'),
        isLink: editor.isActive('link'),
        isCode: editor.isActive('code'),
        isLeft: editor.isActive({textAlign: "left"}),
        isRight: editor.isActive({textAlign: "right"}),
        isCenter: editor.isActive({textAlign: "center"}),
        isJustify: editor.isActive({textAlign: "justify"}),
        isHr: editor.isActive('horizontalRule'),
        isHighlighted: editor.isActive('highlight'),
        isOrdered: editor.isActive('orderedList'),
        isBullet: editor.isActive('bulletList'),
        currentFontSize: fontSize || "16px",
        isTextStyleActive: editor.isActive('textStyle')
      }
    }
  })

  return (
    <div className="sticky top-11 md:top-14 w-full z-20 py-1 backdrop-blur-3xl bg-white dark:bg-black dark:border-neutral-500 border-b-1 flex flex-nowrap justify-start items-center overflow-x-auto px-1">
      {/* <div className="flex justify-start overflow-x-auto gap-1"> */}
        {/* <div className="flex items-center cursor-pointer" onClick={toggleMode}>
          {theme === "dark" ? (<MoonStar className="size-5 text-white" />) : (<Sun className="size-5 text-black" />)}
        </div> */}

        {/* <Separator/> */}

        <Headings editor={editor}/>
        <FontSizeDropdown editor={editor} toolbarState={toolbarState}/>

        <Separator/>

        {options.map((button) => (
          <Toggle 
            key={button.tool} 
            onClick={() => button.click(editor)} 
            pressed={button.isActive(toolbarState)} 
            className="data-[state=on]:bg-amber-300 hover:bg-amber-100 dark:hover:bg-amber-300 cursor-pointer mx-1"
          >
            {button.Icon}
          </Toggle>
        ))}
        
        <LinkPopover 
          editor={editor} 
          isActive={toolbarState?.isLink ?? false}
        />

        <Separator/>
    
        {alignmentsOptions.map((option) => (
          <Toggle
            key={option.tool} 
            onClick={() => option.click(editor)} 
            pressed={option.isActive(toolbarState)} 
            className="data-[state=on]:bg-amber-300 hover:bg-amber-100 dark:hover:bg-amber-300 cursor-pointer mx-1"
          >
            {option.Icon}
          </Toggle>
        ))}

        <Separator/>
        {listOptions.map((option)=>(
          <Toggle 
            key={option.tool}
            onClick={() => option.click(editor)} 
            pressed={option.isActive(toolbarState)} 
            className="data-[state=on]:bg-amber-300 hover:bg-amber-100 dark:hover:bg-amber-300 cursor-pointer mx-1"
          >
            {option.Icon}
          </Toggle>
        ))}
        {/* <OwnImageUploadBtn editor={editor}/> */}
        <HorizontalRuleComp toolbarState={toolbarState} editor={editor}/>
        <HighlightComp toolbarState={toolbarState} editor={editor}/>

        {/* <Separator/> */}

        {/* <UploadTodb editor={editor}/> */}
      {/* </div> */}
    </div>
  )
}
