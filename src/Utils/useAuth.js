/* eslint-disable  */
import axios from "@/Utils/axios.config.js";
import Cookies from "js-cookie";

export const useRegister = (credentials, store, router) => {
  store.dispatch("setLoading", true);
  axios
    .post("/account/register/", credentials)
    .then((response) => {
      Cookies.set("token", response.data.token);
      store.dispatch("setNewUser", response.data);
      store.dispatch("setLoading", false);
      const { user_type } = response.data;
      if (user_type === "Super Admin") {
        router.push("/admin/overview");
      } else {
        router.push("/calculator");
      }
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
      const { user_type } = response.data.user;
      if (user_type === "Super Admin") {
        router.push("/admin/overview");
      } else {
        router.push("/calculator");
      }
      //  this.$toast.success("Login Successful")
    })
    .catch((error) => {
      //  Vue.$toast.error("Login Failed")
      store.dispatch("setLoading", false);
      console.log(error);
    });
};
