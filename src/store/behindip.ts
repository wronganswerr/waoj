// behindip.ts
import { Module } from "vuex";

interface BehindIpState {
  onlineip: string;
  localip: string;
}

const behindip: Module<BehindIpState, string> = {
  state: {
    onlineip: "http://82.156.233.114:8001",
    localip: "http://127.0.0.1:8001",
  },
  mutations: {},
  actions: {},
};
export default behindip;
