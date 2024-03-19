import api from "@/pages/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const useLogin = () => {
  const router = useRouter();
  const login = useMutation({
    mutationFn: async ({ formdata }) => {
      // console.log(formdata)
      const res = await api.post("/users/login", formdata);
      // console.log(res)
      return res?.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push("/admin");
      // localStorage.setItem("authorization",data?.token)
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return login;
};

export default useLogin;
