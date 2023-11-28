import { ArrowLeftFromLine } from "lucide-react";
import { Share } from "lucide-react";
import { FilePlus } from "lucide-react";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BtnBarProps {
  backFunc: () => void;
  createLoading: boolean;
  createBlog: () => void;
}

export const CreateBtnBar = ({
  backFunc,
  createBlog,
  createLoading,
}: BtnBarProps) => {
  return (
    <div className="flex flex-col gap-1 whitespace-nowrap w-fit">
      <button
        className="w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center"
        onClick={backFunc}
      >
        <ArrowLeftFromLine className="icon" />
      </button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center">
            <FilePlus className="icon" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create this blog?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-between">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {createLoading ? (
              <AlertDialogAction disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </AlertDialogAction>
            ) : (
              <AlertDialogAction onClick={createBlog}>Create</AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <button className="w-16 h-16 btn-bar hover:scale-[1.01] flex items-center justify-center">
        <Share className="icon" />
      </button>
    </div>
  );
};
