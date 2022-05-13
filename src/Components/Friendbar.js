import React,{useEffect, useState} from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { stringAvatar } from './AvatarGenerator';
import { useNavigate } from 'react-router-dom';
import Unread from './Unread';
import {useUserContext} from '../Contexts/UserContext';
import {getLastSeen,getLastSend,updateLastSeen} from '../Firebase/firebase-chatsystem';
import {getUserData} from '../Firebase/firebase-database';

function Friendbar({id,channelId}) {

  const navigate = useNavigate();
  const {user} = useUserContext();
  const [lastSeen,setLastSeen]=useState("");
  const [lastSend,setLastSend]=useState("");
  const [name,setName]=useState("");
  const [timer,setTimer]=useState(0);

  useEffect(()=>{

    let data=getUserData(id);
    setName(data.username);
    
    let seen=getLastSeen(channelId,user.uid);
    let send=getLastSend(channelId,id);

    if((seen!==null || seen!==undefined || seen!=="")&&(send!==null || send!==null || send!==null)){
      setLastSeen(seen.lastseen);
      setLastSend(send.lastsend);
    }
    
  },[timer]);

  //Notification Check
  setTimeout(()=>{
    setTimer(timer+1);;
  },10000);

  const onClickTab = () => {
    navigate('/chat',{state:{channelId:channelId,name:name,userId:user.uid,otherId:id}});
    updateLastSeen(channelId,user.uid);
  }

  const onClickUser = () => {
    navigate('/profile',{state:{id:id,friend:true}});
  }

  return (
    <Box sx={{ height: '10vh', width: '100%',borderBottom:'2px solid #4a6c7d', display: 'flex', alignItems: 'center', p:2,cursor:'pointer'}}>
      <Avatar onClick={(onClickUser)} {...stringAvatar(name ? name : "JohnDoe")} />
      <Typography onClick={onClickTab} sx={{color:'white', fontSize: '3vh', p: 1,width:'85%'}}>{name}</Typography>
      {Number(lastSend)>Number(lastSeen) ? <Unread onClick={onClickTab}/> : null }
    </Box>
  )
}

export default React.memo(Friendbar);