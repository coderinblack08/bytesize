import PocketBase, { Admin, Record } from "pocketbase";
import { create } from "zustand";

export const pb = new PocketBase("http://127.0.0.1:8090");

// async function initPocketBase(req, res) {
//   const pb = new PocketBase('http://127.0.0.1:8090');

//   // load the store data from the request cookie string
//   pb.authStore.loadFromCookie(req?.headers?.cookie || '');

//   // send back the default 'pb_auth' cookie to the client with the latest store state
//   pb.authStore.onChange(() => {
//     res?.setHeader('set-cookie', pb.authStore.exportToCookie());
//   });

//   try {
//       // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
//       pb.authStore.isValid && await pb.collection('users').authRefresh();
//   } catch (_) {
//       // clear the auth store on failed refresh
//       pb.authStore.clear();
//   }

//   return pb
// }

interface UserState {
  set: (user: Record | Admin | null) => void;
  user: Record | Admin | null;
}

export const useUserStore = create<UserState>()((set) => ({
  set: (user) => set({ user }),
  user: null,
}));
