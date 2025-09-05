import Navbar from "@/components/client/Navbar";
import SubscriptionModal from "@/components/client/SubscriptionModal";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function({children}:{children:ReactNode}){
    return(
        <div className={cn("min-h-screen max-w-screen dark:bg-black relative bg-blue-100 flex flex-col")}>
            <SubscriptionModal/>
            <Navbar trigger={false}/>
            <div className="overflow-x-hidden">
                {children}
            </div>
        </div>
    )
}