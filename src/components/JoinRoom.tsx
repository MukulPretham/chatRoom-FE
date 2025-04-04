import InputName from "./InputName"
import InputRoom from "./InputRoom"
import { buttonStyles } from "./InputName"
import { NavLink, useNavigate } from "react-router"
import { useRecoilValue} from "recoil"
import { socketAtom } from "../atoms/socket"
import { roomAtom } from "../atoms/roomID"
import { nameAtom } from "../atoms/name"

const JoinRoom = () => {

    let navigate = useNavigate();
    let socket = useRecoilValue(socketAtom);
    let roomID = useRecoilValue(roomAtom);
    let name = useRecoilValue(nameAtom);


    let joinHandler = ()=>{
        let req = {
            type: "join",
            roomID: roomID,
            name: name
        }
        socket?.send(JSON.stringify(req));
        navigate("/chat");
    }

    return (
        <div className="h-[300px] flex flex-col justify-center gap-5 items-center w-[400px] border-2 border-white rounded-2xl">
            <h1>Welcome to chat Room</h1>
            <div className="flex flex-col gap-3 w-[70%]">
                <InputName />
                <InputRoom />
            </div>
            <button onClick={joinHandler} className={buttonStyles + " py-2 px-4"}>Join</button>
            <span className="font-thin">Dont have a Room ID ? <NavLink to="/">Create</NavLink> </span>  
        </div>
    )
}

export default JoinRoom
