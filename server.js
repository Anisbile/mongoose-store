// Require dependencies
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products');
// Initialize Express App
const app = express();

// Configure App Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (error) => console.log('MongoDB Error ' + error.message));

// Mount Middleware
app.use(express.urlencoded({ extended: false }))

// Seed
app.get("/products/seed", (req, res) => {
    Product.deleteMany({}, (error, AllProducts) => {})
  
    Product.create(productSeed, (error, data) => {
      res.redirect("/products")
    })
  })

// Index
app.get("/products", (req, res) => {
    Product.find({}, (error, AllProducts) => {
      res.render("index.ejs", {
        products: AllProducts,
      })
    })
})
// New
app.get("/products/new", (req, res) => {
    res.render("new.ejs")
})

// Delete
app.delete("/products/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/products")
    })
})

// Update
app.put("/products/:id", (req, res) => {
    AllProducts.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`)
      }
    )
  })

// Create Route
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
      res.redirect("/products")
    })
});

// Edit
app.get("/products/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
      res.render("edit.ejs", {
        product: foundProduct,
      })
    })
})

// Show
app.get("/products/:id", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
      res.render("show.ejs", {
        product: foundProduct,
      })
    })
})

//Buy

app.get("/products/:id/buy", (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
      res.render("buy.ejs", {
        product: foundProduct,
      })
    })
})
// Tell the App to listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => { 
    console.log(`Express is listening on port:${PORT}`);
});

