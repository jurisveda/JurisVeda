import { cn } from "@/lib/tiptap-utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CardProps{
    thumbnail: string,
    title: string,
    summary: string,
    id:string,
    alt?: string,
    section:string
}

export function Card({ thumbnail, title, summary, alt = "Thumbnail", id, section }:CardProps){
    const router = useRouter()
    function handleClick(){
        router.push(`/${section}/show/${id}`)
        return
    }

    const svgPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
    <circle cx="50" cy="40" r="8" fill="#d1d5db"/>
    <rect x="20" y="55" width="60" height="4" fill="#d1d5db"/>
    <rect x="30" y="65" width="40" height="4" fill="#d1d5db"/>
    </svg>
    `)}`

    return(
        <div onClick={handleClick} className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer flex flex-col h-[420px] w-full")}>
            <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* <img 
                    src={thumbnail} 
                    alt={alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 text-center leading-none"
                /> */}
                <Image 
                    src={thumbnail} 
                    alt={alt}
                    fill
                    placeholder="blur"
                    blurDataURL={svgPlaceholder}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-800 z-10"></div>
            </div>
            
            <div className="p-6 space-y-3 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    {title}
                </h3>
                
                <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed flex-grow line-clamp-5">
                    {summary}
                </p>
            </div>
        </div>
    )
}
