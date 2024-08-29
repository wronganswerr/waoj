import { Module } from "vuex";

export interface BehindIpState {
  onlineip: string;
  localip: string;
  user_login: string;
  user_register: string;
  get_user_info: string;
  update_user_info: string;
  get_all_problem: string;
  get_problem_detile: string;
  get_user_problem_status: string;
  delete_problem: string;
  add_problem: string;
  upload_problem_data: string;
}

const state: BehindIpState = {
  onlineip: "http://www.wongansweroj.online:8126",
  localip: "http://127.0.0.1:8001",
  user_login: "/user/login",
  user_register: "/user/register",
  get_user_info: "/user/get_user_info",
  update_user_info: "/user/update_user_info",
  get_all_problem: "/problem/get_all_problem_id",
  get_problem_detile: "/problem/get_problem_detile",
  get_user_problem_status: "/problem/get_user_problem_status",
  delete_problem: "/problem/delete_problem",
  add_problem: "/problem/add_problem",
  upload_problem_data: "/problem/upload_problem_data",
};

export default {
  namespaced: true,
  state,
} as Module<BehindIpState, any>;
