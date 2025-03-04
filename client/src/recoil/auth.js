import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isLogin = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const loginId = atom({
  key: "loginId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
