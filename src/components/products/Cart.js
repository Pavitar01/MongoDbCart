import { useState } from "react";
import Success from "../Success";

const Cart = ({ cartItems }) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState('Buy');
  const [val, setVal] = useState({});
  const AddItems = (e) => {
    setVal(e);
  };
  const del = (i) => {
    
  };
  return (
    <div className="cart" style={{ overflow: "scroll" }}>
      <h2>Cart</h2>
      {Object.values(cartItems).map((cartItem) => (
        <div key={cartItem.id} className="cart-item">
          <h3>{cartItem.name}</h3>
          <img
            src={cartItem.image}
            alt={cartItem.name}
            className="productimg"
          />
          <p>Price: {cartItem.price} &#8377;</p>
          <p>Quantity: {cartItem.quantity}</p>
          <button
            onClick={() => {
              toggle ? setToggle(false) : setToggle(true);
              del(cartItem.id);
              setText("Bought")
              
              AddItems({
                id: cartItem.id,
                Image: cartItem.image,
                price: cartItem.price,
              });
            }}
            disabled={toggle&&true}
          >
          {text}

          </button>
        </div>
      ))}
      {toggle && <Success val={val} />}
    </div>
  );
};
export default Cart;
