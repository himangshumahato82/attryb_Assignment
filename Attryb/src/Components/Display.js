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

  if (displayMode === 'details') {
    const selectedItem = data.find((item) => item.id === viewItemId);

    return (
      <div>
        <h1>Details</h1>
        <p>Title: {selectedItem.title}</p>
        <p>Price: {selectedItem.price}</p>
        <p>Mileage: {selectedItem.mileage}</p>
        <p>Color: {selectedItem.color}</p>
        <p>Image: {selectedItem.image}</p>
        <p>Bullet Points:</p>
        <ul>
          {selectedItem.bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Display Data</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Mileage</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{editItemId === item.id ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : item.title}</td>
              <td>{editItemId === item.id ? <input type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} /> : item.price}</td>
              <td>{editItemId === item.id ? <input type="text" value={editedMileage} onChange={(e) => setEditedMileage(e.target.value)} /> : item.mileage}</td>
              <td>{editItemId === item.id ? <input type="text" value={editedColor} onChange={(e) => setEditedColor(e.target.value)} /> : item.color}</td>
              <td>
                {editItemId === item.id ? (
                  <>
                    <button onClick={handleUpdateData}>Update</button>
                    <button onClick={() => setEditItemId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleViewDetails(item.id)}>View Details</button>
                    <button onClick={() => handleEditData(item.id)}>Edit</button>
                    <button onClick={() => handleDeleteData(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayData;
