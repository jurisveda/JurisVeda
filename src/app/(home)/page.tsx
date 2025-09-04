'use client'

import Hero from '@/components/client/Hero'
import Offerings from '@/components/client/Offerings'
import Contact from '@/components/client/Contact'
import Footer from '@/components/client/Footer'
import Subscribe from '@/components/client/SubscribeCard'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Offerings />
      <Subscribe/>
      <Contact />
      <Footer />
    </main>
  )
}
