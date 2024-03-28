import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { login, register } from '../features/authSlice'
import { TextField } from '@mui/material'
import { createCart } from '../features/cartSlice'
import { Label } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {useGoogleLogin} from '@react-oauth/google'
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import OAuth from '../components/OAuth'

const registerSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().required("required").email("invalid email"),
    password: yup.string().required("required"),
    address: yup.string().required("required"),

}) 

const loginSchema = yup.object().shape({
    email: yup.string().required("required").email("invalid email"),
    password: yup.string().required("required"),
}) 

const inititialValueLogin = {
    email: "",
    password: "",
};

const inititialValueRegister = {
    name: "",
    email: "",
    password: "",
    addredd: ""
};


const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const loginMethod = async (values, onSubmitProps) => {
    console.log("Login Started")
    await dispatch(login({ email: values.email, password: values.password }));
    navigate('/products')
  };

  const registerMethod = async (values, onSubmitProps) => {
    console.log("Register")
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("address", values.address);

    await dispatch(register(formData))
    .then((res) => {
      console.log((res.payload.token))
      dispatch(createCart({'token': res.payload.token}))
    })
    .catch((err) => console.log(err))
    
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegister) await registerMethod(values, onSubmitProps);
    if (isLogin) await loginMethod(values, onSubmitProps);
  };

  function handleGoogleLoginSuccess(tokenResponse) {

    const googleToken = tokenResponse.access_token;
    const googleForm = {googleToken}
    console.log(googleToken)
    dispatch(login(googleForm))
    .then((res) => {
      console.log((res.payload.token))
      dispatch(createCart({'token': res.payload.token}))
    })
    .catch((err) => console.log(err))
  }
  
  const googleLogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

  return (
    <section>
      <div className="container">
        <div className="flex items-center flex-col">
          <h2 className="heading text-gray-600 text-center pb-4">{isLogin ? "Login Form" : "SignUp Form" }</h2>
          <div className="flex items-center mx-auto">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={isLogin ? inititialValueLogin : inititialValueRegister}
              validationSchema={isLogin ? loginSchema : registerSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form className="flex flex-col items-center mx-auto" onSubmit={handleSubmit}>

                  
                  <div >
                    {isRegister && (
                      <>
                        <div className='my-2 flex flex-col'>
                          <TextField   className=" w-[300px]"
                            label="Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name"
                            error={
                              Boolean(touched.name) && Boolean(errors.name)
                            }
                            helperText={touched.name && errors.name}
                          />
                        </div>

                        <div className='my-2'>
                          <TextField className=" w-[300px]"
                            label="Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="address"
                            error={Boolean(touched.address) && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                        
                          />
                        </div>
                        
                        
                      </>
                    )}
                    <div className='my-2'>
                      <TextField className=" w-[300px]"
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    
                      />
                    </div>        
                    
                    <div className='my-2'>
                      <TextField className=" w-[300px]"
                        label="Password"
                        type='password'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        
                      />
                    </div>
                    
                  </div>

                  <div className='mt-4'>
                    <button  type="submit" className="w-[300px] bg-blue-500 flex items-center justify-center mx-auto text-white px-5 py-3 border rounded-md">
                      {isLogin ? "LOGIN" : "REGISTER"}
                    </button>
                    <div></div>
                    <h5 className='text-center text-blue-500 mt-2 hover:cursor-pointer'
                      onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                      }}
                    >
                      {isLogin
                        ? "Don't have an account? Sign Up here."
                        : "Already have an account? Login here."}
                    </h5>
                    <div className='mt-2'>
                      <div className='mt-2'>
                        <OAuth />
                      </div>
                    </div>
                    
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
