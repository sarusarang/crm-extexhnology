import { useQuery } from "@tanstack/react-query";
import { GetProject } from "../AllApi";
import type { Project } from "@/types/project";




export const useGetProjects = (token: string, search: string, FilterDate: string, statusFilter: string, currentPage: number) => {


    return useQuery<Project[]>({

        queryKey: ["projects", token, search, FilterDate, statusFilter, currentPage],
        queryFn: async () => {

            if (!token) throw new Error("Token not found");

            // Set the headers with the token
            const headers = { Authorization: `Bearer ${token}` };

            const res = await GetProject(headers);

            return res.results as Project[];

        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,

    });


}