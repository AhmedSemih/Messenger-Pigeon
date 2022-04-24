import React from 'react';
import OpeningBG from '../OpeningBG';
import styles from './style.module.css';
import {NavLink} from 'react-router-dom';
import { Input,InputLabel,FormControl,Button,Checkbox,FormControlLabel} from '@mui/material';
import {AccountCircle,Lock,Mail} from '@mui/icons-material';




function Signup() {
    return (
        <OpeningBG>
            <div className={styles.main}>
                <div className={styles.inputArea}>
                <h1>Sign up</h1>
                    <FormControl margin='dense'>
                        <InputLabel htmlFor='uname' sx={{color:"black",fontWeight:"700"}}>Username</InputLabel>
                        <Input id='uname' className={styles.inputs} endAdornment={<AccountCircle/>}></Input>
                    </FormControl>
                    <FormControl margin='dense'>
                        <InputLabel htmlFor="email" sx={{color:"black",fontWeight:"700"}}>Email</InputLabel>
                        <Input id="email" className={styles.inputs} type="email" endAdornment={<Mail/>}></Input>
                    </FormControl >
                    <FormControl margin='dense'>
                        <InputLabel htmlFor='pass' sx={{color:"black",fontWeight:"700"}} >Password</InputLabel>
                        <Input id='pass' type='password' className={styles.inputs} endAdornment={<Lock/>}></Input>
                    </FormControl>
                    <FormControl margin='dense'>
                        <InputLabel htmlFor='passconfirm' sx={{color:"black",fontWeight:"700"}} >Password Confirm</InputLabel>
                        <Input id='passconfirm' type='password' className={styles.inputs} endAdornment={<Lock/>}></Input>
                    </FormControl>
                    <FormControlLabel margin='dense' control={<Checkbox />} sx={{marginTop:3}} className={styles.inputs} label="I agree the Terms of Service and Privacy Policy."/>
                    <Button  size='large' variant="contained" sx={{margin:'1rem 0'}} className={styles.inputs} >Sign up</Button>
                    
                    <h3>Already have an account ?</h3>
                    <NavLink className={styles.link} to="/login">Login</NavLink>
                    
                </div>
            </div>
        </OpeningBG>
    )
}

export default Signup;