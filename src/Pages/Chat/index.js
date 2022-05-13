import React, { useEffect, useState } from 'react';
import ChatInfo from '../../Components/ChatInfo';
import {Box} from '@mui/material';
import {useLocation} from 'react-router-dom';
import ChatArea from '../../Components/ChatArea';
import ChatInput from '../../Components/ChatInput';
import MessageBubble from '../../Components/MessageBubble';
import {getMessages} from '../../Firebase/firebase-chatsystem';


function Chat() {

  const location=useLocation();
  const [messages,setMessages]=useState([]);
  const [isSended,setIsSended]=useState("");
  const [timer,setTimer]=useState(0);

  useEffect(()=>{

    setMessages([]);
    let message=getMessages(location.state.channelId);
    setMessages(message);

  },[location.state.channelId,isSended,timer]);

  setTimeout(()=>{
    setTimer(timer+1);;
  },5000);

  const isSend=(value)=>{
    setIsSended(value);
  }

  return (
    <Box sx={{width:'100%',height:'100vh',backgroundColor:'#548CA8'}}>
      <ChatInfo name={location.state.name} id={location.state.otherId} />
      <ChatArea>
      
         {messages.map((m,index)=>{
           let time=new Intl.DateTimeFormat('en-US',{hour:'2-digit',minute:'2-digit'}).format(m.sendedAt)
          return <MessageBubble key={index} text={m.text} my={m.sender===location.state.userId ? true : false} time={time} />
         })}
      
      </ChatArea>
      <ChatInput channelId={location.state.channelId} userId={location.state.userId} isSend={isSend} />
    </Box>
  )
}

export default Chat;