import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './st.css';
import swal from 'sweetalert';


export default function PasswordList() {

    const navigate = useNavigate();
    axios.defaults.withCredentials=true
    const [username, setuserName] = useState("");
    const [email, setemail] = useState("");
    const [Passwords, setPasswords] = useState([]);
    const [detail, setDetail] = useState([])
    const [text, setText] = useState("");
    const [isSearch, setSearch] = useState(false);
    const [searchDetails, setSearchDetails] = useState([])

    const handleShow = (toShow)=>{
        let arr = document.getElementsByClassName("passwordField"); 
        for(let i = 0 ; i < arr.length ; i++){
            if(arr[i].id == toShow._id){
                if(arr[i].type == "password") arr[i].type = "text" ; 
                else arr[i].type = "password"; 
                break;
            }
        }
    }

    const callDelete = (toDelete) => {
        swal({
            title: "Are you sure?",
            text: "you want to delete this ?",
            icon: "warning",
            dangerMode: true,
        }).then(willDelete => {
                if (willDelete) {
                    try {
                        handleDelete(toDelete);
                    }
                    catch (err) {
                        swal("Sorry!", "can not be deleted!", "failed");
                    }
                }
            });
    }

    const handleDelete = async (entry) => {
        const response = await axios.post("http://localhost:8000/deletePassword", { del_id: entry._id }, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('jwt_token') || ""}`
            },
        });
        if (response['data']['del_ok']) {
            console.log(response['data']['del_ok']) ; 
            const newPasswords = Passwords.filter((password) => password !== entry);
            setPasswords(newPasswords);
            
            swal("Deleted!", `${entry.platform}'s password deleted`, "success");
        }
        else alert("can't delete"); 
    }

    const getData = async () => {
        console.log("inside get data"); 
        let bdy = {
            password: "",
            userName : ""
        }
        try {
            let jwtToken = localStorage.getItem('jwt_token');
            bdy.password = localStorage.getItem('secret-key');
            console.log(bdy.password)
            bdy.userName = localStorage.getItem('userName');
            console.log("sending token to server " + jwtToken);
            console.log("hello")
            console.log(bdy)
            const dt = await axios.post("http://localhost:8000/user/all", bdy, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('jwt_token') || ""}`
                },
            });

            if (dt['data']['tokenVarified']) {
                const arr = dt['data']['passwords'];
                setPasswords(dt['data']['passwords'])
                console.log(detail);
                console.log(arr);
            }
            else {
                alert("Your session expired ! please login");
                navigate('/');
            }
        }
        catch (e) {
            console.log("error : " + e);
        }
    }

    const copyToClipboard = (textToCopy)=>{
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
          alert('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          alert('Failed to copy text');
        });
    }

    useEffect(() => {
        console.log("uper")
        getData();
        console.log("niche")
    }, [])

    const handleAdd = () => {
        navigate("/Add");
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <input className="form-control me-2" style={{ width: "100%", fontSize : "21px"}} type="search" placeholder="Search" name="search" aria-label="Search" onChange={(e) => {
                    setText(e.target.value);
                }} />

                <button className="btn btn-outline-success search" style={{ color: "black", marginRight: "10px", fontSize: "21px" }} onClick={handleAdd}>+</button>
            </div>

            <div>
                {
                    Passwords.filter((data) => {
                        if (text === "" || data.platform.toLowerCase().includes(text.toLocaleLowerCase())) {
                            return true;
                        }
                        return false;
                    }).map((data) => {
                        return (
                            <li style={{ listStyle: "none" , width : "100%"}} >
                                <div className="container-fluid zoom " style={{ width: "100%"}}>
                                    <div className="card ">
                                        <h5 className="card-header title">{data.platform}</h5>
                                        <div className='x' >
                                            <div className="card-body">
                                                <div style={{ display: 'flex'}}>
                                                    <h5 style={{marginRight : "1.5%"  , marginTop : "1.5%"}}  className="card-title">Username </h5>
                                                    
                                                    <input type="text" value = {data.platformUserName} style={{fontSize : "21px" , width: "100%" , height : "fit-content"}}/>
                                                   
                                                    <div style={{justifyContent: 'right'}}>
                                                        <button style={{ backgroundColor: "white" , color : "black" , border : "none"}} type="button" className="btn btn-secondary btn-sm" onClick={(e) => {copyToClipboard(data.platformUserName)}} >copy</button>
                                                    </div>

                                                </div>

                                                <div style={{ display: 'flex'}}>
                                                    <h5 style={{marginRight : "2.5%"}} className="card-title">Password </h5>

                                                    <input id = {data._id} className = "passwordField" type="password" value = {data.platformPassword} style={{fontSize : "21px" , width: "100%" , height : "fit-content"}}/>
                                                   
                                                    <div style={{justifyContent: 'right'}}>
                                                        <button style={{ marginLeft : "0%" , backgroundColor: "white" , color : "black" , border : "none"}} type="button" className="btn btn-secondary btn-sm" onClick={(e) => {copyToClipboard(data.platformPassword)}}>copy</button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'right' }}>
                                                
                                                <button style={{ backgroundColor: "#6495ed" }} type="button" className="btn btn-primary btn-sm" onClick={(e) => {handleShow(data)} }>Show</button>

                                                <button style={{ backgroundColor: "red" }} type="button" className="btn btn-secondary btn-sm" onClick={(e) => { callDelete(data)}}>Delete</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                    )
                }
            </div>
        </>
    )
}
