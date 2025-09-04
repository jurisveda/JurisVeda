'use client'
import { ArrowRight } from "lucide-react"
import { Book, Cash, NewsPaper } from '../SvgProvider'
import { cn } from "@/lib/utils"

const services = [
  {
    icon: <Book className=""/>,
    classes: "dark:bg-red-400/20 dark:hover:bg-red-400/40 bg-red-400/60 border border-2 border-red-400 hover:bg-red-400/70",
    title: "Law Notes",
    href: "/lawnotes",
    description: "In-depth notes covering a wide range of legal subjects, tailored for academic success and competitive exams.",
  },
  {
    icon: <Cash className=""/>,
    classes: "dark:bg-orange-400/20 dark:hover:bg-orange-400/40 bg-orange-400/60 border border-2 border-orange-400 hover:bg-orange-400/70",
    title: "Case Laws",
    href: "/caselaws",
    description: "Comprehensive guidance in property deals, development projects, leasing agreements, and expert real estate litigation services.",
  },
  {
    icon: <NewsPaper className=""/>,
    classes: "dark:bg-yellow-400/20 dark:hover:bg-yellow-400/40 bg-yellow-400/60 border border-2 border-yellow-400 hover:bg-yellow-400/70",
    title: "Current Affairs",
    href: "/currentaffairs",
    description: "Protecting your rights in the workplace with expert counsel on employment contracts, disputes, and compliance.",
  }
]

export default function Offerings() {
  
  return (
    <section className={cn("py-20 bg-white dark:bg-neutral-800")}>
      <div className={cn("flex flex-col justify-center items-center max-w-7xl mx-auto px-6 lg:px-8")}>
        <div className={cn("text-center mb-16")}>
          <h2 className={cn("text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6")}>
            Our Core Offerings
          </h2>
          <p className={cn("text-lg text-gray-600 dark:text-white max-w-3xl mx-auto")}>
            Master the intricacies of law with our meticulously organized resources, designed for clarity and retention.
          </p>
        </div>

        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8")}>
          {services.map((service, index) => (
            <a key={service.title} href={service.href} className={cn('block h-full')}>
              <div className={cn("rounded-2xl flex flex-col justify-around items-center group dark:shadow-none shadow-lg hover:shadow-2xl transition-all duration-300 border px-4 py-2 sm:px-6 min-w-[250px] h-85 sm:h-65 md:h-95 lg:h-85",service.classes)}>
                <div className={cn("flex flex-col items-center text-center")}>
                  <div className={cn("text-4xl mb-4 bg-white size-15 flex items-center justify-center rounded-full")}>{service.icon}</div>
                  <h3 className={cn("text-2xl font-bold text-white mb-4")}>{service.title}</h3>
                  <p className={cn("text-white  leading-relaxed flex-grow")}>{service.description}</p>
                </div>
                <div className={cn("flex text-blue-600/80 dark:text-white lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-700")}><span className="hidden sm:block">Explore Section</span><ArrowRight/></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
