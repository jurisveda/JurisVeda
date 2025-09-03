"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Interface for FAQ data structure
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Sample FAQ data - replace this with your actual DB call
const sampleFAQData: FAQItem[] = [
  {
    id: "1",
    question: "What is React and why should I use it?",
    answer: "React is a popular JavaScript library for building user interfaces. It's component-based, has excellent performance with virtual DOM, and has a large ecosystem with great community support."
  },
  {
    id: "2", 
    question: "How do I handle state management in React?",
    answer: "React provides several options for state management including useState for local state, useContext for sharing state across components, and external libraries like Redux or Zustand for complex applications."
  },
  {
    id: "3",
    question: "What are React Hooks and when should I use them?",
    answer: "React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, and useReducer. They provide a more direct way to use React features."
  },
  {
    id: "4",
    question: "How can I optimize React application performance?",
    answer: "Performance can be optimized through techniques like code splitting, lazy loading, memoization with React.memo, using useMemo and useCallback hooks, and implementing proper key props in lists."
  },
  {
    id: "5",
    question: "What's the difference between controlled and uncontrolled components?",
    answer: "Controlled components have their state controlled by React through props and event handlers, while uncontrolled components maintain their own internal state. Controlled components provide better data flow and validation."
  }
];

// Main FAQ Container Component
export default function FAQComponent({ 
  faqs = sampleFAQData,
  title = "Frequently Asked Questions"
}: {
  faqs?: FAQItem[];
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-4xl mx-auto px-3 py-4 sm:p-6 lg:p-8")}>
      {/* Single Collapsible FAQ Section */}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn(
          "border border-neutral-200 dark:border-neutral-700",
          "rounded-md xs:rounded-lg bg-white dark:bg-neutral-800", 
          "shadow-sm hover:shadow-md transition-shadow duration-200",
          "overflow-hidden"
        )}
      >
        {/* FAQ Section Header/Trigger */}
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full p-4 xs:p-5 sm:p-6 md:p-8",
              "flex justify-between items-center text-left",
              "hover:bg-neutral-50 dark:hover:bg-neutral-700/50",
              "transition-colors duration-200 rounded-none",
              "focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
              "dark:focus:ring-offset-neutral-800",
              "min-h-[70px] xs:min-h-[80px]"
            )}
          >
            {/* Title */}
            <div className={cn("flex-1 text-center")}>
              <h1 className={cn(
                "text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold",
                "text-neutral-900 dark:text-white"
              )}>
                {title}
              </h1>
            </div>
            
            {/* Chevron Icon */}
            <div className={cn("flex-shrink-0 ml-4")}>
              <ChevronDown
                className={cn(
                  "w-5 h-5 xs:w-6 xs:h-6 text-neutral-500 dark:text-neutral-400",
                  "transition-transform duration-200 ease-in-out",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </Button>
        </CollapsibleTrigger>

        {/* FAQ Content */}
        <CollapsibleContent
          className={cn(
            "border-t border-neutral-100 dark:border-neutral-600",
            "animate-in slide-in-from-top-1 duration-300 ease-in-out"
          )}
        >
          <div className={cn("p-4 xs:p-5 sm:p-6 space-y-4 sm:space-y-6")}>
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <FAQItem key={faq.id} faq={faq} index={index} />
              ))
            ) : (
              <div className={cn("text-center py-8")}>
                <p className={cn("text-sm sm:text-base text-neutral-500 dark:text-neutral-400")}>
                  No FAQs available at the moment.
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// Individual FAQ Item Component (now always expanded when parent is open)
function FAQItem({ faq, index }: { faq: FAQItem; index: number }) {
  return (
    <div className={cn(
      "border-b border-neutral-100 dark:border-neutral-700 last:border-b-0",
      "pb-4 sm:pb-6 last:pb-0"
    )}>
      {/* Question */}
      <div className={cn("mb-3 sm:mb-4")}>
        <h3 className={cn(
          "text-sm xs:text-base sm:text-lg font-semibold",
          "text-neutral-900 dark:text-white",
          "leading-snug xs:leading-normal sm:leading-relaxed",
          "break-words word-wrap",
          "flex items-start gap-3"
        )}>
          {/* Question Number */}
          <span className={cn(
            "flex-shrink-0 w-6 h-6 xs:w-7 xs:h-7 rounded-full",
            "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
            "flex items-center justify-center text-xs xs:text-sm font-bold",
            "mt-0.5"
          )}>
            {index + 1}
          </span>
          
          {/* Question Text */}
          <span className={cn("flex-1 min-w-0")}>
            {faq.question}
          </span>
        </h3>
      </div>

      {/* Answer */}
      <div className={cn("ml-9 xs:ml-10")}>
        <p className={cn(
          "text-xs xs:text-sm sm:text-base text-neutral-700 dark:text-neutral-300",
          "leading-relaxed break-words word-wrap",
          "whitespace-normal"
        )}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

// More compact single-button FAQ version
export function CompactFAQComponent({ 
  faqs = sampleFAQData,
  title = "Frequently Asked Questions"
}: {
  faqs?: FAQItem[];
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-3xl mx-auto")}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full p-4 justify-between items-center",
              "text-base sm:text-lg font-semibold",
              "hover:bg-neutral-50 dark:hover:bg-neutral-800",
              "border-2 border-dashed border-neutral-300 dark:border-neutral-600"
            )}
          >
            <span>{title}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className={cn("mt-4")}>
          <div className={cn(
            "bg-white dark:bg-neutral-800 rounded-lg border",
            "border-neutral-200 dark:border-neutral-700 p-4 space-y-4"
          )}>
            {faqs.map((faq, index) => (
              <div key={faq.id} className={cn("space-y-2")}>
                <h4 className={cn("font-medium text-neutral-900 dark:text-white")}>
                  {index + 1}. {faq.question}
                </h4>
                <p className={cn("text-sm text-neutral-600 dark:text-neutral-400 pl-4")}>
                  {faq.answer}
                </p>
                {index < faqs.length - 1 && (
                  <hr className={cn("border-neutral-200 dark:border-neutral-700")} />
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// More compact single-button FAQ version
export function CompactFAQComponentSecond({ 
  faqs = sampleFAQData,
  title = "Frequently Asked Questions"
}: {
  faqs?: FAQItem[];
  title?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-3xl mx-auto")}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full p-3 xs:p-4 justify-between items-center",
              "text-sm xs:text-base sm:text-lg font-semibold",
              "hover:bg-neutral-50 dark:hover:bg-neutral-800",
              "border-2 border-dashed border-neutral-300 dark:border-neutral-600",
              "min-h-[50px] xs:min-h-[56px] sm:min-h-[60px]" // Ensure adequate touch targets
            )}
          >
            {/* Responsive title - shows "FAQs" on mobile, full title on larger screens */}
            <span className={cn("block")}>
              <span className={cn("sm:hidden")}>FAQs</span>
              <span className={cn("hidden sm:block")}>{title}</span>
            </span>
            
            <ChevronDown
              className={cn(
                "w-4 h-4 xs:w-5 xs:h-5 transition-transform duration-200 flex-shrink-0",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className={cn("mt-3 xs:mt-4")}>
          <div className={cn(
            "bg-white dark:bg-neutral-800 rounded-lg border",
            "border-neutral-200 dark:border-neutral-700", 
            "p-3 xs:p-4 sm:p-5 space-y-3 xs:space-y-4"
          )}>
            {faqs.map((faq, index) => (
              <div key={faq.id} className={cn("space-y-2 xs:space-y-3")}>
                <h4 className={cn(
                  "font-medium text-neutral-900 dark:text-white",
                  "text-sm xs:text-base leading-snug xs:leading-normal",
                  "break-words word-wrap" // Better text wrapping
                )}>
                  {index + 1}. {faq.question}
                </h4>
                <p className={cn(
                  "text-xs xs:text-sm text-neutral-600 dark:text-neutral-400", 
                  "pl-3 xs:pl-4 leading-relaxed",
                  "break-words word-wrap" // Better text wrapping for answers too
                )}>
                  {faq.answer}
                </p>
                {index < faqs.length - 1 && (
                  <hr className={cn("border-neutral-200 dark:border-neutral-700 my-3 xs:my-4")} />
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// Ultra-responsive FAQ component with smart text handling
export function ResponsiveFAQComponent({ 
  faqs = sampleFAQData,
  title = "Frequently Asked Questions",
  shortTitle = "FAQs"
}: {
  faqs?: FAQItem[];
  title?: string;
  shortTitle?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-3xl mx-auto px-2 xs:px-3 sm:px-4")}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between items-center",
              "p-2 xs:p-3 sm:p-4", // Progressive padding
              "text-xs xs:text-sm sm:text-base md:text-lg font-semibold",
              "hover:bg-neutral-50 dark:hover:bg-neutral-800",
              "border-2 border-dashed border-neutral-300 dark:border-neutral-600",
              "min-h-[44px] xs:min-h-[50px] sm:min-h-[56px] md:min-h-[60px]",
              "transition-colors duration-200"
            )}
          >
            {/* Smart responsive title with breakpoints */}
            <span className={cn("block text-left leading-tight")}>
              {/* Extra small screens: "FAQs" */}
              <span className={cn("block xs:hidden")}>{shortTitle}</span>
              {/* Small screens and up: full title */}
              <span className={cn("hidden xs:block")}>{title}</span>
            </span>
            
            <ChevronDown
              className={cn(
                "transition-transform duration-200 flex-shrink-0 ml-2",
                "w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5", // Progressive icon sizing
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent 
          className={cn(
            "mt-2 xs:mt-3 sm:mt-4",
            "animate-in slide-in-from-top-1 duration-300 ease-out"
          )}
        >
          <div className={cn(
            "bg-white dark:bg-neutral-800 rounded-md xs:rounded-lg border",
            "border-neutral-200 dark:border-neutral-700 shadow-sm",
            "p-2 xs:p-3 sm:p-4 md:p-5",
            "space-y-2 xs:space-y-3 sm:space-y-4"
          )}>
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div key={faq.id} className={cn("space-y-1 xs:space-y-2")}>
                  {/* Question */}
                  <h4 className={cn(
                    "font-medium text-neutral-900 dark:text-white",
                    "text-xs xs:text-sm sm:text-base",
                    "leading-snug xs:leading-normal",
                    "break-words hyphens-auto", // Enhanced text wrapping
                    "flex items-start gap-2"
                  )}>
                    {/* Question number with responsive styling */}
                    <span className={cn(
                      "flex-shrink-0 text-xs font-bold",
                      "text-blue-600 dark:text-blue-400",
                      "mt-0.5"
                    )}>
                      {index + 1}.
                    </span>
                    <span className={cn("flex-1 min-w-0")}>
                      {faq.question}
                    </span>
                  </h4>
                  
                  {/* Answer */}
                  <p className={cn(
                    "text-neutral-600 dark:text-neutral-400",
                    "text-xs xs:text-sm leading-relaxed",
                    "pl-4 xs:pl-5 sm:pl-6", // Progressive indentation
                    "break-words hyphens-auto" // Enhanced text wrapping
                  )}>
                    {faq.answer}
                  </p>
                  
                  {/* Divider (not on last item) */}
                  {index < faqs.length - 1 && (
                    <hr className={cn(
                      "border-neutral-200 dark:border-neutral-700",
                      "my-2 xs:my-3 sm:my-4",
                      "border-dashed"
                    )} />
                  )}
                </div>
              ))
            ) : (
              <div className={cn("text-center py-4 xs:py-6 sm:py-8")}>
                <p className={cn(
                  "text-neutral-500 dark:text-neutral-400",
                  "text-xs xs:text-sm"
                )}>
                  No FAQs available at the moment.
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

