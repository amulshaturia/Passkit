import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios';
import swal from 'sweetalert';

const Login = () => {

    const preventRefresh = (e) => {
        e.preventDefault();
    }; 
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const submitSignUp = async (e) => {
        e.preventDefault()
    }

    const handelLogin = async (e) => {
        e.preventDefault()
        try {
            if(userName === "" && email === ""){
                swal("Enter usename" `or enter your email`, "failed");
            }
            else{
                const dt = await axios.post("https://passkit-five.vercel.app/user/login", {
                    userName, email, password
                }); 
 

                if(!dt["data"]["found"]){
                    swal("SORRY !", `No such user exists`, "failed");
                }
                else if(dt['data']['wrong_password']){
                    console.log("aaya to hei"); 
                    swal("wrong password", `check your password`, "failed");
                }   
                else if(!dt['data']["verified"]){
                    swal("Not varified", `check you Mail`, "failed");
                }
                else{
                    if (dt['data']['ok']) {
                        localStorage.setItem('jwt_token', dt['data']['token']) ;
                        localStorage.setItem('secret-key' , password) ;
                        localStorage.setItem('userName' , dt['data']['userName']) ; 
                        setUserName(""); 
                        setEmail(""); 
                        setPassword(""); 
                        navigate('/HomePage');
                    }
                    else swal("wrong credentials !", `please enter correct credentials`, "failed");
                }
            }
        }
        catch (e) {
            console.log(e);
            <h1>{e}</h1>
        }
    }

    const showPassword = (e) => {
        e.preventDefault(); 
        let passwordField = document.getElementById("passwordField");
        if (passwordField.type === "password") passwordField.type = "text";
        else passwordField.type = "password";
    }

    const GoSignUp = (e)=>{
        e.preventDefault(); 
        navigate("/Signup"); 
    }


    return (
        <div className="wrapper signIn">
            <div className="illustration">
                <img src="https://source.unsplash.com/random" alt="illustration" />
            </div>
            <div className="form">
                <div className="heading"><h1><b>LOGIN</b></h1></div>
                <form>
                    <div>
                        <label htmlFor="name"><h4>username</h4></label>
                        <input type="text" id="name" placeholder="Enter your username" onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div><br></br><h5>OR</h5></div>
                    <div>
                        <label htmlFor="e-mail"><h4>E-Mail</h4></label>
                        <input type="email" id="e-mail" onChange={(e) => setEmail(e.target.value)} placeholder="Enter you mail" />
                    </div>
                    <div>
                        <label htmlFor="name"><h4>password</h4></label>
                        <input type="password" id="passwordField" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                    </div>
                    <button type="submit" onClick={showPassword}>
                        Show Password
                    </button>
                    <button type="submit" onClick={handelLogin}>
                        Submit
                    </button>
                </form>
                <button type="button" className="btn btn-primary" onClick={GoSignUp}>
                    Don't Have Account
                </button>
            </div>
        </div>
    );

}

export default Login