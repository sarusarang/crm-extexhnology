import { useQuery } from "@tanstack/react-query";
import { GetProject } from "../AllApi";
import type { PaginatedProjectsResponse } from "@/types/project";




export const useGetProjects = (token: string, search: string, filterDate: string, statusFilter: string, domainFilter : string, currentPage: number) => {


    return useQuery<PaginatedProjectsResponse>({

        queryKey: ["projects", token, search, filterDate, statusFilter, domainFilter, currentPage],
        queryFn: async () => {

            if (!token) throw new Error("Token not found");

            // Set the headers with the token
            const headers = { Authorization: `Bearer ${token}` };

           return await GetProject(headers , search, filterDate, statusFilter, domainFilter, currentPage) as PaginatedProjectsResponse;

        },
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,

    });


}