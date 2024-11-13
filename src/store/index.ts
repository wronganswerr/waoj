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
import behindip from "./behindip";
import socketModule from "./websock";

export default createStore({
  modules: {
    user,
    behindip,
    socket: socketModule,
  },
});
