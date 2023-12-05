import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
import InventoryForm from "./InventoryForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import product from "../../backend/models/product";


export default function GroceriesApp() {
  const [cartList, setCartList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  });
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    handleGetProducts();
  }, [responseData]);

  const handleGetProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductsList(response.data);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault(); // Corrected: You were missing the parentheses here
    try {
      // Include the id in the form data
      const productData = { ...formData, id: uuidv4() };

      // Submit the form data
      await axios.post("http://localhost:3000/addProduct", productData);

      setResponseData("Product successfully added!");
      setFormData({
        productName: "",
        brand: "",
        quantity: "",
        image: "",
        price: "",
      });
      // Optionally, you can also refresh the product list by calling handleGetProducts();
    } catch (error) {
      console.error("Error posting product:", error);
      setResponseData("Error adding product. Please try again.");
    }
  };

  const handleOnDelete = async (product) => {
    const id = product._id;
    axios.delete(`http://localhost:3000/product/${id}`)
      .then((response) => setResponseData(<p>{response.data}</p>))

  };



  const handleAddToCart = (item) => {
    setCartList((prevList) => [...prevList, { ...item, id: uuidv4() }]);
  };

  const handleEmptyCart = () => {
    setCartList([]);
  };

  const handleRemoveItem = (id) => {
    setCartList((prevList) => prevList.filter((i) => i.id !== id));
  };

  return (
    <>
      <h1>Groceries App</h1>
      <InventoryForm formData={formData} handleOnChange={(e) => setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))} handleOnSubmit={handleOnSubmit} />
      <p>{responseData}</p>
      <div className="GroceriesApp-Container">
        <InventoryCard list={productsList} onClick={handleAddToCart} handleOnDelete={handleOnDelete} />
        <CartList cartList={cartList} onClickEmpty={handleEmptyCart} onClickRemove={handleRemoveItem} />
      </div>
    </>
  );
}
