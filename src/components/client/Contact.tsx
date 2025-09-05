'use client'

import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { toast } from 'sonner'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [contactOpacity, setContactOpacity] = useState(1)
  const contactRef = useRef<HTMLElement>(null)
  const [fullName , setFullName] = useState<string|null>(null)
  const [email , setEmail] = useState<string|null>(null)
  const [phone , setPhone] = useState<string|null>(null)
  const [message , setMessage] = useState<string|null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!fullName || !email || !message){
      toast.warning("Some required fields are missing !!")
      return;
    }

    try{
      const toastLoading = toast.loading("Sending...")
      const res = await fetch("/api/client/message",{
        method: 'POST',
        body: JSON.stringify({
          fullName,
          email,
          phone,
          message
        })
      })
      toast.dismiss(toastLoading)
      if(!res.ok){
        throw new Error("Some error occured")
      }
      toast.success("Done")
    }catch(error){
      toast.error("Unable to send message right now !!")
      console.error(error)
    }finally{
      setFullName(null)
      setEmail(null)
      setPhone(null)
      setMessage(null)
    }
  }

  return (
    <section id="contact" ref={contactRef} className={cn("py-20")}>
      <div 
        className={cn("max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center items-center")}
        style={{
          opacity: contactOpacity,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={cn("text-center mb-16")}
        >
          <h2 className={cn("text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6")}>
            Get In Touch
          </h2>
          <p className={cn("text-xl text-gray-600 dark:text-white max-w-3xl mx-auto")}>
            Message us about any additional legal resources or topics you'd like us to cover.
          </p>
        </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn(
              "bg-white dark:bg-neutral-800 rounded-2xl shadow-[0_0_20px_2px_#4A90E280] dark:shadow-[0_0_10px_2px_rgba(0,0,0,0.2)] p-8 max-w-7xl w-full"
            )}
          >
            <h3 className={cn("text-2xl font-bold text-slate-900 dark:text-white/90 mb-6 text-left md:text-center lg:text-start")}>
              Send us a Message
            </h3>
            <form
              onSubmit={handleSubmit}
              className={cn("space-y-6 w-full text-neutral-900")}
            >
              <div className="w-full">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message??""}
                  onChange={(e)=>{setMessage(e.target.value)}}
                  required
                  rows={6}
                  className="w-full dark:text-white px-4 py-3 border border-gray-300 placeholder:text-neutral-400 caret-neutral-900 dark:caret-white rounded-lg outline-0 transition-colors resize-none"
                  placeholder="Tell us about your legal needs..."
                />
              </div>
              <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 w-full")}>
                <div className="w-full">
                  <label htmlFor="name" className={cn("block text-sm font-medium text-gray-700 dark:text-white/90 mb-2")}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={fullName??""}
                    onChange={(e)=>{setFullName(e.target.value)}}
                    required
                    className={cn("w-full dark:text-white px-4 py-3 border border-gray-300 rounded-lg caret-neutral-900 dark:caret-white placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors")}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email??""}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
                    className="w-full px-4 dark:text-white py-3 border border-gray-300 rounded-lg caret-neutral-900 dark:caret-white focus:ring-2 placeholder:text-neutral-400 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phone" className="block text-sm dark:text-white/90 font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone??""}
                    onChange={(e)=>{setPhone(e.target.value)}}
                    className="w-full px-4 py-3 border dark:text-white border-gray-300 rounded-lg caret-neutral-900 dark:caret-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-neutral-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
      </div>
    </section>
  )
}
