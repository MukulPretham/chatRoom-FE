import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import './index.css'
import App3 from './App3.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import CreateRoom from './components/CreateRoom.tsx'
import JoinRoom from './components/JoinRoom.tsx'
import ChatRoom from './components/ChatRoom.tsx'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App3 />,
    children:[
      {index: true ,element: <CreateRoom />},
      {path:"/join", element: <JoinRoom />},
      {path: "/chat", element: <ChatRoom/>}
  
]
}
  
]);

createRoot(document.getElementById('root')!).render(
  
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  
)
