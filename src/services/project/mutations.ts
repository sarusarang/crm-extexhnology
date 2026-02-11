import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddProject, DeleteProject } from "../AllApi";
import { toast } from "sonner";





// For adding a new project
export const useAddProject = () => {


    const queryClient = useQueryClient();


    return useMutation({

        mutationFn: async ({ data, token }: { data: FormData, token: string | null }) => {

            if (!token) throw new Error("Token not found");

            // Set the headers with the token
            const headers = { Authorization: `Bearer ${token}` };

            return await AddProject(data, headers);

        },
        onSuccess: () => {

            toast.success("Project Added Successfully", { description: "You have successfully Added Project", duration: 5000 })
            queryClient.invalidateQueries({ queryKey: ["projects"] });

        },
        onError: (error) => {

            console.error("Error adding project:", error);
            toast.error("Please try again.", { description: "Something went wrong Project Adding Failed", duration: 5000 });

        }

    })

}







// For Deleting a  project
export const useDeleteProject = () => {


    const queryClient = useQueryClient();


    return useMutation({

        mutationFn: async ({ id, token }: { id: string, token: string | null }) => {

            if (!token) throw new Error("Token not found");

            // Set the headers with the token
            const headers = { Authorization: `Bearer ${token}` };

            return await DeleteProject(id, headers);

        },
        onSuccess: () => {

            toast.success("Project Deleted Successfully", { description: "You have successfully Deleted Project", duration: 5000 })
            queryClient.invalidateQueries({ queryKey: ["projects"] });

        },
        onError: (error) => {

            console.error("Error Deleting project:", error);
            toast.error("Please try again.", { description: "Something went wrong Project Deleting Failed", duration: 5000 });

        }

    })

}