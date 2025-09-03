import Blur from "@/components/client/Blur";
import Navbar from "@/components/client/Navbar";
import SubscriptionModal from "@/components/client/subscriptionModal";
import { ReactNode } from "react";

export default function HomeLayout({children}:{children : ReactNode}){
    return(
        <div className="min-h-screen relative">
            <SubscriptionModal/>
            <Navbar trigger={true}/>
            {/* <Blur/> */}
            {children}
        </div>
    )
}