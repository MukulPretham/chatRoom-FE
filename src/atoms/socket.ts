import { atom } from "recoil";

export let socketAtom = atom<WebSocket | null>({
    key: "Web Socket",
    default: null
})