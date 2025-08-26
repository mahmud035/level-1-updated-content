const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
require('colors');
require('dotenv').config();

const port = process.env.PORT || 5000;

//* Middleware
app.use(cors());
app.use(express.json());

//* Database Connection
const uri = 'mongodb://127.0.0.1:27017/mongodb-conceptual';

const client = new MongoClient(uri);

const dbConnect = async () => {
  try {
    await client.connect();
    console.log(`Database Connected`.yellow.italic);

    app.listen(port, () => {
      console.log(`Server Up and Running`.cyan.bold);
    });
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);
  }
};
dbConnect();

//* Create Database Collections
const Product = client.db('mongodb-conceptual').collection('products');
const User = client.db('mongodb-conceptual').collection('users');

// ============ API REQUEST ============
//* GET
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}).toArray();

    if (products.length > 0) {
      res.send({
        success: true,
        message: 'Products found',
        data: products,
      });
    } else {
      res.send({
        success: false,
        message: 'No products found',
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);
  }
});

//* POST
app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const result = await Product.insertOne(product);

    if (result.insertedId) {
      res.send({
        success: true,
        message: 'Product added successfully',
      });
    } else {
      res.send({
        success: false,
        message: `Couldn't add the product`,
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);
  }
});

//* PUT / PATCH
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price } = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedObj = {
      $set: {
        title: title,
        price: price,
      },
    };
    const result = await Product.updateOne(filter, updatedObj, options);

    if (result.modifiedCount) {
      res.send({
        success: true,
        message: 'Product updated successfully',
      });
    } else {
      res.send({
        success: false,
        message: `Couldn't update the product`,
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);
  }
});

//* DELETE
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await Product.deleteOne(query);

    if (result.deletedCount) {
      res.send({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      res.send({
        success: false,
        message: `Couldn't delete the product`,
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);
  }
});
