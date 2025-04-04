import { atom } from "recoil"

type Message = {
    sender: string,
    message: string
}

export let chatAtom = atom<Message[]>({
  key: "chat",
  default: []  
})