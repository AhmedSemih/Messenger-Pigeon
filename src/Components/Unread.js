import React from 'react';
import { Box } from '@mui/material';

function Unread() {
    return (
        <Box
            sx={{
                borderRadius: '50%',
                width: '4vh',
                height: '4vh',
                backgroundColor: '#548CA8',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>!</Box>
    )
}

export default React.memo(Unread)