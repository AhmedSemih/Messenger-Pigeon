import React, { useState } from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import { Send } from '@mui/icons-material';
import { sendMessage } from '../Firebase/firebase-chatsystem';

function ChatInput({ channelId, userId,isSend}) {

    const [message, setMessage] = useState("");

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (message !== null || message !== undefined || message !== "" || message !== " ") {
            sendMessage(channelId, userId, message);
            isSend(message);
            setMessage("");
        }
    }

    return (
        <Box sx={{ width: '100%', height: '10vh', backgroundColor: '#334257', borderTop: '2px solid #4a6c7d', p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", height: '5vh', borderRadius: '1rem', backgroundColor: '#548CA8' }}>
                <InputBase
                    sx={{ ml: 1, flex: 1, color: '#fff', fontSize: '1.3rem' }}
                    value={message}
                    onChange={onChange}
                />
                <IconButton sx={{ p: '10px', color: '#334257' }}>
                    <Send />
                </IconButton>
            </Box>
        </Box>
    )
}

export default React.memo(ChatInput);