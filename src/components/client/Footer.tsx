'use client'

import { motion } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import { Book, Cash, Home, Location, Mail, NewsPaper, Instagram, LinkedIn, X, Youtube, Scale } from '../svgProvider'
import { useSubscriptionStore } from '@/lib/store'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [footerOpacity, setFooterOpacity] = useState(1)
  const footerRef = useRef<HTMLElement>(null)
  const toggleModal = useSubscriptionStore((s)=>s.toggleModal)

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        const navbarHeight = 80
        const fadeStart = navbarHeight
        const fadeEnd = navbarHeight + 100
        
        if (rect.bottom < fadeStart) {
          setFooterOpacity(0)
        } else if (rect.bottom > fadeEnd) {
          setFooterOpacity(1)
        } else {
          const progress = (rect.bottom - fadeStart) / (fadeEnd - fadeStart)
          setFooterOpacity(Math.max(0, Math.min(1, progress)))
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer ref={footerRef} className={cn("bg-slate-900 text-white")}>
      <div 
        className={cn("max-w-7xl mx-auto px-6 lg:px-8 py-4")}
        style={{
          opacity: footerOpacity,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4")}>
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn("lg:col-span-1")}
          >
            <a href='/' className={cn("text-2xl font-bold mb-4 flex items-center gap-2")}>
              <Scale/>
              <span>JurisVeda</span>
            </a>
            <p className={cn("text-gray-300 mb-6 leading-relaxed")}>
            Your trusted legal companion. We're dedicated to demystifying the law, offering reliable notes, landmark judgments,
            and timely updates to empower the legal minds of tomorrow.
            </p>
          </motion.div>

    
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='ml-5'
          >
            <h4 className={cn("text-lg font-semibold mb-6")}>Quick Links</h4>
            <ul className={cn("space-y-3")}>
              <li>
                <a href="#about" className={cn("flex gap-2 text-gray-300 group hover:text-blue-400 transition-colors")}>
                  <Book className='text-gray-500 size-5 group-hover:text-blue-400'/><span>Law Notes</span>
                </a>
              </li>
              <li>
                <a href="#team" className={cn("flex gap-2 text-gray-300 group hover:text-blue-400 transition-colors")}>
                  <Cash className='text-gray-500 size-5 group-hover:text-blue-400'/><span>Case Laws</span>
                </a>
              </li>
              <li>
                <a href="#contact" className={cn("flex gap-2 text-gray-300 group hover:text-blue-400 transition-colors")}>
                  <NewsPaper className='text-gray-500 size-5 group-hover:text-blue-400'/><span>Current Affairs</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className={cn("text-lg font-semibold mb-6")}>Stay Connected</h4>
            <ul className={cn("space-y-3 flex gap-5")}>
              <li><a href="https://www.instagram.com/jurisveda?igsh=OXcxNzE4dGJpbXFt" className={cn("text-gray-300 hover:text-blue-400 transition-colors")}><Instagram/></a></li>
              <li><a href="https://www.linkedin.com/company/juris-veda/" className={cn("text-gray-300 hover:text-blue-400 transition-colors")}><LinkedIn/></a></li>
              <li><a href="https://x.com/JurisVeda?t=WlUMXDIYFbUBhC4JTglM6w&s=08" className={cn("text-gray-300 hover:text-blue-400 transition-colors")}><X/></a></li>
              <li><a href="https://www.youtube.com/@JurisVeda" className={cn("text-gray-300 hover:text-blue-400 transition-colors")}><Youtube/></a></li>
            </ul>
            <h4 className={cn("text-lg font-semibold mb-6 mt-4")}>Contact Us</h4>
            <ul className={cn("space-y-3 flex flex-col gap-2")}>
              <li><a href="mailto:jurisveda16@gmail.com" className={cn("text-gray-300 hover:text-blue-400 group transition-colors flex justify-start items-center md:gap-2")}><Mail className='group-hover:text-blue-400'/><span className={cn("ml-2 md:ml-0")}>jurisveda16@gmail.com</span></a></li>
              <li className={cn("text-gray-300 flex gap-2")}><Location/><span>Lucknow, India</span></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className={cn("text-lg font-semibold mb-6")}>Join Our Newsletter</h4>
            <div className={cn("space-y-4")}>
                <div>
                  <p className={cn("text-gray-300")}>Get the latest legal insights, notes, and updates delivered directly to your inbox.</p>
                </div>
                <button onClick={toggleModal} className={cn("bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors w-full text-lg")}>
                  Subscribe
                </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={cn("border-t border-gray-800 mt-12 pt-8 flex justify-center")}
        >
          <div className={cn("text-gray-400 text-sm")}>
            © {currentYear} JurisVeda Legal Services. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
