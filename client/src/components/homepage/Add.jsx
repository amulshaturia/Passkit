import React from 'react';
import { useEffect, useState } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";
import '../login/Login.css'
import axios from 'axios';
import swal from 'sweetalert';



const Add = () => {
    const preventRefresh = (e) => {
        e.preventDefault();
    }; 
    const data = {
        platform: '',
        platformUserName: '',
        platformPassword: '',
        password: ''
    }


    const [platform, setplatform] = useState("");
    const [platformUserName, setplatformUserName] = useState("");
    const [platformPassword, setplatformPassword] = useState("");
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();

        data.password = localStorage.getItem('secret-key') ; 
        data.platform = platform;
        data.platformPassword = platformPassword;
        data.platformUserName = platformUserName;
        
        try {
            const response = await axios.post("https://passkit-five.vercel.app/user/add",data, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('jwt_token') || ""}`
                },
            });

            if (response['data']['ok']) {
                swal("Added!", `${data.platform} added succesfully !`, "success");
            }
            else {
                swal("Failed!", `${data.platform}'s password cann't added , try later`, "failed");
            }
            navigate("/HomePage");
        }
        catch (err) {
            console.log("error while adding (frontend) : " + err);
        }
    }

    const showPassword = (e) => {
        e.preventDefault();
        let passwordField = document.getElementById("passwordField");
        if (passwordField.type === "password") passwordField.type = "text";
        else passwordField.type = "password";
    }

    return (
        <div className="wrapper signIn">
            <div className="illustration">
                <img src="https://source.unsplash.com/random" alt="illustration" />
            </div>
            <div className="form">
                <div className="heading"><h1><b>ADD PASSWORD</b></h1></div>
                <form>
                    <div>
                        <label htmlFor="name"><h4>Platform</h4></label>
                        <input type="text" id="Platform" placeholder="Enter plateform name" onChange={(e) => setplatform(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="name"><h4>Username</h4></label>
                        <input type="text" id="userName" placeholder="Enter plateform Username" onChange={(e) => setplatformUserName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="name"><h4>Password</h4></label>
                        <input type = "password" id="passwordField" placeholder="Enter plateform password" onChange={(e) => setplatformPassword(e.target.value)}/>
                    </div>
                    <button type="submit" onClick={showPassword}>Show Password</button>
                    <button type="submit" onClick={handleAdd}>Add</button>
                </form>
            </div>
        </div>
    );

}

export default Add