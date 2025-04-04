import "./App.css"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { joinAtom } from "./atoms/join";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { socketAtom } from "./atoms/socket";
import { messagesAtom } from "./atoms/messages";
import { chatAtom } from "./atoms/chat";

type Message = {
    sender: string,
    message: string
}

function App3() {

    let setMessages = useSetRecoilState(messagesAtom);

    let setSocket = useSetRecoilState<WebSocket | null>(socketAtom);
    let socket = useRecoilValue<WebSocket | null>(socketAtom);
    let setChat = useSetRecoilState(chatAtom);

    useEffect(() => {
        
        let ws = new WebSocket("ws://13.51.56.4:8080");
        ws.onopen = () => {
            setSocket(ws);
        }

        ws.onmessage = (e) => {
            let res = JSON.parse(e.data);
            if (res.type == "error" || res.type == "message" || res.type == "create") {
                setMessages(res.message);
            }
            if (Array.isArray(res)) {
                setChat(res);
            }
        }

        return () => {
            ws.close();
        }

    }, []);

    return(
        <>
            <Outlet />
        </>
    )
}

export default App3;