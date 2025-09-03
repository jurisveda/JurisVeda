import { Editor } from "@tiptap/react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, Type } from "lucide-react"
import { Button } from "../ui/button"

const FontSizeOptions = [
  {
    label: "Small",
    value: "12px",
    displayName: "12px"
  },
  {
    label: "Normal", 
    value: "16px",
    displayName: "16px"
  },
  {
    label: "Medium",
    value: "18px", 
    displayName: "18px"
  },
  {
    label: "Large",
    value: "20px",
    displayName: "20px"
  },
  {
    label: "X-Large",
    value: "24px",
    displayName: "24px"
  },
  {
    label: "XX-Large",
    value: "28px",
    displayName: "28px"
  },
  {
    label: "Huge",
    value: "32px",
    displayName: "32px"
  }
]

export const FontSizeDropdown = ({ editor, toolbarState }: { editor: Editor | null, toolbarState: any }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleFontSizeChange = (fontSize: string) => {
    if (fontSize === "16px") {
      editor?.chain().focus().unsetFontSize().run()
    } else {
      editor?.chain().focus().setFontSize(fontSize).run()
    }
  }

  const getCurrentLabel = () => {
    const currentSize = toolbarState?.currentFontSize || "16px"
    const option = FontSizeOptions.find(opt => opt.value === currentSize)
    return option?.displayName || "16px"
  }

  if (!editor) return null

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "data-[state=on]:bg-none hover:bg-amber-100 dark:hover:bg-amber-300 cursor-pointer mx-1 h-9 px-2",
            "flex items-center gap-1 text-sm"
          )}
        >
          <Type className="h-4 w-4 dark:text-white" />
          <span className="text-xs min-w-[24px] dark:text-white">{getCurrentLabel()}</span>
          <ChevronDown className="h-3 w-3 dark:text-white text-black" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        align="start" 
        side="bottom"
        sideOffset={8}
        className="w-32 p-1 z-50"
      >
        {FontSizeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              handleFontSizeChange(option.value)
              setIsOpen(false)
            }}
            className={cn(
              "w-full text-left px-2 py-1.5 hover:bg-amber-100 rounded flex items-center justify-between text-sm",
              toolbarState?.currentFontSize === option.value && "bg-amber-100 font-medium"
            )}
          >
            <span>{option.label}</span>
            <span className="text-xs text-gray-500">{option.displayName}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
