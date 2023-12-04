import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
import { products } from "./data/products";
import { useState, useEffect } from "react";
import axios from "axios"
import InventoryForm from "./InventoryForm";
import product from "../../backend/models/product";

export default function GroceriesApp() {
  //   const [counter, setCounter] = useState(1);
  //   const addCounter = () => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   };

  //   const subtractCounter = () => {
  //     setCounter((prevCounter) => prevCounter - 1);
  //   };

  const [cartList, setCartList] = useState([]);
  const [products, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",

  });

  const [responseData, setResponseData] = useState(" ");

  // useEffect
  useEffect(() => {
    handleGetProducts();
  }, [])
// Get Products
  const handleGetProducts = async () => {

    await axios.get("http://localhost:3000/products").then((response) => { console.log(response.data) })
  };


// post products
const handlePostProduct = () => {
  const postProduct = {
    id: product.id,
    productName: product.productName,
    quantity: product.quantity,
    image: product.image,
    price: product.price,
  };

  axios
    .post("http://localhost:3000/addProduct", postProduct)
    .then((response) => {
      setResponseData(<p>{response.data}</p>);
      // Handle the response or perform additional actions if needed
    })
  
// adding to cart
  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

// Onchange Handler
const handleOnChange = (evt) => {
  const fieldName = evt.target.name;
  const fieldValue = evt.target.value;

  setFormData((prevData) => ({
    ...prevData,
    id: crypto.randomUUID(),
    [fieldName]: fieldValue,
  }));
};


// emptying cart
  const handleEmptyCart = () => {
    setCartList([]);
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };

  return (
    <>
      <h1>Groceries App</h1>
      <InventoryForm formData = {formData} handleOnChange={handleOnChange} handleOnSubmit = {
        handlePostProduct
      }/> 
      <div className="GroceriesApp-Container">
        <InventoryCard list={products} onClick={handleAddToCart} />
        <CartList
          cartList={cartList}
          onClickEmpty={handleEmptyCart}
          onClickRemove={handleRemoveItem}
        />
      </div>
    </>
  );
}
