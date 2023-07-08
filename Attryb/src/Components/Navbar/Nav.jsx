import React from 'react';
 import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div>
            <div style={{border:"2px solid teal",width:"100%",height:"80px",display:"flex",justifyContent:"space-evenly",backgroundColor:"teal",textDecoration:"none",marginBottom:"30px"}}>
            <Link to={"home"} style={{textDecoration:"none"}}>
            <h1>
              Home
            </h1>
            
            </Link>
            <Link to={"/cardetails"} style={{textDecoration:"none"}}>
            <h1>
              Car Details
            </h1>
            
            </Link>

          
            <Link to={"/"} style={{textDecoration:"none"}}>
            <h1>
              Login
            </h1>
            
            </Link>
            </div>
        </div>
    );
}

export default Nav;