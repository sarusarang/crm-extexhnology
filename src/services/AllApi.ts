import { CommonApi } from "./CommonApi"


// Base URL
const Base_Url = "http://localhost:8000/api/"



// User API Login
export const Login = async (data: FormData) => {

    return await CommonApi("POST", `${Base_Url}token/`, data, {});

}


// Get Project API
export const GetProject = async (headers: object, search: string, filterDate: string, statusFilter: string, domainFilter: string, page: number) => {

    const params = new URLSearchParams({ search: search, approach_date: filterDate, status: statusFilter, domain_status: domainFilter, page: page.toString() });

    return await CommonApi("GET", `${Base_Url}client/project-filters/?${params}`, "", headers)

}




// Add Project API
export const AddProject = async (data: FormData, headers: object) => {

    return await CommonApi("POST", `${Base_Url}client/`, data, headers)

}



// Delete Project API
export const DeleteProject = async (id: string, headers: object) => {

    const params = new URLSearchParams({ unique_id: id });

    return await CommonApi("DELETE", `${Base_Url}client/?${params}`, "", headers)

}