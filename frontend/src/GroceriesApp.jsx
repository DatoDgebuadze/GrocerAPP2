import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
import { products } from "./data/products";
import { useState, useEffect } from "react";
import axios from "axios"

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

  useEffect(() => {
    handleGetProducts();
  }, [])

  const handleGetProducts = async () => {

    await axios.get("http://localhost:3000/products").then((response) => { console.log(response.data) })
  }
  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

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