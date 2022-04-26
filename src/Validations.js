import * as yup from 'yup';

export const signupValidations=yup.object().shape({
    username:yup.string().min(5).max(20).required(),
    email:yup.string().email().required(),
    password:yup.string().min(5).max(20).required(),
    passwordConfirm:yup.string().oneOf([yup.ref("password")],'password and password confirm must be the same').required(),
    terms:yup.boolean().oneOf([true]).required(),
});

export const loginValidations=yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(5).max(20).required(),
})