import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css"
function App2() {

    let [chat, setChat] = useState<{ sender: string; message: string }[]>([]);

    let [name, setName] = useState("");
    let [message, setMessage] = useState("");
    let [socket, setSocket] = useState<WebSocket | null>(null);
    let [currRoomID, setCurrRoomID] = useState("");

    let [joinNum, setjoinNum] = useState("");
    let [createNum, setCreateNum] = useState("");

    let [joined, setJoined] = useState(false);

    let [chatMessage, setChatMessage] = useState("");

    let socketRef = useRef(socket);

    useEffect(() => {
        console.log(socketRef.current)
        let ws = new WebSocket("ws://192.168.1.5:8080");
        
        ws.onopen = (e) => {
            setMessage("connection sucessfull");
            setSocket(ws);
            let name = localStorage.getItem("name");
            let roomID = localStorage.getItem("roomID");
            
            if(roomID){
                setjoinNum(roomID);
            }
            if(name){
                setName(name);
            }
            socketRef.current = ws;
        }

        ws.onclose = () => {
            setJoined(false);
        }
        ws.onmessage = (e) => {
            let res = JSON.parse(e.data);
            console.log(res);
            if (res.type == "create") {
                setMessage(res.message);
                setCurrRoomID(res.roomID);
                localStorage.setItem("roomID",res.roomID);
            }
            if (res.type == "join") {
                setMessage(res.message);
                setJoined(true);
                setjoinNum("");
            }
            if (res.type == "error") {
                setMessage(res.message);
                setJoined(false);
            }
            if (Array.isArray(res)) {
                setChat(res);
                console.log(chat);
            }
        }
    },[]);

    let createHandler = () => {
        // console.log(createNum);
        socket?.send(JSON.stringify({
            type: "create",
            roomID: createNum
        }))
        setCreateNum("");
    }
    function joinHandler() {
        setCurrRoomID(joinNum);
        setJoined(true);
        if(name == ""){
            setJoined(false);
            return;
        }
        socket?.send(JSON.stringify({
            type: "join",
            name: name,
            roomID: joinNum
        }))
    }

    let messageHandler = () => {
        socket?.send(JSON.stringify({
            type: "message",
            roomID: currRoomID,
            payload: {
                sender: name,
                message: chatMessage
            }
        }))

        setChatMessage("");
    }

    let leaveHandler = () => {
        socket?.send(JSON.stringify({ type: "leave", name: name, message: `${name} left chat` }))
        socket?.close(1000, `${name} left the chat`);
        setJoined(false);
        window.location.reload();
        setMessage("Reload to connected to server");
    }

    return (
        <>

            {joined ? <div>  <div>Welcome to chat {name} </div> <div>Room No: {currRoomID}</div>  <button onClick={leaveHandler} className="leave">Leave</button> </div> :
                <div>
                    {message}

                    <div>
                        <input value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} type="text" placeholder="Enter your name" />
                        <button onClick={() => { setName(name) }}>Enter</button>
                    </div>
                    <div>
                        <input value={createNum} onChange={(e) => {
                            setCreateNum(e.target.value)
                        }} type="text" placeholder="Enter Room ID" />
                        <button onClick={createHandler}>Create Room</button>
                    </div>
                    <div>
                        <input value={joinNum} onChange={(e) => {
                            setjoinNum(e.target.value)
                        }} type="text" placeholder="Enter Room ID" />
                        <button onClick={joinHandler}>Join Room</button>
                    </div>
                </div>
            }


            {joined && <><div className="chat">{chat.map((msg, index) => {
                return <div className="message" key={index}>
                    <span>{msg.sender}:--</span>
                    <span>{msg.message}</span>
                </div>
            })}</div>
                <div>
                    <input onChange={(e) => setChatMessage(e.target.value)} value={chatMessage} className="chatMsg" type="text" placeholder="Enter your message" />
                    <button className="sendMsg" onClick={messageHandler}>Send</button>
                </div>
            </>}
        </>
    )
}

export default App2;