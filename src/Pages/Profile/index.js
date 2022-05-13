import React, { useEffect, useState } from 'react';
import { Box, Avatar, Grid, Typography, Button } from '@mui/material';
import Info from '../../Components/Info';
import { stringAvatar } from '../../Components/AvatarGenerator';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserData, sendFriendRequest, removeFriend, getFriendRequests, acceptFriendRequest } from '../../Firebase/firebase-database';
import { useUserContext } from '../../Contexts/UserContext';
import Swal from 'sweetalert2';

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUserContext();
  const [username, setUsername] = useState("");
  const [info, setInfo] = useState("");
  const [isFriend, setIsFriend] = useState(false);
  const [senderName, setSenderName] = useState("");

  useEffect(() => {

    //Get Sender Name
    const sender = getUserData(user.uid);
    setSenderName(sender.username);

    //Get Profile Data
    if (location.state.id) {
      const user = getUserData(location.state.id);
      setIsFriend(location.state.friend);
      setUsername(user.username);
      setInfo(user.info);
    }
    else {
      navigate("addfriend");
    }
  }, [location.state.id, location.state.friend]);

  const clickAddFriend = () => {
    var hasRequest = false;
    const requests = getFriendRequests(user.uid);

    requests.forEach((request) => {
      if (request.senderId === location.state.id) {
        hasRequest = true;
      }
    });

    if (hasRequest) {
      acceptFriendRequest(user.uid, senderName, location.state.id, username);
      setIsFriend(true);
      Swal.fire({
        background: '#334257',
        color: '#fff',
        position: 'bottom',
        icon: 'success',
        title: 'Friend Added',
        showConfirmButton: false,
        timer: 1000
      });
    }
    else {
        sendFriendRequest(location.state.id, user.uid, senderName);
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
  }

  const clickRemoveFriend = () => {
    removeFriend(user.uid, location.state.id);
    setIsFriend(false);
    Swal.fire({
      background: '#334257',
      color: '#fff',
      position: 'bottom',
      icon: 'success',
      title: 'Removed from your friends',
      showConfirmButton: false,
      timer: 1000
    });
  }


  return (
    <Box sx={{ backgroundColor: '#548CA8', minHeight: '100vh' }}>
      <Info>{`${username}'s Profile`}</Info>
      <Box sx={{ maxWidth: 800, m: 'auto', pt: 10 }}>
        <Grid container>
          <Grid item xs={12} md={4} >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar {...stringAvatar(username ? username : "JohnDoe", '25vh')} />
            </Box>
          </Grid>
          <Grid item xs={12} md={8} >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, ml: 3 }}>
              <Typography sx={{ fontSize: '3vh', fontWeight: '700' }}>{username}</Typography>
              <Typography sx={{ mt: 3, fontSize: '2.7vh' }}>{info}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              {isFriend ?
                <Button variant='contained' onClick={clickRemoveFriend} sx={{ backgroundColor: '#334257' }}>Remove From Your Friends</Button>
                :
                <Button variant='contained' onClick={clickAddFriend} sx={{ backgroundColor: '#334257' }}>Add Friend</Button>}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Profile;