import React from 'react';
 import { Link } from 'react-router-dom';
 import Button from '../../components/Button';
 import {  useNavigate } from "react-router-dom";
 import { useContext } from 'react';
 import { profileContext } from '../../context/myContext';
function Nav(props) {
    const { profile, setProfile } = useContext(profileContext);
    console.log(profile)
    const URL = "http://localhost:8080";
    const redirect = useNavigate();
    const logoutUser = () => {
      localStorage.removeItem("TALENT_BOX_TOKEN");
      setProfile({});
      redirect("/");
    };
    const Question=()=>{
      alert("Without Login you can't view question")
      if(Object.keys(profile).length > 0){
       
        redirect("/")
        
      }else{
        redirect("/login")
        
      }
    }



    return (
        <div>
              
        <div style={{border:"2px solid teal",width:"100%",height:"80px",display:"flex",justifyContent:"space-evenly",backgroundColor:"teal",textDecoration:"none",marginBottom:"30px"}}>
            
        
        
        <Link to={"home"} style={{textDecoration:"none"}} onClick={Question}>
            <h1 style={{marginTop:"20px"}}>
              Home
            </h1>
            
            </Link>
            <Link to={"/cardetails"} style={{textDecoration:"none"}} onClick={Question}>
            <h1 style={{marginTop:"20px"}}>
              Car Details
            </h1>
            
            </Link>
            {Object.keys(profile).length > 0 ? (
                <div className="profile">
                  <span>{profile.name}</span>
                  <img src={`${URL}/upload/${profile.imageUrl}`} alt="" />
                  <Button
                    className="logout-btn"
                    buttonText="LOGOUT"
                    onClick={logoutUser}
                  />
                </div>
              ) : (
                <div>
                  <Button buttonText="MENU" className="menu-btn" />
                  <Button buttonText="SIGN IN" onClick={() => redirect("/")} />
                </div>
              )}
            </div>
        </div>
    );
}

export default Nav;