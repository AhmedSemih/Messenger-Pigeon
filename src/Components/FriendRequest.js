import React,{useEffect, useState} from 'react';
import { Box, Typography } from '@mui/material';
import AddFriendbar from './AddFriendbar';
import {getFriendRequests} from '../Firebase/firebase-database';
import {useUserContext} from '../Contexts/UserContext';

function FriendRequest() {

    const {user} = useUserContext();
    const [requestArray,setRequestArray]=useState([]);
    const [answered,setAnswered]=useState(false);

    useEffect(() => {
        setRequestArray([]);
        let requests=getFriendRequests(user.uid);
        setRequestArray(requests);
        
    },[answered]);

    const clickAnswer=(answer)=>{
        setAnswered(answer);
    }
    

    return (
        <Box sx={{ px: 2,backgroundColor:'#548CA8'}}>
            <Typography sx={{ height: '10vh', textAlign: 'center', color: '#334257',pt:1, fontSize: '5vh', borderBottom: '2px solid #4a6c7d' }}>Friend Requests</Typography>
            {requestArray.map((request)=>{
                return <AddFriendbar key={request.senderId} name={request.senderName} senderId={request.senderId} padding={0} request={true} clickAnswer={clickAnswer} ></AddFriendbar>
            })}
        </Box>
    )
}

export default React.memo(FriendRequest);