import React, { useState } from 'react';
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import USER_AUTH from "../services/user-auth-api";
import { profileContext } from "../context/myContext";

import "./car.css"

function CarF(props) {
    const { setProfile } = useContext(profileContext);
    const token = localStorage.getItem("TALENT_BOX_TOKEN");
    console.log(token);
  
    const redirect = useNavigate();
    const getUser = async () => {
      const result = await USER_AUTH(token);
      console.log(result);
      if (result.status === 200) {
        setProfile(result.data.user);
      } else {
        alert(result.response.data.message);
      }
    };
    useEffect(() => {
      if (token) {
        getUser();
      } else {
       
        console.log("hello");
        redirect("/login");
      }
    }, [token]);
  
    // fetch Course data from mongo
    
    
  






  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const [bulletPoints, setBulletPoints] = useState(['', '', '', '', '']);

  const handleClick = (e) => {
    e.preventDefault();

    if (!title || !price || !mileage || !color || !image || bulletPoints.some(point => !point)) {
      alert('Please fill in all required fields.');
      return;
    }

    const obj = {
      title: title,
      price: price,
      mileage: mileage,
      color: color,
      image: image,
      bulletPoints: bulletPoints
    };

    fetch("http://localhost:3002/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleBulletPointChange = (index, e) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints[index] = e.target.value;
    setBulletPoints(newBulletPoints);
  };

  return (
    <div className='container'>
      <h1>Enter Car Details</h1>
      <form onSubmit={handleClick}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required  style={{height:"30px",borderRadius:"10px",marginRight:"22%",border:"none",fontSize:"15px",padding:"5px"}}/>
        <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="Mileage" required style={{height:"30px",borderRadius:"10px",border:"none",fontSize:"15px",padding:"5px"}} />

        <div>
          <label>Bullet Points:</label>
          {bulletPoints.map((bulletPoint, index) => (
            <div key={index}>
              <input
                type="text"
                value={bulletPoint}
                onChange={(e) => handleBulletPointChange(index, e)}
                placeholder={`Bullet Point ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" required />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />

        <button type="submit" className='bt'>Submit</button>
      </form>
    </div>
  );
}

export default CarF;
