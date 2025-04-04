import { useRecoilValue, useSetRecoilState } from "recoil"
import { InputBoxStyles, buttonStyles, inputStyles } from "./InputName"
import { newRoomIDAtom } from "../atoms/newRoomID"

const CreateRoomInput = () => {
  let setNewRoomID = useSetRecoilState(newRoomIDAtom);
  let newRoomID  = useRecoilValue(newRoomIDAtom);
  return (
    <div className={InputBoxStyles}>
      <input onChange={(e) => {
        setNewRoomID(e.target.value)
      }} type="text" value={newRoomID} required placeholder="Enter Room ID" className={inputStyles} />
    </div>
  )
}

export default CreateRoomInput
