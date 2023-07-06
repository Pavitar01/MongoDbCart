import React, { useEffect, useState } from "react";
import Addproduct from "./Addproduct";
import { v4 as uuidv4 } from "uuid"; //for unique id
import Cart from "./Cart";
import axios from "axios";

const Products = () => {
  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [add, setAdd] = useState(false);
  const [loggedInMail, setLoggedInMail] = useState("");

  useEffect(() => {
    const emails = localStorage.getItem("loggedInEmail");
    const user = JSON.parse(localStorage.getItem("User"));
    let r = "";
    if (user && user.length > 0) {
      const loggedInEmail = localStorage.getItem("loggedInEmail");
      const loggedInUser = user.find((user) => user.email === loggedInEmail);
      if (loggedInUser) {
        setLoggedInMail(loggedInEmail);
        setRole(loggedInUser.role);
        r = loggedInUser.role;
      }
    }

    // Load products from localStorage
    // const savedProducts = JSON.parse(localStorage.getItem("Products"));

    // if (savedProducts) {
    // setProducts(savedProducts);
    // }

    const prodShow = async () => {
      try {
        const prod = await axios.post("http://localhost:8000/getProduct", {
          email: emails,
        });
        setProducts(prod.data);
      } catch (err) {
        alert("error");
      }
    };
    const prod = async () => {
      try {
        const p = await axios.post("http://localhost:8000/getAllProduct");
        setProducts(p.data);
      } catch (err) {
        alert("error");
      }
    };
    r === "vendor" && prodShow();
    r === "admin" && prod();
    r === "customer" && prod();
  }, []);

  useEffect(() => {
    // Save products to localStorage whenever it changes
    localStorage.setItem("Products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = async () => {
    if (!newProductName || !newProductPrice || !newProductImage) {
      alert("Please enter all product details.");
      return;
    }

    const newProduct = {
      id: uuidv4(),
      name: newProductName,
      price: parseFloat(newProductPrice),
      image: newProductImage,
      AddedBy: loggedInMail,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProductName("");
    setNewProductPrice("");
    setNewProductImage("");

    await axios.post("http://localhost:8000/product", {
      pDetails: newProduct,
    });
  };

  const handleDeleteProduct = async (productId) => {
    console.log(productId)
    await axios.post("http://localhost:8000/delete", {id: productId});

    setProducts((prevProducts) =>
      prevProducts.filter((i) => i.id !== productId)
    );
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      if (cartItems[productId]) {
        // Product already exists
        const updatedCartItems = {
          ...cartItems,
          [productId]: {
            ...cartItems[productId],
            quantity: cartItems[productId].quantity + 1,
          },
        };
        setCartItems(updatedCartItems);
      } else {
        // Product doesn't exist in the cart, add it with quantity 1
        const newCartItem = {
          ...productToAdd,
          quantity: 1,
        };
        setCartItems((prevCartItems) => ({
          ...prevCartItems,
          [productId]: newCartItem,
        }));
      }
    }
  };

  return (
    <div className="products">
      <div className="items">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              className="productimg"
            />
            <p>Price: {product.price} &#8377;</p>
            {role === "admin" && (
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="btn"
                style={{ width: "100px" }}
              >
                Delete
              </button>
            )}
        

            {role === "customer" && (
              <button
                onClick={() => handleAddToCart(product.id)}
                className="btn"
                style={{ width: "100px", backgroundColor: "green" }}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
      {role === "admin" && (
        <button
          className="btn"
          style={{ width: "50px", height: "50px", margin: "20px" }}
          onClick={() => {
            add ? setAdd(false) : setAdd(true);
          }}
        >
          +
        </button>
      )}
      {role === "vendor" && (
        <button
          className="btn"
          style={{ width: "50px", height: "50px", margin: "20px" }}
          onClick={() => {
            add ? setAdd(false) : setAdd(true);
          }}
        >
          +
        </button>
      )}
      {role === "admin" && add && (
        <Addproduct
          handleAddProduct={handleAddProduct}
          setNewProductName={setNewProductName}
          setNewProductPrice={setNewProductPrice}
          setNewProductImage={setNewProductImage}
       
        />
      )}
      {role === "vendor" && add && (
        <Addproduct
          handleAddProduct={handleAddProduct}
          setNewProductName={setNewProductName}
          setNewProductPrice={setNewProductPrice}
          setNewProductImage={setNewProductImage}
        />
      )}
      {role === "customer" && <Cart cartItems={cartItems} handleDeleteProduct={handleDeleteProduct}/>}
    </div>
  );
};

export default Products;
