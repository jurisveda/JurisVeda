'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Book, Cash, NewsPaper, Scale } from '@/components/SvgProvider'
import { cn } from "@/lib/utils"
import { DoorOpen, LogOut, LogOutIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { signOut } from 'next-auth/react'

const navLinks = [
  { id: 1, name: 'Law Notes', path: '/lawnotes', icon: Book, groupClass: 'group/book', hoverClass: 'group-hover/book:text-blue-600'},
  { id: 2, name: 'Case Laws', path: '/caselaws', icon: Cash, groupClass: 'group/cash', hoverClass: 'group-hover/cash:text-blue-600' },
  { id: 3, name: 'Current Affairs', path: '/currentaffairs', icon: NewsPaper, groupClass: 'group/newspaper', hoverClass: 'group-hover/newspaper:text-blue-600' }
];

export default function Navbar({className}:{className?:string}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [scrolled, setScrolled] = useState(false)
  const {theme , setTheme} = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

// this cause delayed rendering of navbar with respect to other divs , doesnt look good , implement own useEffect for theme

  if (!mounted) {
    return null
  }

  const toggleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // useEffect(() => {
  //   const saved = localStorage.getItem("theme")
  //   if (saved === "dark") {
  //     setTheme("dark")
  //     document.body.setAttribute("data-theme", "dark")
  //   } else {
  //     setTheme("light")
  //     document.body.removeAttribute("data-theme")
  //   }
  // }, [])

// if (theme === null) {
//   return null 
// }

  // const toggleMode = () => {
  //   if(theme === "dark"){
  //     document.body.removeAttribute("data-theme")
  //     setTheme("light")
  //     localStorage.setItem('theme' , "light")
  //   }else{
  //     document.body.setAttribute("data-theme" , "dark")
  //     setTheme("dark")
  //     localStorage.setItem('theme' , "dark")
  //   }
  // }

  return (
    <>
      <nav className={cn("fixed top-0 w-full bg-white dark:bg-neutral-700 z-20 px-4 py-2 lg:px-8 text-black hidden md:block")}>
        <div className={cn("max-w-full mx-auto flex items-center justify-between")}>
          <div>
            <a href='/admin' className={cn("flex gap-2")}>
              <Scale />
              <span className={cn("sm:text-lg md:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500")}>JurisVeda</span>
            </a>
          </div>
          <div className={cn('flex items-center cursor-pointer gap-10')}>
            <motion.div
              className={cn("h-7 w-20 rounded-2xl relative cursor-pointer overflow-hidden flex items-center" , theme === "dark" ? 'bg-neutral-500' : 'bg-amber-200')}
              onClick={toggleMode}
            >
              <motion.div
                key={theme}
                initial={{ x: theme === "dark" ? 30 : -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: theme === "dark" ? -30 : 30, opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {theme === "dark" ? (
                  <Moon className="size-5 text-white" />
                ) : (
                  <Sun className="size-5 text-white" />
                )}
              </motion.div>
            </motion.div>
            <button onClick={()=>{signOut()}} className={cn("w-full bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg transition-colors cursor-pointer")}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={cn("fixed bg-neutral-100 dark:bg-neutral-700 top-0 left-0 right-0 z-20 px-6 py-2 lg:px-8 text-black md:hidden shadow-2xl")}>
        <div className={cn("max-w-7xl mx-auto flex items-center justify-between")}>
          <div className={cn("flex items-center gap-2")}>
            <Scale />
            <span className={cn("text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500")}>JurisVeda</span>
          </div>
          <div className={cn("flex items-center gap-5 mx-2")}>
            <motion.div
              className={cn("h-6 w-10 mx-1 rounded-2xl relative cursor-pointer overflow-hidden flex items-center" , theme === "dark" ? 'bg-neutral-500' : 'bg-amber-200')}
              onClick={toggleMode}
            >
              <motion.div
                key={theme}
                initial={{ x: theme === "dark" ? 30 : -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: theme === "dark" ? -30 : 30, opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {theme === "dark" ? (
                  <Moon className="size-4 text-white" />
                ) : (
                  <Sun className="size-4 text-white" />
                )}
              </motion.div>
            </motion.div>
            <DoorOpen onClick={()=>{signOut()}} className='text-red-500 cursor-pointer'/>
          </div>
        </div>
      </nav>
    </>
  )
} 
