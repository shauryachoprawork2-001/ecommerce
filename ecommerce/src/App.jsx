import "./App.css";
import React, { useState } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart.jsx";
import Ecomm from "./Components/Ecomm.jsx";
import AddProduct from "./Components/AddProduct";
import Product from "./Components/Product";
import UpdateProduct from "./Components/UpdateProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar onSelectCategory={handleCategorySelect} />
        <Routes>
          <Route
            path="/"
            element={<Home addToCart={addToCart} selectedCategory={selectedCategory} />}
          />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/update_product/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ecomm" element={<Ecomm />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;