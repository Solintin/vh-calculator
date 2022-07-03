/* eslint-disable  */
import axios from "@/Utils/axios.config.js";
import Cookies from "js-cookie";


export const useRegister = (credentials, store, router) => {
 store.dispatch("setLoading", true);
  axios
    .post("/account/register/", credentials)
    .then((response) => {
      Cookies.set("token", response.data.token);
     store.dispatch("setUser", response.data);
     store.dispatch("setLoading", false);
     router.push("/admin/overview");
    })
    .catch((error) => {
     store.dispatch("setLoading", false);
      console.log(error);
    });
};

export const useLogin = (credentials, store, router) => {
 store.dispatch("setLoading", true);
  axios
    .post("/account/auth/", credentials)
    .then((response) => {
      Cookies.set("token", response.data.token);
     store.dispatch("setUser", response.data);
     store.dispatch("setLoading", false);
     router.push("/admin/overview");
    //  this.toast.success("Login Successful")
    })
    .catch((error) => {
    //  this.toast.error("Login Failed")
     store.dispatch("setLoading", false);
      console.log(error);
    });
};
