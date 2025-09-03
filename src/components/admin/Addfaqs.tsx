"use client"
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ParamValue } from "next/dist/server/request/params";

interface AddFAQComponentProps {
  section: string,
  id: ParamValue
}

export default function AddFAQComponent({
  section,id
}: AddFAQComponentProps) {
  const [questions, setQuestions] = useState<string[]>([""]);
  const [answers, setAnswers] = useState<string[]>([""]);
  const [saving, setSaving] = useState(false);
  const router = useRouter()

  const faqCount = Math.max(questions.length, answers.length);

  const addFAQ = () => {
    setQuestions(prev => [...prev, ""]);
    setAnswers(prev => [...prev, ""]);
  };

  const removeFAQ = (index: number) => {
    if (faqCount <= 1) {
      setQuestions([""]);
      setAnswers([""]);
    } else {
      setQuestions(prev => prev.filter((_, i) => i !== index));
      setAnswers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, value: string) => {
    setQuestions(prev => {
      const newQuestions = [...prev];
      newQuestions[index] = value;
      return newQuestions;
    });
  };

  const updateAnswer = (index: number, value: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = value;
      return newAnswers;
    });
  };

  const handleSave = async () => {
    setSaving(true);
   
    const validQuestions: string[] = [];
    const validAnswers: string[] = [];
    
    for (let i = 0; i < faqCount; i++) {
      const question = questions[i]?.trim();
      const answer = answers[i]?.trim();
      
      if (question && answer) {
        validQuestions.push(question);
        validAnswers.push(answer);
      }
    }

    try { 
      const res = await fetch(`/api/content/${section}/faqs/add/${id}`,{
        method: 'POST',
        body: JSON.stringify({
          questions: validQuestions,
          answers : validAnswers
        })
      })

      console.log(res)
      if(!res.ok){
        throw new Error();
      }
      

      setQuestions([""]);
      setAnswers([""]);
      toast.success("Uploaded !")
    } catch (error) {
      toast.error("Error saving")
      console.error('Error saving FAQs:', error);
    } finally {
      setSaving(false);
      router.push(`/admin/${section}`)
    }
  };

  const clearAll = () => {
    setQuestions([""]);
    setAnswers([""]);
  };

  return (
    <div className={cn("w-full flex-1 flex flex-col justify-center max-w-4xl mx-auto px-2 pt-12 md:pt-20 space-y-6")}>
      <Card>
        <CardHeader>
          <CardTitle className={cn("text-2xl md:text-3xl font-bold text-neutral-900")}>
            Add New FAQs
          </CardTitle>
          <p className={cn("text-sm text-neutral-600 dark:text-neutral-400")}>
            Create new frequently asked questions.
          </p>
        </CardHeader>
      </Card>

      <div className={cn("space-y-4")}>
        {Array.from({ length: faqCount }).map((_, index) => (
          <Card key={index}>
            <CardHeader className={cn("pb-3")}>
              <div className={cn("flex items-center justify-between")}>
                <CardTitle className={cn("text-lg font-semibold")}>
                  FAQ #{index + 1}
                </CardTitle>
                {faqCount > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFAQ(index)}
                    className={cn("text-red-600 hover:text-red-700 hover:bg-red-50")}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </CardHeader>
            
            <CardContent className={cn("space-y-4")}>
              <div className={cn("space-y-2")}>
                <Label className={cn("text-sm font-medium")}>Question</Label>
                <Input
                  value={questions[index] || ""}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  placeholder="Enter your question here..."
                  className={cn("w-full")}
                />
              </div>

              <div className={cn("space-y-2")}>
                <Label className={cn("text-sm font-medium")}>Answer</Label>
                <Textarea
                  value={answers[index] || ""}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                  placeholder="Enter the answer here..."
                  rows={4}
                  className={cn("w-full resize-none")}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={cn("flex flex-col sm:flex-row gap-3 justify-between items-center")}>
        <Button
          onClick={addFAQ}
          variant="outline"
          className={cn("flex items-center gap-2 w-full sm:w-auto")}
        >
          <Plus className={cn("w-4 h-4")} />
          Add Another FAQ
        </Button>

        <div className={cn("flex flex-col sm:flex-row gap-3 w-full sm:w-auto")}>
          <Button
            onClick={clearAll}
            variant="outline"
            className={cn("w-full sm:w-auto")}
          >
            Clear All
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={saving}
            className={cn("flex items-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700")}
          >
            {saving ? (
              <>
                <div className={cn("w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin")} />
                Adding...
              </>
            ) : (
              <>
                <Save className={cn("w-4 h-4")} />
                Add FAQs
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
