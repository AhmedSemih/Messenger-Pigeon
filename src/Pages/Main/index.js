import React from 'react';
import {Grid} from '@mui/material';
import Menu from '../Menu';
import {Routes,Route} from 'react-router-dom';
import Chat from '../Chat';
import Settings from '../Settings';
import AddFriend from '../AddFriend';
import NotFound from '../NotFound';
import Profile from '../Profile';

function Main() {
  
    return (
      <Grid container >
        <Grid item xs={12} md={3.5} >
        <Menu/>
        </Grid>
        <Grid item xs={12} md={8.5}>
          <Routes>
            <Route exact path='/' element={<AddFriend/>}/>
            <Route exact path='/chat' element={<Chat/>}/>
            <Route exact path='/settings' element={<Settings/>}/>
            <Route exact path='/addfriend' element={<AddFriend/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Grid>
      </Grid>
    )
  
 
 
}

export default Main