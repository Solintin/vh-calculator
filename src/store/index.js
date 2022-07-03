import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    usersList: undefined,
    calculationsList: undefined,
    ratesList: undefined,
    tariffsList: undefined,
    calculationData: undefined,
    isLoggedIn: false,
    loading: false,
    currentUser: null,
  },

  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    setUserList({ commit }, items) {
      commit("SET_USER_LIST", items);
    },
    calculationList({ commit }, items) {
      commit("CALCULATION_LIST", items);
    },
    rateList({ commit }, items) {
      commit("RATE_LIST", items);
    },
    tariffList({ commit }, items) {
      commit("TARIFF_LIST", items);
    },
    fetchCalculationData({ commit }, items) {
      commit("CALCULATION_DATA", items);
    },
    setLoading({ commit }, loadingState) {
      commit("SET_LOADING", loadingState);
    },

    logout({ commit }) {
      commit("LOGOUT");
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;
      state.isLoggedIn = true;
    },
    SET_USER_LIST(state, items) {
      state.usersList = items;
    },
    CALCULATION_LIST(state, items) {
      state.calculationsList = items;
    },
    RATE_LIST(state, items) {
      state.ratesList = items;
    },
    TARIFF_LIST(state, items) {
      state.tariffsList = items;
    },
    CALCULATION_DATA(state, items) {
      state.calculationData = items;
    },
    SET_LOADING(state, loadingState) {
      state.loading = loadingState;
    },
    LOGOUT(state) {
      state.usersList = undefined;
      state.calculationsList = undefined;
      state.ratesList = undefined;
      state.tariffsList = undefined;
      state.calculationData = undefined;
      state.isLoggedIn = false;
      state.loading = false;
      state.currentUser = null;
    },
  },
  getters: {
    data: (state) => state,
  },
  modules: {},
});
