import Navbar from "@/components/client/Navbar";
import SubscriptionModal from "@/components/client/SubscriptionModal";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function({children}:{children:ReactNode}){
    return(
        <div className={cn("min-h-screen max-w-screen relative flex flex-col")}>
            <SubscriptionModal/>
            <Navbar trigger={false}/>
            <div className="flex-1 overflow-x-hidden flex flex-col">
                {children}
            </div>
        </div>
    )
}