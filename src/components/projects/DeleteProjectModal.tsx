import type { Project } from "@/types/project";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useDeleteProject } from "@/services/project/mutations";
import { useAuth } from "@/context/AuthContext";




// Delete Project props type
interface DeleteProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}





export function DeleteProjectModal({ project, isOpen, onClose }: DeleteProjectModalProps) {



  // Check if project exists
  if (!project) return null;



  // Get auth context
  const { getToken } = useAuth();



  // Mutation hook for deleting a project
  const { mutate: deleteProject , isPending } = useDeleteProject();



  // Function to handle project deletion
  const handleDelete = () => {

    deleteProject({ id: project.unique_id, token: getToken() }, {

      onSuccess: () => {

        onClose();

      }

    });

  }



  return (


    <AlertDialog open={isOpen} onOpenChange={onClose}>


      <AlertDialogContent className="border border-destructive/20">


        <AlertDialogHeader>


          <div className="flex items-center gap-3">

            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>


            <div>
              <AlertDialogTitle className="text-xl">Delete Project</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                This action cannot be undone.
              </AlertDialogDescription>
            </div>

          </div>


        </AlertDialogHeader>



        <div className="my-4 p-4 bg-muted/50 rounded-lg border border-border/50">
          <p className="text-sm text-muted-foreground mb-2">You are about to delete:</p>
          <div className="space-y-1">
            <p className="font-semibold">{project?.project_name}</p>
            <p className="text-sm text-muted-foreground">Client: {project?.client_name}</p>
            <p className="text-sm text-muted-foreground">Project ID: {project.unique_id}</p>
          </div>
        </div>


        <AlertDialogDescription className="text-sm text-muted-foreground">
          This will permanently delete the project and all associated data including:
        </AlertDialogDescription>


        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
          <li>Project details and timeline</li>
          <li>Client information</li>
          <li>Development history</li>
          <li>Domain and server records</li>
          <li>All project metrics</li>
        </ul>


        <AlertDialogFooter className="gap-2 pt-4">

          <AlertDialogCancel onClick={onClose} disabled={isPending} className="hover:cursor-pointer">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 text-destructive-foreground hover:bg-red-600/90 hover:cursor-pointer active:bg-red-700 transition-colors"
          >
            Delete Project  {isPending ? <Loader2 className="animate-spin duration-100 h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
          </AlertDialogAction>

        </AlertDialogFooter>


      </AlertDialogContent>


    </AlertDialog>

  );

}