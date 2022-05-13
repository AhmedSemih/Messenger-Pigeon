import React, { useEffect, useState } from 'react';
import { Box, Grid, Avatar, TextField ,Button} from '@mui/material';
import { stringAvatar } from './AvatarGenerator';
import {useUserContext} from '../Contexts/UserContext';
import {getUserData,updateUser} from '../Firebase/firebase-database';
import Swal from 'sweetalert2'

function ProfileEdit() {
    
    const {user} =useUserContext();
    
    const [avatarText,setAvatarText] = useState();
    const [username,setUsername] = useState(user.uid);
    const [info,setInfo] = useState();

    useEffect(()=>{
        const data=getUserData(user.uid);
        setUsername(data.username);
        setInfo(data.info);
        setAvatarText(data.username);
    },[user]);

    const onChangeUsername=(e)=>{
        setUsername(e.target.value);
    };
    const onChangeInfo=(e)=>{
        setInfo(e.target.value);
    };

    const clickSave=()=>{
        let userId=user.uid;
        updateUser(userId,username,info);
        setAvatarText(username);

        Swal.fire({
            icon:'success',
            title:'Successfully Saved',
            background: '#334257',
            color: '#fff',
            showConfirmButton:false,
            timer:1000,
            position:'bottom'
        });
    };
    const clickCancel=()=>{
        const data=getUserData(user.uid);
        setUsername(data.username);
        setInfo(data.info);
    };

    return (
        <Box sx={{ maxWidth: 600, m: 'auto', pt: 10 }}>
            <Grid container>
                <Grid item xs={12} md={4} >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar {...stringAvatar(avatarText ? avatarText : "MP", '20vh')} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={8} >
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                        <TextField
                            label="Username"
                            variant="standard"
                            value={username}
                            onChange={onChangeUsername}
                            inputProps={{ maxLength: 15 }}
                        />
                        <TextField
                            label="Information"
                            multiline
                            maxRows={3}
                            variant="standard"
                            value={info}
                            onChange={onChangeInfo}
                            sx={{ mt: 3 }}
                            inputProps={{ maxLength: 60 }}
                        />
                    </Box>
                    <Box sx={{textAlign:'center'}}>
                    <Button onClick={clickCancel} variant="text" sx={{color:'#334257',fontWeight:'700',mr:1}}>Cancel</Button>
                    <Button onClick={clickSave} variant="contained" sx={{color:'white',backgroundColor:'#334257',fontWeight:'700'}}>Save Changes</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default React.memo(ProfileEdit);