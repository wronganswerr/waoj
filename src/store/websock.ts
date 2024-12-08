// src/store/modules/socket.ts
import { Module } from "vuex";

interface State {
  ws: WebSocket | null;
  heartTimeOut: number;
  lockReconnect: boolean;
  timerReconnect: ReturnType<typeof setTimeout> | null;
  timerHeart: ReturnType<typeof setTimeout> | null;
  timerServerHeart: ReturnType<typeof setTimeout> | null;
  handClose: boolean;
  msg: object | null;
  url: string;
}

const state: State = {
  ws: null,
  heartTimeOut: 20000, // 监测心跳时间 40秒
  lockReconnect: false, // 避免重连
  timerReconnect: null,
  timerHeart: null,
  timerServerHeart: null,
  handClose: false,
  msg: null,
  url: "",
};

const socketModule: Module<State, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_WS(state, ws: WebSocket) {
      state.ws = ws;
    },
    SET_MSG(state, msg: object) {
      state.msg = msg;
    },
    SET_URL(state, url: string) {
      state.url = url;
    },
    SET_LOCK_RECONNECT(state, lockReconnect: boolean) {
      state.lockReconnect = lockReconnect;
    },
    SET_HAND_CLOSE(state, handClose: boolean) {
      state.handClose = handClose;
    },
    CLEAR_TIMERS(state) {
      if (state.timerReconnect) clearTimeout(state.timerReconnect);
      if (state.timerHeart) clearTimeout(state.timerHeart);
      if (state.timerServerHeart) clearTimeout(state.timerServerHeart);
    },
    SET_TIMER_RECONNECT(state, timer: ReturnType<typeof setTimeout> | null) {
      state.timerReconnect = timer;
    },
    SET_TIMER_HEART(state, timer: ReturnType<typeof setTimeout> | null) {
      state.timerHeart = timer;
    },
    SET_TIMER_SERVER_HEART(state, timer: ReturnType<typeof setTimeout> | null) {
      state.timerServerHeart = timer;
    },
  },
  actions: {
    connection({ dispatch }, { url }: { url: string }) {
      if ("WebSocket" in window) {
        dispatch("createWebSocket", { url });
      } else {
        console.log("您的浏览器不支持websocket通信");
      }
    },
    createWebSocket({ commit, dispatch }, { url }: { url: string }) {
      try {
        const ws = new WebSocket(url);
        commit("SET_WS", ws);
        commit("SET_URL", url);
        console.log(state.ws);
        dispatch("initWebSocket");
      } catch (e) {
        console.log("catch eeeee=", e);
        dispatch("reConnection");
      }
    },
    initWebSocket({ state, commit, dispatch }) {
      if (!state.ws) return;

      state.ws.onopen = () => {
        console.log("连接成功");
        dispatch("heartCheck");
      };

      state.ws.onmessage = (event: MessageEvent) => {
        console.log(`收到服务端消息: ${event.data}`);
        let msg = event.data;
        if (msg.includes("{")) {
          msg = JSON.parse(msg); //str -> obj
        }
        // commit("SET_MSG", {}); // 通过监听实现
        commit("SET_MSG", msg);
        dispatch("heartCheck");
      };

      state.ws.onerror = () => {
        console.log("连接失败");
        dispatch("reConnection");
      };

      state.ws.onclose = () => {
        console.log("关闭连接");
        if (!state.handClose) {
          // dispatch("reConnection");
        }
      };
    },
    clearTimer({ commit }) {
      commit("CLEAR_TIMERS");
    },
    reConnection({ state, commit, dispatch }) {
      console.log("重新连接");
      if (state.lockReconnect) {
        return;
      }
      commit("SET_LOCK_RECONNECT", true);

      if (state.timerReconnect) {
        clearTimeout(state.timerReconnect);
      }

      const timer = setTimeout(() => {
        dispatch("connection", { url: state.url });
        commit("SET_LOCK_RECONNECT", false);
      }, 2000);

      commit("SET_TIMER_RECONNECT", timer);
    },
    heartCheck({ state, commit, dispatch }) {
      console.log("HEART_BEAT");
      if (state.timerHeart) {
        clearTimeout(state.timerHeart);
      }

      const timer = setTimeout(() => {
        console.log("PING");
        console.log(state.ws);
        if (state.ws?.readyState == 1) {
          state.ws.send(
            JSON.stringify({
              type: 0,
              content: "PING",
            })
          );
          commit("SET_LOCK_RECONNECT", false);
          dispatch("heartCheck");
        } else {
          console.log("PING 失败");
          dispatch("reConnection");
        }
      }, state.heartTimeOut);

      commit("SET_TIMER_HEART", timer);
    },
    sendMsg({ state }, data: string) {
      console.log("send_string");
      if (state.ws?.readyState === WebSocket.OPEN) {
        state.ws.send(JSON.stringify(data));
      }
    },
    closeWs({ state, commit }) {
      console.log("手动关闭ws");
      commit("SET_HAND_CLOSE", true);
      commit("CLEAR_TIMERS");
      state.ws?.close();
    },
  },
};

export default socketModule;
