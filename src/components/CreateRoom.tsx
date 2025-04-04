import { NavLink } from 'react-router'
import { buttonStyles } from './InputName'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { socketAtom } from '../atoms/socket'
import CreateRoomInput from './CreateRoomInput'
import { messagesAtom } from '../atoms/messages'
import { newRoomIDAtom } from '../atoms/newRoomID'


//@ts-ignore
const CreateRoom = () => {

    let socket = useRecoilValue(socketAtom);
    let messages = useRecoilValue(messagesAtom);

    let newRoomID = useRecoilValue(newRoomIDAtom);
    let setNewRoomID = useSetRecoilState(newRoomIDAtom)

    let createHandler = ()=>{
        let req = {
            type: "create",
            roomID: newRoomID
        }
        console.log(socket);
        socket?.send(JSON.stringify(req));
        setNewRoomID("");
    }

    return (
        <div className="h-[300px] flex flex-col justify-center gap-5 items-center w-[400px] border-2 border-white rounded-2xl">
            {messages && <h1>{messages}</h1>}
            <div className="flex flex-col gap-3 w-[70%]">
                <CreateRoomInput/>
            </div>
            <button onClick={createHandler} className={buttonStyles + " py-2 px-4"}>Create</button>
            <span className="font-thin">Have have a Room ID ? <NavLink to="/join">Join</NavLink> </span>
        </div>
    )
}

export default CreateRoom
