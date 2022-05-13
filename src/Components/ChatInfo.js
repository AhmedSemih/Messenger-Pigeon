import React from 'react';
import {Box,Avatar,Typography} from '@mui/material';
import {ArrowBackIos} from '@mui/icons-material';
import {stringAvatar} from './AvatarGenerator';
import {useNavigate} from 'react-router-dom';

function ChatInfo({name,id}) {
  const navigate=useNavigate();

  const onClickAvatar=()=>{
    navigate('/profile',{state:{id:id,friend:true}});
  }

  return (
    <Box sx={{height:'10vh',width:'100%',backgroundColor:'#334257',display:'flex',alignItems:'center',p:1,borderBottom:'2px solid #4a6c7d',justifyContent:'space-between',color:'#548CA8'}}>
        <Box sx={{display:'flex',alignItems:'center'}}>
        <ArrowBackIos onClick={()=>navigate(-1)} sx={{ fontSize: '5vh', p: 1,cursor:'pointer'}}/>
        <Avatar onClick={onClickAvatar} {...stringAvatar(name ? name : "JohnDoe")}/>
        <Typography sx={{ fontSize: '3vh', p: 1,fontWeight:'600'}}>{name}</Typography>
        </Box>
    </Box>
  )
}

export default React.memo(ChatInfo);