"use client"
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Edit, HelpCircle, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Notecard({ title, id, section }: { title: string; id: string; section: string }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/${section}/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    
    try {
      const deleteToast = toast.loading("Deleting")
      const response = await fetch(`/api/content/${section}/delete/${id}`, {
        method: "DELETE"
      });
      toast.dismiss(deleteToast)
      if (response.ok) {
        window.location.reload();
      } else {
        toast.error("Failed to delete the note. Please try again after sometimes.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the note.");
    }
  };

  const handleManageFAQs = () => {
    router.push(`/admin/${section}/questions/${id}`);
  };

  return (
    <div className={cn("bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200")}>
      <div className={cn("flex items-center justify-between p-4")}>
        <div className={cn("flex-1 min-w-0 mr-4")}>
          <h3 className={cn("text-sm md:text-base font-medium text-neutral-900 dark:text-white truncate")}>
            {title.length > 60 ? `${title.slice(0, 60)}...` : title}
          </h3>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn("p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full cursor-pointer")}
            >
              <MoreVertical className={cn("w-4 h-4 dark:text-white")} />
              {/* <span className={cn("sr-only")}>Open menu</span> */}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent
            className={cn("w-48 p-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg")}
            align="end"
          >
            <div className={cn("space-y-1")}>
              <Button
                variant="ghost"
                onClick={handleEdit}
                className={cn("w-full justify-start text-left hover:bg-neutral-100 dark:text-white dark:hover:text-white dark:hover:bg-neutral-700 cursor-pointer")}
                size="sm"
              >
                <Edit className={cn("w-4 h-4 mr-2")} />
                Edit
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleDelete}
                className={cn("w-full justify-start text-left text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:text-red-400 cursor-pointer")}
                size="sm"
              >
                <Trash2 className={cn("w-4 h-4 mr-2")} />
                Delete
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleManageFAQs}
                className={cn("w-full justify-start text-left hover:bg-neutral-100 dark:hover:text-white  dark:text-white dark:hover:bg-neutral-700 cursor-pointer")}
                size="sm"
              >
                <HelpCircle className={cn("w-4 h-4 mr-2")} />
                Manage FAQs
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}