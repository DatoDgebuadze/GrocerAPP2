//  1) imports and definitions
const express = require("express");
const server = express();
const { request, response } = require("http")
const cors = require("cors")
const mongoose = require("mongoose")

const Product = require("./models/product")
const port = 3000;
const db_uri = "mongodb+srv://dgebu:dato@cluster0.r24wlx5.mongodb.net/products?retryWrites=true&w=majority";
////////Middleware


server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(cors())




// database connections

mongoose.connect(db_uri)
    .then((result) => {
        server.listen(port, () => {
            console.log(`Listening On ${port} and db successfully connected`); // backtick `  `
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });







server.get("/", (request, response) => {
    response.send("LIVE!!!!");
});


server.get("/products", async (request, response) => {
    const products = await Product.find();
    response.send(products);
});


server.post(".addProduct", async (request, response) =>{
    const product = request.body
    const postProduct = new Product({
        id: product.id,
        productName: product.productName,
        brand: product.brand,
        quantity: product.quantity,
        image: product.image, 
        price: product.price
    });

    const saveProduct = await postProduct.save()
    saveProduct ? response.send("Product is added to inventory") 
    : response.send("Failed to add!!!")
});
