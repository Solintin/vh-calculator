/* eslint-disable  */
import axios from "@/Utils/axios.config.js";
import Cookies from "js-cookie";

export const useRegister = (credentials, store, router, dis, handleLoading) => {
  handleLoading(true);
  axios
    .post("/account/register/", credentials)
    .then((response) => {
      Cookies.set("token", response.data.token);
      store.dispatch("setNewUser", response.data);
      handleLoading(false);
      dis.$toast.success("Registration Successful");

      const { user_type } = response.data;
      router.push("/");
    })
    .catch((error) => {
      handleLoading(false);
      dis.$toast.error(JSON.stringify(error.response.data));

      console.log(error);
    });
};

export const useLogin = (credentials, store, router, dis, handleLoading) => {
  handleLoading(true);
  axios
    .post("/account/auth/", credentials)
    .then((response) => {
      Cookies.set("token", response.data.token);
      store.dispatch("setUser", response.data);
      handleLoading(false);
      const { user_type } = response.data.user;
      if (user_type === "Admin") {
        router.push("/admin/overview");
      } else {
        router.push("/calculator");
      }
      dis.$toast.success("Login Successful");
    })
    .catch((error) => {
      handleLoading(false);
      dis.$toast.error(error.response.data.error);

      console.log(error);
    });
};
