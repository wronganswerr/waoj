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
  check_token: string;
  get_status: string;
  submit_problem: string;
  update_problem: string;
  ranklist: string;
  get_user_a_problem_status: string;
  get_problem_number: string;
  get_submition_code: string;
}

const state: BehindIpState = {
  onlineip: "https://www.wongansweroj.online:8126/api",
  localip: "http://127.0.0.1:8126",
  user_login: "/user/login",
  user_register: "/user/register",
  get_user_info: "/user/get_user_info",
  check_token: "/user/check_token",
  update_user_info: "/user/update_user_info",
  get_all_problem: "/problem/get_all_problem_id",
  get_problem_detile: "/problem/get_problem_detile",
  get_user_problem_status: "/problem/get_user_problem_status",
  delete_problem: "/problem/delete_problem",
  add_problem: "/problem/add_problem",
  upload_problem_data: "/problem/upload_problem_data",
  get_status: "/user/get_status",
  submit_problem: "/problem/submit_problem",
  update_problem: "/problem/update_problem",
  ranklist: "/status/user_rank_info",
  get_user_a_problem_status: "/status/user_problem_status",
  get_problem_number: "/problem/get_problem_number",
  get_submition_code: "/user/get_submition_code",
};

export default {
  namespaced: true,
  state,
} as Module<BehindIpState, string>;
