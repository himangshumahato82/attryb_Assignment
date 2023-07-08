import React, { useEffect, useState } from 'react';

function DisplayData() {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedMileage, setEditedMileage] = useState('');
  const [editedColor, setEditedColor] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [editedBulletPoints, setEditedBulletPoints] = useState(['', '', '', '', '']);
  const [viewItemId, setViewItemId] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');

  const [priceFilter, setPriceFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [mileageFilter, setMileageFilter] = useState('');

  useEffect(() => {
    fetch("http://localhost:3002/data")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const handleViewDetails = (id) => {
    setViewItemId(id);
    setDisplayMode('details');
    console.log(`View details for item with ID: ${id}`);
  };

  const handleEditData = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setEditItemId(id);
    setEditedTitle(itemToEdit.title);
    setEditedPrice(itemToEdit.price);
    setEditedMileage(itemToEdit.mileage);
    setEditedColor(itemToEdit.color);
    setEditedImage(itemToEdit.image);
    setEditedBulletPoints(itemToEdit.bulletPoints);
  };

  const handleUpdateData = () => {
    // Find the item to be updated in the data array
    const updatedData = data.map((item) => {
      if (item.id === editItemId) {
        return {
          ...item,
          title: editedTitle,
          price: editedPrice,
          mileage: editedMileage,
          color: editedColor,
          image: editedImage,
          bulletPoints: editedBulletPoints
        };
      }
      return item;
    });

    // Update the data state with the edited values
    setData(updatedData);

    // After updating, reset the edit state
    setEditItemId(null);
    setEditedTitle('');
    setEditedPrice('');
    setEditedMileage('');
    setEditedColor('');
    setEditedImage('');
    setEditedBulletPoints(['', '', '', '', '']);
  };

  const handleDeleteData = (id) => {
    // Send a request to the server to delete the data item with the specified ID
    fetch(`http://localhost:3002/data/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
        // Update the data state by filtering out the deleted item
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      })
      .catch((error) => {
        console.log("Error deleting data:", error);
      });
  };

  const handleGoBack = () => {
    setDisplayMode('list');
    setViewItemId(null);
  };

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleColorFilterChange = (e) => {
    setColorFilter(e.target.value);
  };

  const handleMileageFilterChange = (e) => {
    setMileageFilter(e.target.value);
  };

  const filteredData = data.filter((item) => {
    if (priceFilter && item.price !== priceFilter) return false;
    if (colorFilter && item.color.toLowerCase() !== colorFilter.toLowerCase()) return false;
    if (mileageFilter && item.mileage !== mileageFilter) return false;
    return true;
  });

  if (displayMode === 'details') {
    const selectedItem = data.find((item) => item.id === viewItemId);

    return (
      <div>
        <div style={{ margin: "auto", display: "block", width: "40%", height: "auto", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", textAlign: "center" }}>
          <h1>Car Details</h1>
          <p>Title: {selectedItem.title}</p>
          <p>Price: {selectedItem.price}</p>
          <p>Mileage: {selectedItem.mileage}</p>
          <p>Color: {selectedItem.color}</p>
          <img src={selectedItem.image} alt={selectedItem.title} style={{ width: "200px", height: "auto" }} />
          <p>Bullet Points:</p>
          <ol style={{ width: "30%", margin: "auto", display: "block", textAlign: "left" }}>
            {selectedItem.bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ol>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", display: "block", margin: "auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Display all car details here</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>Price Filter:</label>
        <input type="text" value={priceFilter} onChange={handlePriceFilterChange} style={{width:"30%"}}/>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Color Filter:</label>
        <input type="text" value={colorFilter} onChange={handleColorFilterChange} style={{width:"30%"}}/>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Mileage Filter:</label>
        <input type="text" value={mileageFilter} onChange={handleMileageFilterChange} style={{width:"30%"}}/>
      </div>

      <div style={{ width: "80%", display: "block", margin: "auto" }}>
        <table style={{ display: "block", margin: "auto", textAlign: "center", padding: "0% 0%" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Title</th>
              <th style={{ padding: "10px" }}>Price</th>
              <th style={{ padding: "10px" }}>Mileage</th>
              <th style={{ padding: "10px" }}>Color</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
             <tr key={item.id}>
                <td style={{ padding: "10px" }}>{editItemId === item.id ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : item.title}</td>
                <td style={{ padding: "10px" }}>{editItemId === item.id ? <input type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} /> : item.price}</td>
                <td style={{ padding: "10px" }}>{editItemId === item.id ? <input type="text" value={editedMileage} onChange={(e) => setEditedMileage(e.target.value)} /> : item.mileage}</td>
                <td style={{ padding: "20px" }}>{editItemId === item.id ? <input type="text" value={editedColor} onChange={(e) => setEditedColor(e.target.value)} /> : item.color}</td>
                <td style={{ padding: "10px" }}>
                  {editItemId === item.id ? (
                    <input type="text" value={editedImage} onChange={(e) => setEditedImage(e.target.value)} />
                  ) : (
                    <img src={item.image} alt={item.title} style={{ width: "100px", height: "auto" }} />
                  )}
                </td>
                <td style={{ padding: "20px" }}>
                  {editItemId === item.id ? (
                    <div>
                      <button onClick={handleUpdateData}>Update</button>
                      <button onClick={() => setEditItemId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => handleViewDetails(item.id)}>View Details</button>
                      <button onClick={() => handleEditData(item.id)}>Edit</button>
                      <button onClick={() => handleDeleteData(item.id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayData;
