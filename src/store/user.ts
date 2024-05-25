import { StoreOptions } from "vuex";

// actions 调用mutations 支持异步

// mutations 更新变量
export default {
  namespaced: true,
  state: () => ({
    user: {
      username: "tourist",
      id: 0,
      userrole: -1,
    },
  }),
  actions: {
    getuserinfo({ commit }, payload) {
      //从远程获取登录信息（服务器）
      commit("updatauser", payload);
    },
  },
  mutations: {
    updatauser(state, payload) {
      // console.log("updatauser");
      // console.log(payload);
      // console.log(payload.username);
      // console.log(payload.userrole);
      state.user.username = payload.name;
      state.user.userrole = payload.role;
      state.user.id = payload.id;
    },
  },
} as StoreOptions<any>;
