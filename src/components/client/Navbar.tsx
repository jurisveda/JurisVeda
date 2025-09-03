'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Book, Cash, NewsPaper, Scale } from '../svgProvider'
import { cn } from "@/lib/utils"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSubscriptionStore } from '@/lib/store'

const navLinks = [
  { id: 1, name: 'Law Notes', path: '/lawnotes', icon: Book, groupClass: 'group/book', hoverClass: 'group-hover/book:text-blue-600'},
  { id: 2, name: 'Case Laws', path: '/caselaws', icon: Cash, groupClass: 'group/cash', hoverClass: 'group-hover/cash:text-blue-600' },
  { id: 3, name: 'Current Affairs', path: '/currentaffairs', icon: NewsPaper, groupClass: 'group/newspaper', hoverClass: 'group-hover/newspaper:text-blue-600' }
];

export default function Navbar({trigger}:{trigger:boolean}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleModal = useSubscriptionStore((s)=>s.toggleModal)

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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  } 

  return (
    <>
      <motion.nav
        initial={false}
        animate={scrolled && trigger ? { top: 5, width: '96%' } : { top: 0, width: '100%' }}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "easeInOut"
        }}
        className={cn(
          "fixed max-w-screen bg-white dark:bg-neutral-700 left-1/2 -translate-x-1/2 z-20 px-4 py-2 lg:px-8 text-black",
          "transition-all duration-400",
          "hidden md:block",
          scrolled ? "rounded-xl shadow-xl" : "",
        )}
      >
        <div className={cn("max-w-full mx-auto flex items-center justify-between")}>
          <div>
            <a href='/' className={cn("flex gap-2")}>
              <Scale />
              <span className={cn("sm:text-lg md:text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500")}>JurisVeda</span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn("hidden md:flex items-center gap-4 lg:gap-8")}
          >
            <div className={cn('lg:space-x-2 md:gap-3 lg:gap-0 flex items-center cursor-pointer')}>
              <motion.div
                className={cn("h-7 w-14 rounded-2xl relative cursor-pointer overflow-hidden flex items-center" , theme === "dark" ? 'bg-neutral-500' : 'bg-amber-200')}
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
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.id}
                    href={link.path} 
                    className={cn(
                      "flex items-center md:gap-1 lg:gap-2 md:px-1 lg:px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200",
                      link.groupClass,
                      isActive 
                        ? "bg-blue-100 text-blue-600" 
                        : "text-gray-600 dark:text-white hover:text-blue-600 hover:bg-blue-100"
                    )}
                  >
                    <IconComponent 
                      className={cn(
                        'size-5 transition-colors duration-200',
                        isActive 
                          ? 'text-blue-600' 
                          : `text-gray-600 dark:text-white ${link.hoverClass}`
                      )}
                    />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
            <button onClick={toggleModal} className={cn("bg-blue-600 hover:bg-blue-700 text-white md:px-4 lg:px-6 py-2 rounded-lg transition-colors cursor-pointer")}>
              Subscribe
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <nav className={cn("fixed bg-neutral-100 dark:bg-neutral-800 top-0 left-0 right-0 z-20 px-6 py-2 lg:px-8 text-black md:hidden")}>
        <div className={cn("max-w-7xl mx-auto flex items-center justify-between")}>
          <a href='/' className={cn("flex items-center cursor-pointer")}>
            <div className={cn("flex gap-2")}>
              <Scale />
              <span className={cn("text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500")}>JurisVeda</span>
            </div>
          </a>
          <div className={cn("flex items-center")}>
            <motion.div
              className={cn("h-5 w-10 mx-1 rounded-2xl relative cursor-pointer overflow-hidden flex items-center" , theme === "dark" ? 'bg-neutral-500' : 'bg-amber-200')}
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
            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={cn("md:hidden text-white mx-1")}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className={cn("w-6 h-6 text-black dark:text-white cursor-pointer")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn("md:hidden absolute top-full left-0 right-0 bg-slate-800 border-t border-slate-700")}
          >
            <div className={cn("px-6 py-4 space-y-4")}>
              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.path} 
                  className={cn(
                    "block transition-colors",
                    pathname === link.path 
                      ? "text-blue-400 font-semibold" 
                      : "text-white hover:text-blue-400"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <button onClick={toggleModal} className={cn("w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer")}>
                Subscribe
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  )
}
