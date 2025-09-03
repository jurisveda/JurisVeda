import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { Highlighter, X, Ban } from "lucide-react"
import { useState } from "react"
import { Editor } from "@tiptap/react"
import { cn } from "@/lib/utils"

const HighlightComp = ({ editor, toolbarState }:{editor:Editor|null , toolbarState:any}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const customColors = [
    { 
      label: "Yellow", 
      value: "#ffcc00",
      border: "#e6b800"
    },
    { 
      label: "Green", 
      value: "#00ff00",
      border: "#00cc00"
    },
    { 
      label: "Blue", 
      value: "#0066cc",
      border: "#0052a3"
    },
    { 
      label: "Pink", 
      value: "#ff69b4",
      border: "#e055a0"
    },
    { 
      label: "Orange", 
      value: "#ff8800",
      border: "#e67700"
    },
  ]

  const handleColorSelect = (color:string) => {
    if (editor && !editor.state.selection.empty) {
      const { from, to } = editor.state.selection
      editor?.chain().focus().setTextSelection({ from, to }).setHighlight({ color }).setTextSelection(to).unsetHighlight().run()
    }
    setIsOpen(false)
  }

  const handleRemoveHighlight = () => {
    editor?.chain().focus().unsetHighlight().run()
    setIsOpen(false)
  }

  const isActive = editor?.isActive('highlight') ?? false

  if(!editor) return null

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Toggle 
          pressed={isActive}
          className={cn(
            "hover:bg-amber-100 cursor-pointer mx-1 dark:hover:bg-amber-300",
            isActive && "bg-amber-300"
          )}
        >
          <Highlighter className="dark:text-white"/>
        </Toggle>
      </PopoverTrigger>
      
      <PopoverContent className={cn("md:w-64 p-2 mx-2 w-50 bg-white/20 border-none backdrop:blur-3xl")} align="start">
        <div className="space-y-3">
          <div className="grid grid-cols-6 gap-2">
            {customColors.map((color, index) => {
              const isColorActive = editor?.isActive('highlight', { color: color.value })
              
              return (
                <button
                  key={index}
                  onClick={() => handleColorSelect(color.value)}
                  className={cn(
                    "md:w-8 md:h-8 w-6 h-6 cursor-pointer rounded-full border-2 hover:scale-110 transition-all duration-200",
                    "focus:outline-none",
                    isColorActive && "ring-2 ring-gray-400 ring-offset-1 scale-105"
                  )}
                  style={{ 
                    backgroundColor: color.value,
                    borderColor: color.border 
                  }}
                  title={color.label}
                  aria-label={`Apply ${color.label} highlight`}
                />
              )
            })}
            
            <button
              onClick={handleRemoveHighlight}
              disabled={!isActive}
              className={cn(
                "md:w-8 md:h-8 w-6 h-6 rounded-full border-2 border-gray-300 bg-white hover:scale-110 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1",
                "flex items-center justify-center",
                !isActive && "opacity-50 cursor-pointer hover:scale-100"
              )}
              title="Remove highlight"
              aria-label="Remove highlight"
            >
              <Ban className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default HighlightComp
