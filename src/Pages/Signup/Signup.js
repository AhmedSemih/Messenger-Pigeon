import React from 'react';
import OpeningBG from '../../Components/OpeningBG';
import styles from './style.module.css';
import { NavLink } from 'react-router-dom';
import { Input, InputLabel, FormControl, Button, Checkbox, FormControlLabel,FormHelperText } from '@mui/material';
import { AccountCircle, Lock, Mail } from '@mui/icons-material';
import { useFormik } from 'formik';
import {signupValidations} from '../../Validations';
import {SignUp} from '../../Firebase/firebase-auths';
import {useNavigate} from 'react-router-dom';


function Signup() {

    //Redirect Hook
    const navigate=useNavigate();
    //Formik Hook
    const { values, handleSubmit, handleChange,errors,touched,handleBlur,resetForm,isValid} = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            terms: false
        },
        onSubmit: values => {
            SignUp(values.email,values.password,values.username,navigate);
            resetForm();
        },
        validationSchema:signupValidations,
    });

    return (
        <OpeningBG>
            <div className={styles.main}>
                <div className={styles.inputArea}>
                    <h1>Sign up</h1>
                    <FormControl margin='dense'>
                        <InputLabel htmlFor='username' >Username</InputLabel>
                        <Input id='username' 
                        value={values.username} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name='username'
                        className={styles.inputs} 
                        endAdornment={<AccountCircle />}                        
                        ></Input>
                        {touched.username && <FormHelperText sx={{color:'red'}}>{errors.username}</FormHelperText>}
                    </FormControl>
                    <FormControl margin='dense'>
                        <InputLabel htmlFor="email" >Email</InputLabel>
                        <Input id="email" 
                        name='email' 
                        value={values.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        className={styles.inputs} 
                        type="email" 
                        endAdornment={<Mail />}
                        ></Input>
                        {touched.email && <FormHelperText sx={{color:'red'}}>{errors.email}</FormHelperText>}
                    </FormControl >
                    <FormControl margin='dense'>
                        <InputLabel htmlFor='password' >Password</InputLabel>
                        <Input id='password' 
                        name='password' 
                        value={values.password} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        type='password' 
                        className={styles.inputs} 
                        endAdornment={<Lock />}
                        ></Input>
                        {touched.password && <FormHelperText sx={{color:'red'}}>{errors.password}</FormHelperText>}
                    </FormControl>
                    <FormControl margin='dense'>
                        <InputLabel htmlFor='passwordConfirm' >Password Confirm</InputLabel>
                        <Input id='passwordConfirm' 
                        name='passwordConfirm' 
                        value={values.passwordConfirm} 
                        type='password' 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        className={styles.inputs} 
                        endAdornment={<Lock />}
                        ></Input>
                        {touched.passwordConfirm && <FormHelperText sx={{color:'red'}}>{errors.passwordConfirm}</FormHelperText>}
                    </FormControl>

                    <FormControlLabel margin='dense' 
                    id='terms' 
                    name='terms'
                    checked={values.terms} 
                    onChange={handleChange} 
                    control={<Checkbox />} 
                    sx={{ marginTop: 3 }} 
                    className={styles.inputs} 
                    label="I agree the Terms of Service and Privacy Policy." />

                    <Button onClick={handleSubmit} 
                    disabled={!isValid} 
                    size='large' 
                    variant="contained" 
                    sx={{ margin: '1rem 0' }} 
                    className={styles.inputs} >Sign up</Button>

                    <p>Already have an account ?</p>
                    <NavLink className={styles.link} to="/login">Login</NavLink>

                </div>
            </div>
        </OpeningBG>
    )
}

export default Signup;