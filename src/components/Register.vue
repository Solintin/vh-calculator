<!-- eslint-disable -->
<template>
  <div class="h-screen">
    <div class="grid md:grid-cols-2">
      <div class="h-full bg-[#fff] flex flex-col place-content-center">
        <h1 class="text-center text-4xl text-black font-bold mt-10">Sign Up</h1>
        <div class="w-10/12 container mx-auto mt-16">
          <h1>Email</h1>
          <div
            class="my-4 bg-[#ECECEC] rounded-md flex ring-1 ring-[#B659A2CC]"
          >
            <div
              class="icon w-12 max-h-full bg-[#B659A2] rounded-l-md grid place-content-center mr-2"
            >
              <i class="fa-solid fa-envelope text-white text-xl"></i>
            </div>
            <input
              v-model="email"
              type="email"
              name="email"
              placeholder="Janedoe@valuehandlers.com"
              class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
            />
          </div>

          <div class="text-red-500 w-full text-xs md:text-base">
            <p v-if="!$v.email.required && $v.email.$dirty" class="">
              Email is required!
            </p>
            <p v-if="!$v.email.email" class="">Invalid email address</p>
          </div>

          <h1>Password</h1>
          <div
            class="my-4 bg-[#ECECEC] rounded-md flex ring-1 ring-[#B659A2CC]"
          >
            <div
              class="icon w-12 max-h-full bg-[#B659A2] rounded-l-md grid place-content-center mr-2"
            >
              <i class="fa-solid fa-key text-white text-xl"></i>
            </div>
            <input
              v-model="password"
              type="password"
              name="password"
              placeholder="*********"
              class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
            />
          </div>
          <div class="text-red-500 w-full text-xs md:text-base">
            <p v-if="!$v.password.required && $v.password.$dirty" class="">
              Password is required!
            </p>
            <p v-if="!$v.password.minLength" class="">
              Password must be between 8 characters and above
            </p>
          </div>

          <h1>Confirm Password</h1>
          <div
            class="my-4 bg-[#ECECEC] rounded-md flex ring-1 ring-[#B659A2CC]"
          >
            <div
              class="icon w-12 max-h-full bg-[#B659A2] rounded-l-md grid place-content-center mr-2"
            >
              <i class="fa-solid fa-key text-white text-xl"></i>
            </div>
            <input
              v-model="confirm_password"
              type="password"
              name="Confirm_Password"
              placeholder="*********"
              class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
            />
          </div>
          <div class="text-red-500 w-full text-xs md:text-base">
            <p
              v-if="!$v.confirm_password.required && $v.confirm_password.$dirty"
              class=""
            >
              Password is required!
            </p>
            <p v-if="!$v.confirm_password.sameAsPassword" class="">
              Passwords must be equal
            </p>
          </div>

          <button
            @click="submitForm"
            class="flex justify-center items-center space-x-3 bg-[#B659A2] text-white px-8 py-3 rounded-md w-full mt-10"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
            ></div>

            <div v-else class="font-bold text-xl">Sign Up</div>
          </button>
          <div
            class="text-base font-medium mt-5 flex justify-center items-start space-x-5"
          >
            <h1>Have an account?</h1>
            <router-link to="/" class="text-[#B659A2] font-semibold"
              >Login Here</router-link
            >
          </div>
        </div>
      </div>
      <div class="hidden h-screen bg-[#B659A2] md:grid place-content-center">
        <img src="@/assets/Svg/logo.svg" alt="" class="h-[260px] w-[320px]" />
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import { useRegister } from "@/Utils/useAuth";

export default {
  name: "signup",

  props: [],
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6),
    },
    confirm_password: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  data() {
    return {
      password: "",
      confirm_password: "",
      email: "",
      user_type: "User",
      loading: false,
    };
  },

  methods: {
    handleLoading(state) {
      this.loading = state;
    },
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //Login Logic

        const credentials = {
          email: this.email,
          password: this.password,
          user_type: this.user_type,
        };
        await useRegister(
          credentials,
          this.$store,
          this.$router,
          this,
          this.handleLoading
        );
      } else {
      }
    },
  },
};
</script>
<!-- eslint-disable -->

<style></style>
