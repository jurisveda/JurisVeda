"use client"

import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection({questions,answers,length}:{questions: string[] , answers: string[] , length:number}) {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    const validFAQs = []
    for(let i=0; i<length; i++){
      validFAQs.push({question:questions[i],answer:answers[i]})
    }
    setFaqs(validFAQs);
    setLoading(false);
  },[])

  if (loading) {
    return (
      <section className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="border border-slate-200 dark:border-neutral-800">
                <CardHeader>
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3 hidden sm:block">
              <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Find answers to common questions about this article.
          </p>
        </div>

        {faqs.length > 0 && (
          <div className="mb-12">
            <Card className="border-slate-200 dark:border-neutral-800 shadow-sm dark:bg-neutral-600">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={"Lets see"}
                      className={`border-slate-200 dark:border-neutral-800 ${
                        index === faqs.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer">
                        <div className="flex items-start">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mr-3 mt-0.5">
                            Q{index + 1}
                          </span>
                          <span className="text-slate-900 dark:text-white font-medium">
                            {faq.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="pl-8">
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}

        {/* <Card className="mt-12 border-slate-200 dark:border-neutral-800 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <CardTitle className="text-xl text-slate-900 dark:text-white mb-2">
              Still have questions?
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300 mb-4">
              Can't find the answer you're looking for? Our support team is here to help.
            </CardDescription>
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors">
              Contact Support
            </button>
          </CardContent>
        </Card> */}
      </div>
    </section>
  )
}
