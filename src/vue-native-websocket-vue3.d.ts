declare module 'vue-native-websocket-vue3' {
    import { Plugin } from 'vue';
    export interface VueNativeSockOptions {
      format?: string;
      reconnection?: boolean;
      reconnectionAttempts?: number;
      reconnectionDelay?: number;
      store?: any;
      mutations?: any;
    }
    const VueNativeSock: Plugin;
    export default VueNativeSock;
  }
  