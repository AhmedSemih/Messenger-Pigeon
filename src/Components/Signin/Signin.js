import React from 'react';
import OpeningBG from '../OpeningBG';
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';
import { Input, InputLabel, FormControl, Button} from '@mui/material';
import { Lock, Mail } from '@mui/icons-material';
import { useFormik } from 'formik';
import {loginValidations} from '../../Validations'

function Signin() {

    const { values, handleSubmit, handleChange,resetForm,isValid} = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values)
            resetForm();
        },
        validationSchema:loginValidations,
    });

  return (
    <OpeningBG>
        <div className={styles.main}>
                <div className={styles.inputArea}>
                    <h1>Login</h1>
                    
                    <FormControl margin='normal'>
                        <InputLabel htmlFor="email" >Email</InputLabel>
                        <Input id="email" 
                        name='email' 
                        value={values.email} 
                        onChange={handleChange} 
                        className={styles.inputs} 
                        type="email" 
                        endAdornment={<Mail />}
                        ></Input>
                    </FormControl >
                    <FormControl margin='normal'>
                        <InputLabel htmlFor='password' >Password</InputLabel>
                        <Input id='password' 
                        name='password' 
                        value={values.password} 
                        onChange={handleChange} 
                        type='password' 
                        className={styles.inputs} 
                        endAdornment={<Lock />}
                        ></Input>
                    </FormControl>

                    <Button 
                    onClick={handleSubmit} 
                    disabled={!isValid} 
                    size='large' 
                    variant="contained" 
                    sx={{ margin: '1rem 0' }} 
                    className={styles.inputs} >Login</Button>

                    <p>Don't you have an account ?</p>
                    <NavLink className={styles.link} to="/login">Sign up</NavLink>

                </div>
            </div>
    </OpeningBG>
  )
}

export default Signin