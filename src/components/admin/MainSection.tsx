"use client"
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Contents from "./Content";
import StatsCard from "./Stats";
import MessageComp from "./UserMessages";
export default function MainSection(){

  return(
    <div className="flex-1 flex flex-col justify-center space-y-6 dark:text-white pt-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your content and user messages
        </p>
      </div>

      <StatsCard/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <MessageComp/>

        <Card className="lg:col-span-2 dark:bg-neutral-800 dark:text-white">
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage your published content across all categories
            </p>
          </CardHeader>
          <CardContent>
            <Contents />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


