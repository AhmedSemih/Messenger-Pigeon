import React from 'react';
import { Box, Typography } from '@mui/material';

function MessageBubble({ my, text, time }) {
  if (text) {
    return (
      <Box sx={{width:'100%',display:'flex',justifyContent:my ? 'end' : 'start'}}>
        <Box sx={{
          width: 'max-content',
          display: 'block',
          height: 'max-content',
          fontSize: '1.2rem',
          p: 2, my: 2,
          backgroundColor: my ? '#334257' : '#476072',
          color: 'white',
          maxWidth: '700px',
          borderRadius: '5px',
          mr: my ? 0 : 5,
          ml: my ? 5 : 0
        }}>
          {text}
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
            <Typography sx={{ color: '#bfbdbd' }}>{time}</Typography>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default React.memo(MessageBubble);