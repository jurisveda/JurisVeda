"use client"
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Edit, Trash2, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function ManageFAQComponent({section}:{section:string}) {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter()

  // Convert questions and answers arrays to FAQ objects
  const convertToFAQs = (questions: string[], answers: string[]): FAQ[] => {
    const faqList: FAQ[] = [];
    const maxLength = Math.max(questions.length, answers.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (questions[i] && answers[i]) {
        faqList.push({
          id: `${i}`,
          question: questions[i],
          answer: answers[i]
        });
      }
    }
    
    return faqList;
  };

  useEffect(()=>{
        async function fetchFaqs(){
            try {
                const res = await fetch(`/api/lawnotes/faqs/${id}`)
                const data = await res.json()
                if(!res.ok){
                    throw new Error()
                }
                const faqList = convertToFAQs(data.set.questions, data.set.answers);
            } catch (error) {
                toast.error("Unable to fetch faqs !")
                console.error("Some error occurred while fetching faqs: ",error)
            }
        }
        fetchFaqs()
    },[])


  // Load FAQs on component mount
  // const loadFAQs = async () => {
  //   try {
  //     setLoading(true);
  //     const { questions, answers } = await fetchFAQs();
  //     const faqList = convertToFAQs(questions, answers);
  //     setFaqs(faqList);
  //   } catch (error) {
  //     console.error('Error loading FAQs:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   loadFAQs();
  // }, []);

  // Refresh FAQs
  // const handleRefresh = async () => {
  //   setRefreshing(true);
  //   await loadFAQs();
  //   setRefreshing(false);
  // };

  // Handle edit button click
  const handleEditClick = (faq: FAQ, index: number) => {
    // Handle edit functionality
    console.log('Edit FAQ:', faq, 'at index:', index);
    // Navigate to edit page or open edit modal
  };

  // Handle delete button click
  const handleDeleteClick = async (faqId: string, index: number) => {
    try {
      // Handle delete functionality
      console.log('Delete FAQ:', faqId, 'at index:', index);
      // Show confirmation dialog and delete
      
      // Example API call for deletion:
      // const response = await fetch(`/api/faqs/${faqId}`, {
      //   method: 'DELETE'
      // });
      // 
      // if (response.ok) {
      //   // Remove from local state
      //   setFaqs(prev => prev.filter(faq => faq.id !== faqId));
      // }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  if (loading) {
    return (
      <div className={cn("w-full flex-1 flex flex-col justify-center max-w-6xl mx-auto px-2 pt-12 md:pt-20")}>
        <div className={cn("flex items-center justify-center h-64")}>
          <div className={cn("flex items-center gap-3 text-muted-foreground")}>
            <RefreshCw className={cn("w-6 h-6 animate-spin")} />
            <span className={cn("text-lg")}>Loading FAQs...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full flex-1 flex flex-col justify-center max-w-6xl mx-auto px-2 pt-12 md:pt-20 space-y-6")}>
      {/* Header */}
      {/* FAQ Cards */}
      {faqs.length === 0 ? (
        <Card className="bg-neutral-700 border-none">
          <CardContent className={cn("flex items-center justify-center h-48")}>
            <div className={cn("flex flex-col gap-2 text-center text-white")}>
              <p className={cn("text-lg font-medium")}>No FAQs found</p>
              <p className={cn("text-sm mt-1")}>Start by adding some frequently asked questions.</p>
              <Button
              onClick={() => router.push(`/admin/${section}/questions/add`)}
              className={cn("flex items-center gap-2 cursor-pointer")}
              >
              <Plus className={cn("w-4 h-4")} />
                Add FAQs
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4")}>
                <div>
                  <CardTitle className={cn("text-2xl font-bold text-foreground")}>
                    Manage FAQs
                  </CardTitle>
                  <p className={cn("text-sm text-muted-foreground mt-1")}>
                    View, edit, or delete frequently asked questions.
                  </p>
                </div>
                <div className={cn("flex items-center gap-2")}>
                  <Badge variant="secondary" className={cn("text-sm")}>
                    {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={handleRefresh}
                    disabled={refreshing}
                    className={cn("flex items-center gap-2")}
                  >
                    <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6")}>
            {faqs.map((faq, index) => (
              <Card key={faq.id} className={cn("h-fit hover:shadow-md transition-shadow duration-200")}>
                <CardHeader className={cn("pb-3")}>
                  <div className={cn("flex items-start justify-between gap-3")}>
                    <div className={cn("flex-1 min-w-0")}>
                      <div className={cn("flex items-center gap-2 mb-2")}>
                        <Badge variant="outline" className={cn("text-xs")}>
                          FAQ #{index + 1}
                        </Badge>
                      </div>
                      <CardTitle className={cn("text-base md:text-lg font-semibold text-foreground leading-snug")}>
                        {faq.question}
                      </CardTitle>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className={cn("flex items-center gap-1 flex-shrink-0")}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(faq, index)}
                        className={cn("h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950")}
                      >
                        <Edit className={cn("w-4 h-4")} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(faq.id, index)}
                        className={cn("h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950")}
                      >
                        <Trash2 className={cn("w-4 h-4")} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className={cn("pt-0")}>
                  <div className={cn("space-y-3")}>
                    <p className={cn("text-sm text-muted-foreground leading-relaxed")}>
                      {faq.answer}
                    </p>
                    
                    {/* Character count */}
                    <div className={cn("flex justify-between text-xs text-muted-foreground pt-2 border-t border-border")}>
                      <span>Q: {faq.question.length} chars</span>
                      <span>A: {faq.answer.length} chars</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Footer info */}
      {faqs.length > 0 && (
        <div className={cn("text-center py-4")}>
          <p className={cn("text-sm text-muted-foreground")}>
            Showing {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''} • 
            Click <Edit className={cn("w-3 h-3 inline mx-1")} /> to edit or <Trash2 className={cn("w-3 h-3 inline mx-1")} /> to delete
          </p>
        </div>
      )}
    </div>
  );
}
