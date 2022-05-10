import React from 'react';
import {Box,Typography} from '@mui/material';
import {ArrowBackIos} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Info({children}) {
    const navigate=useNavigate();

  return (
    <Box sx={{height:'10vh',width:'100%',backgroundColor:'#334257',p:3,borderBottom:'2px solid #4a6c7d',display:'flex',alignItems:'center',color:'#548CA8'}}>
        <ArrowBackIos onClick={()=>navigate(-1)} sx={{ fontSize: '5vh', p: 1,cursor:'pointer'}}/>
        <Typography sx={{fontWeight:'600', fontSize: '3vh', p: 3}}>{children}</Typography>
    </Box>
  )
}

export default Info;