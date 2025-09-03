import { useSubscriptionStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Subscribe(){
    const toggle = useSubscriptionStore((s)=>s.toggleModal)
    return(
        <section className={cn("bg-white dark:bg-[#2a2a2a] py-20")}>
            <div className={cn("max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center")}>
                <div className={cn("w-full bg-gradient-to-r from-blue-600/40 to-cyan-300/60 text-white text-center py-20 px-6 rounded-2xl shadow-xl")}>
                    <h2 className={cn("text-4xl font-bold mb-4")}>Elevate Your Knowledge</h2>
                    <p className={cn("mb-8 max-w-xl mx-auto text-white")}>
                        Join our community to receive updates on new notes, case laws, and exclusive content directly in your inbox.
                    </p>
                    <button onClick={toggle} className={cn("max-w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer")}>
                        Subscribe
                    </button>
                </div>
            </div>
        </section>  
    )
}