import React from 'react';
import {Box} from '@mui/material';
import Info from '../../Components/Info';
import ProfileEdit from '../../Components/ProfileEdit';

function Settings() {
  return (
    <Box sx={{width:'100%',height:'100vh',backgroundColor:'#548CA8'}}>
      <Info>Settings</Info>
      <ProfileEdit />
    </Box>
  )
}

export default Settings;