const BASE_URL = process.env.VUE_APP_API_URL;

export const url = {
  USER_LOGIN: `${BASE_URL}/user/login`,
  USER_REGISTER: `${BASE_URL}/user/register`,
  GET_USER_INFO: `${BASE_URL}/user/get_user_info`,
  CHECK_TOKEN: `${BASE_URL}/user/check_token`,
  UPDATE_USER_INFO: `${BASE_URL}/user/update_user_info`,
  GET_ALL_PROBLEM: `${BASE_URL}/problem/get_all_problem_id`,
  GET_PROBLEM_TITEL: `${BASE_URL}/problem/get_problem_title`,
  GET_PROBLEM_DETAIL: `${BASE_URL}/problem/get_problem_detile`,
  GET_USER_PROBLEM_STATUS: `${BASE_URL}/problem/get_user_problem_status`,
  DELETE_PROBLEM: `${BASE_URL}/problem/delete_problem`,
  ADD_PROBLEM: `${BASE_URL}/problem/add_problem`,
  UPLOAD_PROBLEM_DATA: `${BASE_URL}/problem/upload_problem_data`,
  GET_STATUS: `${BASE_URL}/user/get_status`,
  SUBMIT_PROBLEM: `${BASE_URL}/problem/submit_problem`,
  UPDATE_PROBLEM: `${BASE_URL}/problem/update_problem`,
  RANKLIST: `${BASE_URL}/status/user_rank_info`,
  GET_USER_A_PROBLEM_STATUS: `${BASE_URL}/status/user_problem_status`,
  GET_PROBLEM_NUMBER: `${BASE_URL}/problem/get_problem_number`,
  GET_SUBMISSION_CODE: `${BASE_URL}/user/get_submition_code`,
  WS: `${process.env.VUE_APP_API_BASE_URL}/ws/ws`,
};
