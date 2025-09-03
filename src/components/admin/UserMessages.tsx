import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface UserMessage {
  id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
//   status: 'unread' | 'read';
}

export default function MessageComp(){
    const [userMessages, setUserMessages] = useState<UserMessage[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        async function getUserMessages(){
          try{
            const res = await fetch("/api/message")
            if(!res.ok){
                throw new Error();
            }
            const resJSON = await res.json()
            // console.log(res)
            // console.log(resJSON.data)
            setUserMessages(resJSON.data)
          }catch(error){
            toast.error("Error loading messages !")
            console.log("Error fetching messages: ", error);
          }finally{
            setLoading(false)
          }
        }
        getUserMessages();
      }, []);

    return(
        <Card className="lg:col-span-1 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
            <CardHeader className="flex items-center justify-between dark:border-neutral-700">
                <CardTitle className="flex items-center gap-2 dark:text-white">
                <MessageSquare className="h-5 w-5 dark:text-neutral-300" />
                User Messages
                </CardTitle>
                {/* {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-auto dark:bg-red-600 dark:text-white">
                    {unreadCount} new
                </Badge>
                )} */}
            </CardHeader>
            <CardContent className="p-0">
                {/* did opacity-0 on the scrollbar comp inside scrollarea */}
                <ScrollArea className="h-[350px] dark:bg-neutral-800">
                    {loading ? <MessagesSkeleton/> :
                        userMessages.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground dark:text-neutral-400">
                            No messages yet
                            </div>
                        ) : (
                            <div className="space-y-1 p-4">
                                {userMessages.map((message) => (
                                    <div
                                    key={message.id}
                                    className={cn(
                                        "rounded-lg p-3 space-y-2 transition-colors",
                                        // message.status === 'unread' ?
                                        "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-700" 
                                        //   : "bg-gray-50 border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600"
                                    )}
                                    >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-sm dark:text-white">{message.fullName}</span>
                                        {/* {message.status === 'unread' && (
                                        <Badge variant="secondary" className="text-xs dark:bg-blue-600 dark:text-white">New</Badge>
                                        )} */}
                                    </div>
                                    {/* line-clamp-2 */}
                                    <p className="text-sm text-muted-foreground dark:text-neutral-300">
                                        {message.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground dark:text-neutral-400">
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </p>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </ScrollArea>
            </CardContent>
          </Card>
    )
}

function MessagesSkeleton() {
  return (
    <div className="space-y-1 p-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-lg p-3 space-y-2 bg-gray-50 border border-gray-200 dark:bg-neutral-700 dark:border-neutral-600"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-neutral-600" />
            {/* <Skeleton className="h-5 w-8 rounded-full bg-gray-200 dark:bg-neutral-600" /> */}
          </div>
          
          <Skeleton className="h-4 w-full bg-gray-200 dark:bg-neutral-600" />
          <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-neutral-600" />
          
          <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-neutral-600" />
        </div>
      ))}
    </div>
  );
}
