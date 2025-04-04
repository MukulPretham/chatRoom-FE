import { atom } from "recoil";

export const newRoomIDAtom = atom<string | undefined>({
    key: "new Room",
    default: undefined
})