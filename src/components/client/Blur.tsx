'use client'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Blur() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
    return (
        <motion.div 
        initial={false}
        animate={scrolled ? {  width: '96%' } : {  width: '100%' }}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "easeInOut"
        }}
        className={cn(
          "fixed bg-neutral-100/20 backdrop-blur-xl z-19 left-1/2 -translate-x-1/2 h-10 top-0",
          "transition-all duration-400",
          "hidden md:block",
          scrolled ? "rounded-md" : ""
        )}
        style={{
          maxWidth: '100vw'
        }}
        ></motion.div>
    )
}