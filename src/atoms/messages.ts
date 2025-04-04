import { atom } from "recoil";

export const messagesAtom = atom({
    key: "messages",
    default: "Welcome to chat app"
})