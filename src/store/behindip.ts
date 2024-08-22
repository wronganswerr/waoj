// behindip.ts
import { Module } from "vuex";

interface BehindIpState {
  onlineip: string;
  localip: string;
  user_login: string;
  user_register: string;
  get_user_info: string;
  update_user_info: string;

  get_all_problem: string;
}

const behindip: Module<BehindIpState, string> = {
  state: {
    onlineip: "http://82.156.233.114:8001",
    localip: "http://127.0.0.1:8001",
    user_login: "/user/login",
    user_register: "/user/register",
    get_user_info: "/user/get_user_info",
    update_user_info: "/user/update_user_info",

    get_all_problem: "/problem/get_all_problem_id",
  },
  mutations: {},
  actions: {},
};
export default behindip;
