import Navbar from "@/components/admin/AdminNavbar";
import Loading from "@/components/LoadingPage";
import { ReactNode } from "react";

export default function AdminLayout({children}:{children:ReactNode}){
    return(
        <div className="min-h-screen flex flex-col relative">
            <Navbar/>
            <div className="max-w-7xl w-full flex flex-col flex-1 p-6 mx-auto">
                {children}
            </div>
        </div>
    )
}