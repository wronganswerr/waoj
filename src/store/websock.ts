// src/store/modules/socket.ts
import { Module } from 'vuex';

interface State {
  ws: WebSocket | null;
  heartTimeOut: number;
  lockReconnect: boolean;
  timerReconnect: ReturnType<typeof setTimeout> | null;
  timerHeart: ReturnType<typeof setTimeout> | null;
  timerServerHeart: ReturnType<typeof setTimeout> | null;
  handClose: boolean;
  msg: string;
}

const state: State = {
  ws: null,
  heartTimeOut: 40000, // 监测心跳时间 40秒
  lockReconnect: false, // 避免重连
  timerReconnect: null,
  timerHeart: null,
  timerServerHeart: null,
  handClose: false,
  msg: "",
};

const socketModule: Module<State, any> = {
  namespaced: true,
  state,
  mutations: {
    SET_WS(state, ws: WebSocket) {
      state.ws = ws;
    },
    SET_MSG(state, msg: string) {
      state.msg = msg;
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
    connection({ dispatch }, { url, token }: { url: string; token: string }) {
      if ("WebSocket" in window) {
        dispatch('createWebSocket', { url, token });
      } else {
        console.log("您的浏览器不支持websocket通信");
      }
    },
    createWebSocket({ commit, dispatch }, { url, token }: { url: string; token: string }) {
      try {
        const ws = new WebSocket(url, token);
        commit('SET_WS', ws);
        dispatch('initWebSocket');
      } catch (e) {
        console.log("catch eeeee=", e);
        dispatch('reConnection');
      }
    },
    initWebSocket({ state, commit, dispatch }) {
      if (!state.ws) return;

      state.ws.onopen = () => {
        state.ws?.send("hello server");
        console.log("连接成功");
        dispatch('heartCheck');
      };

      state.ws.onmessage = (event: MessageEvent) => {
        console.log(event.data);
        let msg = event.data;
        if (msg.includes("{")) {
          msg = JSON.parse(msg);
        }
        commit('SET_MSG', msg);
        dispatch('heartCheck');
      };

      state.ws.onerror = () => {
        console.log("连接失败");
        dispatch('reConnection');
      };

      state.ws.onclose = () => {
        console.log("关闭连接");
        if (!state.handClose) {
          dispatch('reConnection');
        }
      };
    },
    clearTimer({ commit }) {
      commit('CLEAR_TIMERS');
    },
    reConnection({ state, commit, dispatch }) {
      console.log("重新连接");
      if (state.lockReconnect) {
        return;
      }
      commit('SET_LOCK_RECONNECT', true);

      if (state.timerReconnect) {
        clearTimeout(state.timerReconnect);
      }

      const timer = setTimeout(() => {
        dispatch('connection', { url: 'your_url', token: 'your_token' });
        commit('SET_LOCK_RECONNECT', false);
      }, 5000);

      commit('SET_TIMER_RECONNECT', timer);
    },
    heartCheck({ state, commit }) {
      console.log("监测心跳");
      if (state.timerHeart) {
        clearTimeout(state.timerHeart);
      }

      const timer = setTimeout(() => {
        console.log("PING");
        state.ws?.send("PING");
        commit('SET_LOCK_RECONNECT', false);
      }, state.heartTimeOut);

      commit('SET_TIMER_HEART', timer);
    },
    sendMsg({ state }, data: any) {
      console.log("发送消息");
      if (state.ws?.readyState === WebSocket.OPEN) {
        state.ws.send(JSON.stringify(data));
      }
    },
    closeWs({ state, commit }) {
      console.log("手动关闭ws");
      commit('SET_HAND_CLOSE', true);
      commit('CLEAR_TIMERS');
      state.ws?.close();
    }
  }
};

export default socketModule;
