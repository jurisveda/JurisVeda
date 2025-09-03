"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Activity, FileText, Newspaper, Scale } from "lucide-react";

export default function StatsCard(){
  const [countLaw, setLawNotes] = useState(0);
  const [countCase, setCaseLaws] = useState(0);
  const [countCurrent, setCurrentaffairs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCounts(){
      try{
        setIsLoading(true);
        const res = await fetch("/api/content");
        const resData = await res.json();
        if(!res.ok){
          toast.error("Can't load content statistics");
          console.log("Error: ", resData.error);
          return;
        }
        const {lawNotes, caseLaws, currentAffairs} = resData.data;
        setCaseLaws(caseLaws);
        setCurrentaffairs(currentAffairs);
        setLawNotes(lawNotes);
      }catch(error){
        toast.error("Can't load content statistics");
        console.log("Error fetching counts: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    getCounts();
  }, []);

  const totalContent = countLaw + countCase + countCurrent;

  const stats = [
    {
      title: "Law Notes",
      value: countLaw,
      icon: <FileText className="h-5 w-5" />,
      color: "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/20 dark:border-blue-800"
    },
    {
      title: "Case Laws", 
      value: countCase,
      icon: <Scale className="h-5 w-5" />,
      color: "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/20 dark:border-green-800"
    },
    {
      title: "Current Affairs",
      value: countCurrent,
      icon: <Newspaper className="h-5 w-5" />,
      color: "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950/20 dark:border-orange-800"
    },
    {
      title: "Total Content",
      value: totalContent,
      icon: <Activity className="h-5 w-5" />,
      color: "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/20 dark:border-purple-800"
    }
  ];

  if (isLoading) {
    return <StatsCardSkeleton />;
  }

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={cn("border-2 dark:bg-neutral-800 dark:border-neutral-700", stat.color)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 dark:border-neutral-700">
            <CardTitle className="text-sm font-medium dark:text-white">{stat.title}</CardTitle>
            <div className="dark:text-neutral-300">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StatsCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="border-2 border-gray-200 dark:border-neutral-700 dark:bg-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-neutral-600" />
            <Skeleton className="h-5 w-5 rounded bg-gray-200 dark:bg-neutral-600" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 bg-gray-200 dark:bg-neutral-600" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
