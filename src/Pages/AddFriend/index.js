import React from 'react';
import Info from '../../Components/Info';
import {Box,Grid} from '@mui/material';
import FriendAdd from '../../Components/FriendAdd';
import FriendRequest from '../../Components/FriendRequest';

function AddFriend() {
  return (
    <Box sx={{width:'100%',height:'100vh',backgroundColor:'#548CA8'}}>
      <Info>Add Friend</Info>
      <Grid container>
        <Grid item xs={12} md={6} >
          <FriendAdd/>
        </Grid>
        <Grid item xs={12} md={6} >
          <FriendRequest/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddFriend;