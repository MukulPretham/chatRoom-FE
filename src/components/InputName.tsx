import { useRecoilValue, useSetRecoilState } from "recoil";
import { nameAtom } from "../atoms/name";

let rounded = "rounded-[10px]"

export const InputBoxStyles = "flex justify-around h-[35px]";
export const inputStyles = `${rounded} p-1.5 w-full border-2 border-white`
export const buttonStyles = `border-2 border-white ${rounded} cursor-pointer`
const InputName = () => {
  let name = useRecoilValue(nameAtom);
  let setName = useSetRecoilState(nameAtom)
  return (
    <div className={InputBoxStyles}>
      <input onChange={(e)=>{
        setName(e.target.value)
      }} type="text" value={name} placeholder="Enter your name" className={inputStyles}/>
    </div>
  )
}

export default InputName
