import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/addproblem",
    name: "addproblem",
    component: () => import("../views/AddProblem.vue"),
  },
  {
    path: "/problem",
    name: "problem",
    component: () => import("../views/ProblemView.vue"),
  },
  {
    path: "/status",
    name: "status",
    component: () => import("../views/StatusView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/loginpage/LoGin.vue"),
  },
  {
    path: "/contest",
    name: "contest",
    component: () => import("../views/ConTest.vue"),
  },
  {
    path: "/aproblempage/:problem_id",
    name: "aproblempage",
    component: () => import("../components/problem/AproblemPage.vue"),
    props: true,
  },
  {
    path: "/changeproblem",
    name: "changeproblem",
    component: () => import("../views/ChangeProblem.vue"),
  },
  {
    path: "/challenge",
    name: "challenge",
    component: () => import("../views/ChallEnge.vue"),
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component: () => import("../views/ChatRoom.vue"),
  },
  {
    path: "/ranklist",
    name: "ranklist",
    component: () => import("../views/RankList.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/problem/problem/:oj_name/:problem_total_number",
    name: "problem_set",
    component: () => import("../components/problem/ProblemSet.vue"),
    props: true,
  },
  {
    path: "/problem/problem_manager",
    name: "problem_manager",
    component: () => import("../components/problem/ProblemSetManagePage.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
