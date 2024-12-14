// import { createStore } from "vuex";
// import user from "./user";
// import behindip from "./behindip";
// export default createStore({
//   modules: {
//     user,
//     behindip,
//   },
// });

// src/store/index.ts
import { createStore } from "vuex";
import user from "./user";
import socketModule from "./websock";

const store = createStore({
  modules: {
    user: user,
    socket: socketModule,
  },
});

export default store;
