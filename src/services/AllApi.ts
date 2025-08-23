import { CommonApi } from "./CommonApi"


// Base URL
const Base_Url = "http://localhost:8000/api/extechnology"



// User API Login
export const Login = async (data: FormData) => {

    return await CommonApi("POST", `${Base_Url}/api/token/`, data, {});

}



// Add Project API
export const AddProject = async (data: FormData, headers: object) => {

    return await CommonApi("POST", `${Base_Url}/client/`, data, headers)

}



// Get Project API
export const GetProject = async (headers: object) => {

    return await CommonApi("GET", `${Base_Url}/client/project-filters/`, "", headers)

}