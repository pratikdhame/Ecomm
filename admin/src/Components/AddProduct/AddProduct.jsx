import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null); // Store image as file
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  // Handle file input change
  const imageHandler = (e) => {
    setImage(e.target.files[0]); // Store selected file in state
  };

  // Handle text input changes
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  // Add product with image upload
  const Add_Product = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    let formData = new FormData();
    formData.append('product', image); // Add image to FormData
    formData.append('name', productDetails.name); // Add name to FormData
    formData.append('category', productDetails.category); // Add category to FormData
    formData.append('new_price', productDetails.new_price); // Add new price to FormData
    formData.append('old_price', productDetails.old_price); // Add old price to FormData

    try {
      const response = await fetch('https://ecomback-rho.vercel.app/addproduct', {
        method: 'POST',
        body: formData // Send form data, no need for additional headers
      });

      const data = await response.json();

      if (data.success) {
        alert('Product added successfully!');
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumbnail-img" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">ADD</button>
    </div>
  );
};

export default AddProduct;
