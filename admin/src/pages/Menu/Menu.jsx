import React, { useEffect, useState } from 'react'
import './Menu.css'
import { assets } from '../../assets/assets';
import axios from 'axios';

const Menu = () => {

  const url = 'http://localhost:4000';
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Espresso",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  useEffect(()=>{
    console.log(data);
  },[data])

  // API call
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", data.image);
    const response = await axios.post(`${url}/api/item/add`, formData);

    if (response.data.success) {
      setData({
          name: "",
          description: "",
          price: "",
          category: "Espresso",
      })
      setImage(false)
    }
    else {

    }
  }

  return (
    <div className='menu'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image) :assets.upload} alt='' />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </div>
        <div className="add-name flex-col">
          <p>Item</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Item Name'/>
        </div>
        <div className="add-description flex-col">
          <p>Description</p>
          <input onChange={onChangeHandler} value={data.description} type='text' name='description' placeholder='Item Description'/>
        </div>  
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select onChange={onChangeHandler} value={data.category} name='category'>
              <option value="Espresso">Espresso</option>
              <option value="Cappuccino">Cappuccino</option>
              <option value="Latte">Latte</option>
              <option value="Mocha">Mocha</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Price</p>
            <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='Price'/>
          </div>
        </div>   
        <button type='submit' className='add-button'>Add to Menu</button>   
      </form>
    </div>
  )
}

export default Menu
