import React from 'react'
import { useNavigate } from "react-router-dom";
import './st.css'
import swal from 'sweetalert';

export default function Header(Props) {

    const navigate = useNavigate();

    const callLogout = ()=>{
        swal({
            title: "Are you sure?",
            text: "you want to Logout ?",
            icon: "warning",
            dangerMode: true,
        }).then(willLogout => {
                if (willLogout) {
                    try {
                        handleLogout();
                    }
                    catch (err) {
                        swal("Logout Failed", "Try Again !", "failed");
                    }
                }
        });
    }
    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('userName'); 
        localStorage.removeItem('secret-key'); 
        navigate('/');
    }
    const handleAdd = () => {
        navigate('/Add');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor : "#6495ed" , width : "100%"}}>
            <div className="container-fluid" style={{backgroundColor : "#6495ed" }}>
                <a className="navbar-brand" style={{fontSize : "41px" , fontFamily : "calibri" , color : "white"}} href="#">Passkit</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                    <li className="nav-item">
                    <button className="btn btn-outline-success logout" style={{color : "white" , fontSize : "21px" , fontWeight : "bold" , border : "none" , hover:{backgroundColor : "blue"} }}  onClick={callLogout}>Log out</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}
