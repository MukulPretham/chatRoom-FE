import { useRecoilValue, useSetRecoilState } from "recoil"
import { messagesAtom } from "../atoms/messages"
import { chatAtom } from "../atoms/chat"
import { nameAtom } from "../atoms/name"
import { useState } from "react"
import { socketAtom } from "../atoms/socket"
import { roomAtom } from "../atoms/roomID"
import { useNavigate } from "react-router"


const ChatRoom = () => {

    let [currMessage, setCurrMessage] = useState("");

    let messages = useRecoilValue(messagesAtom);
    let setMessage = useSetRecoilState(messagesAtom);

    let socket = useRecoilValue(socketAtom);

    let chats = useRecoilValue(chatAtom);
    let setChat = useSetRecoilState(chatAtom);
    
    let name = useRecoilValue(nameAtom);
    let roomID = useRecoilValue(roomAtom);

    let navigate = useNavigate();

    let sendHandler = () => {
        let req = {
            type: "message",
            roomID: roomID,
            payload: {
                sender: name,
                message: currMessage
            }
        }
        socket?.send(JSON.stringify(req));
        console.log(currMessage);
        setCurrMessage("");
    }

    let leaveHandler = () => {
        let req = {
            type: "leave",
            roomID: roomID,
            name: name
        }
        setChat([]);
        socket?.send(JSON.stringify(req));
        setMessage(`Left form ${roomID} Room `);
        navigate("/");
    }

    return (
        <div className="w-96 border p-4 rounded-lg shadow-lg flex flex-col">
            <div>username: {name}</div>
            {messages && <div>{messages}</div>}
            <div className="gap-2 flex flex-col items-start h-120 border-2 overflow-y-auto border-b mb-2 p-2" id="chat-box">
                {chats.map(msg => (
                    <div className={msg.sender !== name ? "w-full flex justify-start mb-2" : "w-full flex justify-end mb-2"}>
                        <div className={msg.sender !== name ? "bg-gray-200 text-black p-2 rounded-lg max-w-xs" : "bg-blue-500 text-white p-2 rounded-lg max-w-xs"}>
                            <p className="text-xs text-stone-900">{msg.sender}</p>
                            <p className="text-sm">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input onChange={(e) => {
                    setCurrMessage(e.target.value)
                }} value={currMessage} type="text" id="message" className="flex-1 border p-2 rounded" placeholder="Type a message..." />
                <button onClick={sendHandler} className="bg-purple-500 cursor-pointer text-white px-4 py-2 rounded">Send</button>
                <button onClick={leaveHandler} className="bg-red-500 text-white px-4 py-2 rounded">Leave</button>
            </div>
        </div>
    )
}

export default ChatRoom
