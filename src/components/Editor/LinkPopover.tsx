import { useState } from "react"
import { Toggle } from "../ui/toggle"
import { Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Editor } from "@tiptap/react"

export const LinkPopover = ({ editor, isActive }: { editor: Editor | null, isActive: boolean }) => {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")

  const handleAddLink = () => {
    if (url.trim()) {
      if(editor && !editor.state.selection.empty){
        const {from , to} = editor.state.selection
        editor?.chain().focus().setTextSelection({from,to}).setLink({ href: url }).setTextSelection(to).run()
      }
      setUrl("")
      setOpen(false)
    }
  }

  const handleRemoveLink = () => {
    editor?.chain().focus().unsetLink().run()
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Toggle
          pressed={isActive}
          className="data-[state=on]:bg-amber-300 hover:bg-amber-100 dark:hover:bg-amber-300 cursor-pointer mx-1"
        >
          <Link className="dark:text-white"/>
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="w-80" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Link</h4>
            <p className="text-sm text-muted-foreground">
              Enter the URL for the link
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url" className="dark:text-white">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddLink()
                }
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddLink} size="sm" className="flex-1 dark:text-white">
              Add Link
            </Button>
            {isActive && (
              <Button onClick={handleRemoveLink} variant="destructive" size="sm" className="dark:text-white">
                Remove
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
