import React, { useState } from 'react';
import DisplayData from './Display';

function CarF(props) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
 
  const [bulletPoints, setBulletPoints] = useState(['', '', '', '', '']);
 

  const handleClick = (e) => {
    e.preventDefault();

    const obj = {
      title: title,
      price: price,
      mileage: mileage,
      color: color,
      image: image,
      bulletPoints:bulletPoints
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
    <div>
      <form onSubmit={handleClick}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="Mileage" />

        <div>
          <label>Bullet Points:</label>
          {bulletPoints.map((bulletPoint, index) => (
            <div key={index}>
              <input
                type="text"
                value={bulletPoint}
                onChange={(e) => handleBulletPointChange(index, e)}
                placeholder={`Bullet Point ${index + 1}`}
              />
            </div>
          ))}
        </div>

        

        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Color" />

        

        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />

        <button type="submit">Submit</button>
      </form>

      <DisplayData />
    </div>
  );
}

export default CarF;
