import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  let inputRef = useRef<HTMLInputElement | null>(null);
  let displayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let ws = new WebSocket("ws://13.51.56.4:8080");
    ws.onopen = ()=>{
      setMessa
    }
    ws.onmessage = (e) => {
      if (!displayRef) {
        return;
      }
      displayRef.current?.innerHTML = e.data;

    }
  }, [])
  return (
    <>
      <div ref={displayRef}></div>
      <input ref={inputRef} type="text" />
      <button onClick={() => {
        console.log(inputRef.current?.value);
      }}>Console</button>
    </>
  )
}

export default App
