const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://pavitar1127:fEXxyG8u1sQe2O9k@cluster0.jkawfeb.mongodb.net/Store"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB");
  });

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  image: String,
  Date: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  image: String,
  AddedBy: String,
  Date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UsersSchema);
const Product = mongoose.model("Product", productSchema);
app.post("/user", async (req, res) => {
  const createUsers = async () => {
    try {
      const userPresent = await User.exists({ email: req.body.email });
      if (userPresent) {
        res.send("User Already Exists");
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
          image: req.body.image,
        });
      }
    } catch (err) {
      res.status(500);
      res.send("Some Error Is In Database");
    }
  };
  createUsers();
});
app.post("/product", async (req, res) => {
  Product.create({
    id: req.body.pDetails.id,
    name: req.body.pDetails.name,
    price: req.body.pDetails.price,
    image: req.body.pDetails.image,
    AddedBy: req.body.pDetails.AddedBy,
  });
});

app.post("/getProduct", (req, res) => {
  console.log(req.body);
  Product.find({ AddedBy: req.body.email }).then((resp) => {
    res.send(resp);
  });
});

app.post("/delete", (req, res) => {
  console.log(req.body.id);
  Product.deleteOne({ id: req.body.id }).then(() => {
    res.send("delete");
  });
});
app.post("/getAllProduct", (req, res) => {
  console.log(req.body);
  Product.find({}).then((resp) => {
    res.send(resp);
  });
});

app.listen(8000, () => {
  console.log("Server Is Listening at post 8000");
});
