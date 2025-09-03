"use client"
import Editor from "@/components/Editor/Editor"
import { Input } from "@/components/ui/input"
import { LoaderFive } from "@/components/ui/loader"
import { useEditNoteStore } from "@/lib/store"
import { Label } from "@radix-ui/react-label"
import { RotateCcw, Upload, UploadCloud } from "lucide-react"
import { ParamValue } from "next/dist/server/request/params"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface dataType{
    id: string,
    content: string,
    title: string,
    thumbnail: string,
    createdBy: string,
    updatedBy: string
}

function UploadUI({className} : {className : string}){
    return(
        <div className={className}>
            <Upload className="size-8"/>
            <div className="flex flex-col items-center">
                <span className="text-sm sm:text-lg">Click here to upload thumbnail !</span>
                <span className="text-[10px] sm:text-sm opacity-50">Only JPEG, PNG, and WebP</span>
            </div>
        </div>
    )
}

export default function Editcontent({section,id}:{section:string,id:ParamValue}) {
    const router = useRouter()
    const [data, setData] = useState<dataType|null>(null)
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string|null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {content , setContent} = useEditNoteStore()
    const [title , setTitle] = useState("")
    const [summary , setSummary] = useState("")

    const handleThumbnailUpload = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>) => {
        setSelectedFile(null)
        e.preventDefault()
        const element = document.createElement('input')
        element.setAttribute('type' , 'file')
        element.setAttribute('accept' , 'image/*')
        element.addEventListener('change' , async (event) => {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files.length > 0) {
                setSelectedFile(target.files[0]);
            }
        })
        element.click()
    }

    const uploadToDB = async() => {
        try {
            const formdata = new FormData()
            setUploading(true)
            // const imageKitRes = await uploadToImageKit(selectedFile)
            // console.log({"tile":inputValue,"file":imageKitRes,"content":content,"createdBy":(session as any).id})
            formdata.append("title",title)
            formdata.append("content",content)
            formdata.append("summary",summary)
            if(selectedFile) formdata.append("thumbnail",selectedFile)
            const res = await fetch(`/api/content/${section}/edit/${id}`,{
                method: 'PUT',
                body: formdata
            })
            if(!res.ok){
                // setLoading(false)
                // console.log(res)
                toast.warning("Uploading failed")
            }else{
                router.push(`/admin/${section}`)
                toast.success("Uploaded !!")
                setTitle("")
                setSelectedFile(null)
                setContent("")
            }
        } catch (error) {
            toast.error("Some error occured")
        }finally{
            setUploading(false)
        }
    }
    
    useEffect(() => {
        async function fetchContent() {
            try {
                setLoading(true)
                setError(null)
                
                const res = await fetch(`/api/content/${section}/${id}`)
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch case law: ${res.status} ${res.statusText}`)
                }
                
                const responseData = await res.json()
                setData(responseData.data)
                // setSelectedFile()
                setTitle(responseData.data.title)
                setContent(responseData.data.content)
                setSummary(responseData.data.summary)
            } catch (err:any) {
                console.error("Error fetching case law:", err)
                setError(err.message || `Failed to fetch record with id ${id}`)
            } finally {
                setLoading(false)
            }
        }
        
        fetchContent()
    }, [id])

    if(loading){
        return(
            <div className="absolute z-30 dark:text-white backdrop-blur-lg flex items-center justify-center inset-0 bg-white/10">
                <LoaderFive text="Loading..."/>
            </div>
        )
    }

    if(uploading){
        return(
            <div className="absolute z-30 dark:text-white backdrop-blur-lg flex items-center justify-center inset-0 bg-white/10">
                <LoaderFive text="Uploading..."/>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-screen w-full min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-white">Error: {error}</div>
            </div>
        )
    }

    return(
        <div className="md:max-w-5xl w-full flex flex-col gap-5 flex-1 mx-auto pt-12">
            <div className="flex">
                <div className="flex flex-col flex-1 gap-2">
                    <Label htmlFor="title" className="cursor-pointer dark:text-white">Enter Title:</Label>
                    <Input id="title" className="focus-visible:border-none dark:text-white" value={title??""} onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className="flex items-end mx-10 my-2 dark:text-white cursor-pointer" onClick={uploadToDB}>
                    <UploadCloud/>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="cursor-pointer dark:text-white">Enter Summary:</Label>
                <Input id="title" className="focus-visible:border-none dark:text-white" value={summary??""} onChange={(e)=>{setSummary(e.target.value)}}/>
            </div>
            <div className="w-full">
                {selectedFile ? 
                    <div className="text-black dark:text-white flex justify-center items-center gap-5">
                        <p>Selected: {(selectedFile.name.length > 25 ? selectedFile.name.slice(0,25)+"...":selectedFile.name)} ({(selectedFile.size / (1024*1024)).toFixed(1)} MB)</p>
                        <RotateCcw onClick={handleThumbnailUpload} className="size-5 cursor-pointer"/>
                    </div> 
                    : 
                    <div onClick={handleThumbnailUpload} className="bg-amber-50/10 flex p-2 justify-center items-center border-sky-400 border-2 border-dashed rounded-md cursor-pointer">
                        <UploadUI className="text-black flex flex-col justify-center items-center gap-3 p-2 dark:text-white"/>
                    </div>
                }
            </div>
            {/* {JSON.stringify(data)} */}
            <Editor onContentChange={setContent} content={content} placeholder="Write your content here"/>
        </div>
    )
}
