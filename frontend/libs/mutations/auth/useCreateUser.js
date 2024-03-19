import api from "@/pages/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const useCreateUser = () => {
  const router = useRouter()
  const createUser = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/users/signup",data);
      return res?.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push("/login")
    },
    onError: (err) => {
    
      toast.error(err?.response?.data?.message);
    },
  });
  return createUser;
};

export default useCreateUser;
