import { useMutation } from "@tanstack/react-query";
import { Login } from "../AllApi";
import { toast } from "sonner";
import type { AuthTokensResponse } from "@/types/project";



// User Login
export const useLogin = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await Login(data) as AuthTokensResponse;

        },

        onError: (error : any) => {

            if (error?.data?.detail) {
                return toast.error("Ops..!", {
                    description: error.data.detail,
                    duration: 5000
                });
            }
            toast.error("Ops..!", { description: "Something went wrong Please try again.", duration: 5000 })
            console.log("Login Error", error);
        }

    })

};