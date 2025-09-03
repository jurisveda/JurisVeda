"use client"
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditFAQComponentProps {
  existingQuestions: string[];
  existingAnswers: string[];
  id: string|null,
  section: string
}

export default function EditFAQComponent({
  existingQuestions,
  existingAnswers,
  id,
  section
}: EditFAQComponentProps) {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const router = useRouter()

  useEffect(() => {
    setQuestions(existingQuestions);
    setAnswers(existingAnswers);
  }, [existingQuestions, existingAnswers]);

  const faqCount = Math.max(questions.length, answers.length);

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
      if(!id){
        throw new Error()
      }
      const res = await fetch(`/api/content/${section}/faqs/update/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
          questions:validQuestions,
          answers: validAnswers
        })
      })

      if(!res.ok){
        throw new Error();
      }
      toast.success("Updated !")
    } catch (error) {
      toast.error("Error updating , try after some time")
      console.error('Error updating FAQs:', error);
    } finally {
      setSaving(false);
      router.push(`/admin/${section}`)
    }
  };

  const resetChanges = () => {
    setQuestions(existingQuestions);
    setAnswers(existingAnswers);
  };

  return (
    <div className={cn("w-full flex-1 flex flex-col justify-center max-w-4xl mx-auto px-2 pt-12 md:pt-20 space-y-6")}>
      <Card>
        <CardHeader>
          <CardTitle className={cn("text-2xl md:text-3xl font-bold text-neutral-900")}>
            Edit FAQs
          </CardTitle>
          <p className={cn("text-sm text-neutral-600 dark:text-neutral-400")}>
            Edit existing frequently asked questions.
          </p>
        </CardHeader>
      </Card>

      <div className={cn("space-y-4")}>
        {Array.from({ length: faqCount }).map((_, index) => (
          <Card key={index}>
            <CardHeader className={cn("pb-3")}>
              <CardTitle className={cn("text-lg font-semibold")}>
                FAQ #{index + 1}
              </CardTitle>
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

      <div className={cn("flex flex-col sm:flex-row gap-3 justify-center items-center")}>
        <Button
          onClick={resetChanges}
          variant="outline"
          className={cn("w-full sm:w-auto cursor-pointer")}
        >
          Reset Changes
        </Button>
        
        <Button
          onClick={handleSave}
          disabled={saving}
          className={cn("flex items-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 cursor-pointer")}
        >
          {saving ? (
            <>
              <div className={cn("w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin")} />
              Updating...
            </>
          ) : (
            <>
              <Save className={cn("w-4 h-4")} />
              Update FAQs
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
