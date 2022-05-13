import React,{useEffect, useState} from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { stringAvatar } from './AvatarGenerator';
import { useNavigate } from 'react-router-dom';
import Unread from './Unread';
import {useUserContext} from '../Contexts/UserContext';
import {getLastSeen,getLastSend,updateLastSeen} from '../Firebase/firebase-chatsystem';

function Friendbar({name,id,channelId}) {

  const navigate = useNavigate();
  const {user} = useUserContext();
  const [lastSeen,setLastSeen]=useState();
  const [lastSend,setLastSend]=useState();

  useEffect(()=>{
    let seen=getLastSeen(channelId,user.uid);
    let send=getLastSend(channelId,id);
    setLastSeen(seen.lastSeen);
    setLastSend(send.lastSend);
  });

  const onClickTab = () => {
    navigate('/chat',{state:{channelId:channelId,name:name,userId:user.uid,otherId:id}});
    updateLastSeen(channelId,user.uid);
  }

  const onClickUser = () => {
    navigate('/profile',{state:{id:id,friend:true}});
  }

  return (
    <Box sx={{ height: '10vh', width: '100%',borderBottom:'2px solid #4a6c7d', display: 'flex', alignItems: 'center', p:2,cursor:'pointer'}}>
      <Avatar onClick={(onClickUser)} {...stringAvatar(name)} />
      <Typography onClick={onClickTab} sx={{color:'white', fontSize: '3vh', p: 1,width:'85%'}}>{name}</Typography>
      {Number(lastSend)>Number(lastSeen) ? <Unread onClick={onClickTab}/> : null }
    </Box>
  )
}

export default React.memo(Friendbar);