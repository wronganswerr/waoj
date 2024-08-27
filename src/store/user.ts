// src/store/user.ts
import { Module } from "vuex";

export interface UserState {
  name: string;
  role: number;
  token: string;
  user_id: number;
}

const state: UserState = {
  name: "",
  role: 0,
  token: "",
  user_id: 0,
};

const mutations = {
  setUserInfo(
    state: UserState,
    userInfo: { name: string; role: number; token: string; user_id: number }
  ) {
    state.name = userInfo.name;
    state.role = userInfo.role;
    state.token = userInfo.token;
    state.user_id = userInfo.user_id;
  },
};

const actions = {
  getuserinfo(
    { commit },
    userInfo: { name: string; role: number; token: string; user_id: number }
  ) {
    commit("setUserInfo", userInfo);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as Module<UserState, any>;
