import React from 'react';
import { Box } from '@mui/material';
import { FlutterDash, SettingsOutlined, Logout, PersonAddOutlined } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignOut } from '../Firebase/firebase-auths';

function TopMenu() {
    const navigate = useNavigate();

    const clickLogout = () => {
        SignOut();
        navigate('/login');
    }

    return (
        <Box sx={{ width: '100%', height: '10vh', backgroundColor: '#334257', display: 'flex', alignItems: 'center', p: 1, justifyContent: 'space-between', borderBottom: '2px solid #4a6c7d' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FlutterDash sx={{ color: '#548CA8', fontSize: '6vh' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NavLink to="/addfriend">
                    <PersonAddOutlined sx={{ color: '#548CA8', fontSize: '5vh' }} />
                </NavLink>
                <NavLink to="/settings">
                    <SettingsOutlined sx={{ color: '#548CA8', fontSize: '5vh', m: '1rem' }} />
                </NavLink>
                <Logout onClick={clickLogout} sx={{ color: '#548CA8', fontSize: '4.5vh', marginBottom: 1, cursor: 'pointer' }} />
            </Box>
        </Box>
    )


}

export default React.memo(TopMenu);