import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios';
import swal from 'sweetalert';


const Signup = () => {

    const preventRefresh = (e) => {
        e.preventDefault();
    }; 
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handelSignUp = async (e) => {
        e.preventDefault()
        if(!userName || !email || !password){
            swal("SORRY !", `All fields are mandatory`, "failed");
        }
        else{
            const data = await axios.post("https://passkit-five.vercel.app/user/register", {
                userName, email, password
            })
            console.log(data) ; 
            if(data['data']['takenUserName']){
                swal("username already taken!", `please choose other username`, "failed");
            }
            else if(data['data'].usedEmail){
                swal("Email already registered!", `this Email is already registered !`, "failed");
            }
            else{
                swal("registered !", `please ,check your Gmail to varify yourself`, "success");
                navigate("/Login");
            }
        }
    }
    const showPassword = (e) => {
        e.preventDefault(); 
        let passwordField = document.getElementById("passwordField");
        if (passwordField.type === "password") passwordField.type = "text";
        else passwordField.type = "password";
    }
    const GoLogin = (e)=>{
        e.preventDefault(); 
        navigate("/Login"); 
    }

    return (
        <div className="wrapper signUp">
            <div className="illustration">
                <img src="https://source.unsplash.com/random" alt="illustration" />
            </div>
            <div className="form">
                <div className="heading">CREATE AN ACCOUNT</div>
                <form>
                    <div>
                        <label htmlFor="name"><h4>username</h4></label>
                        <input type="text" id="name" placeholder="Enter your username" onChange={(e) => setUserName(e.target.value)} />
                    </div>
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
                    <button type="submit" onClick={handelSignUp}>
                        Submit
                    </button>
                </form>
                <button type="button" className="btn btn-primary" onClick={GoLogin}>
                    Already have an account
                </button>
            </div>
        </div>
    );
}

export default Signup