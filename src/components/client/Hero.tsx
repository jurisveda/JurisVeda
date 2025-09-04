'use client'

import { motion } from 'motion/react'
import { cn } from "@/lib/utils"
import Navbar from './Navbar'
import Blur from './Blur'
import { useEffect, useState } from 'react'
import { useSubscriptionStore } from '@/lib/store'

export default function Hero() {
  const toggleModal = useSubscriptionStore((s)=>s.toggleModal)

// from-slate-900 via-blue-900 to-slate-900
  return (
    <section className={cn("min-h-screen relative flex flex-col justify-center items-center overflow-hidden bg-blue-200 dark:bg-neutral-800")}>
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
      </div> */}
      <div className={cn("relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32 flex flex-col justify-center items-center gap-10")}>
        <div className={cn("text-center")}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={cn("text-4xl md:text-6xl font-extrabold dark:text-white text-black/70 leading-tight")}
          >
            Your <span className={cn('text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 mx-3')}>One-Stop</span> Legal Resource Hub
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn("max-w-4xl mx-auto mt-6 text-lg dark:text-white/60 text-black/60")}
          >
            Juris Veda is your essential legal companion, simplifying complex topics with expertly curated notes, landmark case laws, and vital current affairs for students and professionals alike.
          </motion.p>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={cn("flex flex-col sm:flex-row gap-4 justify-center items-center")}
          >
            <button onClick={toggleModal} className={cn("bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 cursor-pointer")}>
              Start Your Legal Journey
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className={cn("absolute bottom-12 left-1/2 transform -translate-x-1/2")}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={cn("w-6 h-10 border-2 border-white rounded-full flex justify-center")}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={cn("w-1 h-3 bg-white rounded-full mt-2")}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
