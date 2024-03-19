import api from "@/pages/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateUser = ()=>{
    const query = useQueryClient()
    const mutate = useMutation({
        mutationFn : async({data,id})=>{
            const response = await api.patch(`/admin/updateUser/${id}`,data)
            return response?.data
        },onSuccess:(data)=>{
            toast.success(data?.message)
            query.invalidateQueries("/getAllUsers")
        },onError:(error)=>{
            toast.error(error?.response?.data?.message)
        }
    })
    return mutate;
}
export default useUpdateUser