import React, { useState } from "react";

const Colorpicker = () => {
  const [color, setColor] = useState("#6259a8");

  const handleColorChange = (e) => {
    setColor(e.target.value);
    document.documentElement.style.setProperty("--main-color", e.target.value);
  };

  return (
    <div style={{position:"absolute"}}>
      <input type="color" value={color} onChange={handleColorChange} />
    </div>
  );
};

export default Colorpicker;
