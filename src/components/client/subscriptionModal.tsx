'use client'

import { useState } from 'react'
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import { useSubscriptionStore } from '@/lib/store'
import { toast } from 'sonner'

export default function SubscriptionModal() {
  const { isModalOpen, closeModal } = useSubscriptionStore()
  const [fullName , setFullName] = useState<string|null>(null)
  const [email , setEmail] = useState<string|null>(null)
  const [phoneNumber , setPhoneNumber] = useState<string|null>(null)

  const formData = new FormData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!fullName || !email || !phoneNumber){
      toast.warning("There are some missing fields.")
      return
    }
    setIsSubmitting(true)
    
    try {
      formData.append("fullName" , fullName)
      formData.append("email" , email)
      formData.append("phone" , phoneNumber)
      const res = await fetch("/api/client/subscribe",{
        method: 'POST',
        body: formData
      })
      if(!res.ok){
        throw new Error("Some error occured while subscribing")
      }
      toast.success("Subscribed")
      closeModal()
    } catch (error) {
      toast.error("Failed to subscribe")
      console.error('Subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // console.log(!isModalOpen)
  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70"
        onClick={closeModal}
      />

      <Card className="relative z-10 w-full max-w-md mx-4 shadow-2xl border-2 border-border/20 dark:border-border/30">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeModal}
            className="absolute right-2 top-2 h-8 w-8 rounded-full hover:bg-muted cursor-pointer"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <CardTitle className="text-xl font-semibold text-center pr-8">
            Subscribe to our Newsletter
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName??""}
                onChange={(e) => {setFullName(e.target.value)}}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email??""}
                onChange={(e) => {setEmail(e.target.value)}}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber??""}
                onChange={(e) => {setPhoneNumber(e.target.value)}}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            
            <div className="flex pt-4">
              <Button
                type="submit"
                className="flex-1 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
