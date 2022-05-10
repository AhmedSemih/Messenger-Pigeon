import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import { stringAvatar } from './AvatarGenerator';
import { useNavigate } from 'react-router-dom';
import { DoDisturb, Done, Add } from '@mui/icons-material';
import { getFriendRequests, sendFriendRequest, acceptFriendRequest, declineFriendRequest } from '../Firebase/firebase-database';
import Swal from 'sweetalert2';
import { getUserData, getFriends } from '../Firebase/firebase-database';
import { useUserContext } from '../Contexts/UserContext'

function AddFriendbar({ name, request, uid, senderId, clickAnswer }) {

    const navigate = useNavigate();
    const { user } = useUserContext();

    const [username, setUsername] = useState();
    const [userId, setUserId] = useState();
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {

        //Get Username
        var userData = getUserData(user.uid);
        setUsername(userData.username);

        //Get UserId
        setUserId(user.uid);

        //Friend Check
        const friends = getFriends(user.uid);
        friends.forEach((friend) => {
            if (friend.name === name) {
                setIsFriend(true);
            }
        });
    }, []);

    const onClickUser = () => {
        navigate('/profile');
    }

    const onClickAdd = () => {
        const data = getFriendRequests(uid);
        var isSent = false;
        data.forEach((data) => {
            if (data.senderId === userId) {
                isSent = true;
            }
        })
        if (!isSent) {
            sendFriendRequest(uid, userId, username);
            Swal.fire({
                background: '#334257',
                color: '#fff',
                position: 'bottom',
                icon: 'success',
                title: 'Friend request sent successfully',
                showConfirmButton: false,
                timer: 1000
            });
        }
        else {
            Swal.fire({
                background: '#334257',
                color: '#fff',
                position: 'bottom',
                icon: 'error',
                title: 'You have already sent a request to ' + name,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    const onClickAccept = () => {

        Swal.fire({
            background: '#334257',
            color: '#fff',
            icon: 'question',
            title: 'Do you want to accept this request?',
            showCancelButton: true,
            confirmButtonText: 'Yes'

        }).then((result) => {
            if (result.isConfirmed) {
                acceptFriendRequest(userId, username, senderId, name);
                clickAnswer(true);
            }
        })
    }

    const onClickDecline = () => {
        
        Swal.fire({
            background: '#334257',
            color: '#fff',
            icon: 'question',
            title: 'Do you want to decline this request?',
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                declineFriendRequest(userId, senderId);
                clickAnswer(true);
            }
        })

    }

    const onClickFriend=()=>{
        navigate('/chat');
    }

    return (
        <Box id="sender" sx={{ height: '10vh', width: '100%', borderBottom: '2px solid #4a6c7d', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar onClick={(onClickUser)} {...stringAvatar(name)} />
            <Typography onClick={isFriend ? onClickFriend : null} sx={{ color: 'white', fontSize: '3vh', p: 1, width: '85%' }}>{name}</Typography>
            {request ?
                <Box sx={{ display: "flex", flexDirection: 'column', color: '#334257' }}>
                    <IconButton onClick={onClickAccept} size='small'><Done sx={{ fontSize: '4vh' }} /></IconButton>
                    <IconButton onClick={onClickDecline} size='small'><DoDisturb sx={{ fontSize: '3.5vh' }} /></IconButton>
                </Box>
                : isFriend ? null : <IconButton onClick={onClickAdd} size='small'><Add sx={{ color: '#334257', fontSize: '5vh' }} /></IconButton>}
        </Box>
    )
}

export default AddFriendbar;