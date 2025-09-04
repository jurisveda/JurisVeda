'use client'
import { ArrowRight, Edit, Eye, Trash2 } from "lucide-react"
import { Book, Cash, NewsPaper } from '@/components/SvgProvider'
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    icon: <Book className="h-6 w-6"/>,
    title: "Law Notes",
    href: "/admin/lawnotes",
    description: "Manage comprehensive legal notes for academic success and competitive exams.",
    color: "border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100",
    iconBg: "bg-white",
    textColor: "text-blue-700"
  },
  {
    icon: <Cash className="h-6 w-6"/>,
    title: "Case Laws",
    href: "/admin/caselaws", 
    description: "Oversee case law database including landmark judgments and legal precedents.",
    color: "border-green-200 hover:border-green-300 bg-gradient-to-br from-green-50 to-green-100",
    iconBg: "bg-white",
    textColor: "text-green-700"
  },
  {
    icon: <NewsPaper className="h-6 w-6"/>,
    title: "Current Affairs",
    href: "/admin/currentaffairs",
    description: "Update and maintain current affairs content for legal and competitive exam preparation.",
    color: "border-orange-200 hover:border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100", 
    iconBg: "bg-white",
    textColor: "text-orange-700"
  }
]

export default function Contents() {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6")}>
      {services.map((service, index) => (
        <Card key={service.title} className={cn("border-2 transition-all duration-300 hover:shadow-lg dark:bg-neutral-800 dark:border-neutral-600", service.color)}>
          <CardHeader className="text-center pb-4 dark:border-neutral-700">
            <div className={cn("mx-auto w-14 h-14 rounded-full flex items-center justify-center text-white", service.iconBg)}>
              {service.icon}
            </div>
            <CardTitle className={cn("text-xl", service.textColor)}>
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground dark:text-neutral-600 text-center leading-relaxed">
              {service.description}
            </p>
            
            <div className="space-y-2">
              <Button 
                asChild 
                className="w-full dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white dark:border-neutral-600" 
                variant="default"
              >
                <a href={service.href} className="flex items-center justify-center gap-2">
                  <Edit className="h-4 w-4" />
                  Manage Content
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
