import { useState } from "react"
import { InputBoxStyles,buttonStyles, inputStyles } from "./InputName"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { roomAtom } from "../atoms/roomID"

const InputRoom = () => {
  let roomID: string = useRecoilValue(roomAtom);
  let setRoomID = useSetRecoilState(roomAtom)
  return (
    <div className={InputBoxStyles}>
      <input onChange={(e)=>{
        setRoomID(e.target.value)
      }} type="text" value={roomID} placeholder="Enter Room ID" className={inputStyles}/>
    </div>
  )
}

export default InputRoom
