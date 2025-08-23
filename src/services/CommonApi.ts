import axios from "axios";


export const CommonApi = async (reqmethod: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", apiurl: string, reqbody: any, headers: object) => {

    
    const config = {
        method: reqmethod,
        url: apiurl,
        data: reqbody,
        headers: headers ? headers : { 'Content-Type': 'application/json' }
    }


    try {

        const res = await axios(config);
        return res.data;

    } catch (err: any) {

        if (err.response) {

            throw {
                status: err.response.status,
                message: err.response.data?.message || "Something went wrong",
                data: err.response.data,
            };
        
        }

        throw { status: 0, message: err.message || "Network Error" };
    }

}