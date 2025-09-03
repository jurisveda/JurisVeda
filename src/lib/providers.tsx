"use client"

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react"

export function AuthProvider({children}:{children : ReactNode}){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export function ThemeProvider({children}:{children : ReactNode}){
    useEffect(()=>{
        const theme = localStorage.getItem("theme")
        console.log(theme)
        if(theme){
          if(theme === "light"){
            document.body.removeAttribute("data-theme")
          }else if(theme === "dark"){
            document.body.setAttribute("data-theme","dark")
          }
        }
    },[])

    return(
        <>{children}</>
    )
}