import api from "@/pages/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


const useAddProductInWareHouse = ()=>{
    const query = useQueryClient()
    const mutate = useMutation({
        mutationFn : async(data)=>{
            const response = await api.post("/admin/add_product",data)
            return response?.data
        },onSuccess :(data)=>{
            toast.success(data?.message)
            query.invalidateQueries("/getAllUsers")
        },onError :(error)=>{
            toast.error(error?.response?.data?.message)
        }
    })
    return mutate;
}

export default useAddProductInWareHouse