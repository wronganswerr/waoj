import { Store } from "vuex";

export function validateResponse(response: any): boolean {
  if (response && response.data && response.status === 200) {
    return true;
  } else {
    alert("serve error");
    return false;
  }
}

export function clear_local_user_info(store: Store<any>) {
  if (store) {
    store.dispatch("user/getuserinfo", {
      name: "",
      role: 0,
      token: "visitor",
      user_id: 0,
    });
    localStorage.setItem(
      "info",
      JSON.stringify({
        role: store.state.user.role,
        name: store.state.user.name,
        user_id: store.state.user.user_id,
        token: store.state.user.token,
      })
    );
  } else {
    console.error("Store is not provided");
  }
}

export function anotherUtilityFunction(param: string): string {
  return `Processed: ${param}`;
}
