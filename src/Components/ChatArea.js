import React, {useEffect, useRef} from 'react';
import {Box} from '@mui/material';

function ChatArea({children}) {

  //Scroll to Bottom
  const messageEndRef=useRef(null);

  useEffect(()=>{
    messageEndRef.current.scrollIntoView();
  },[children]);

  return (
    <Box sx={{height:'80vh',width:'100%',p:2,overflowY:'auto',display:'flex',flexDirection:'column'}} >
        {children}
        <div  ref={messageEndRef} />
    </Box >
  )
}

export default React.memo(ChatArea);