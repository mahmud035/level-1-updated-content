const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
require('colors');

const PORT = process.env.PORT || 5000;

//* Middleware
app.use(cors());
app.use(express.json());

//* Connect with MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yeflywl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const dbConnect = async () => {
  try {
    await client.connect();
    console.log(`Database Connected`.yellow.italic);
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);
  }
};
dbConnect();

//* Create Database Collections
const Products = client.db('curdOperation').collection('products');
const Users = client.db('crudOperation').collection('users');

// ============ API REQUEST ============
//* GET
// get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Products.find({}).toArray();
    // console.log(products);

    if (products.length > 0) {
      res.send({
        success: true,
        message: 'Products found',
        data: products,
      });
    } else {
      res.send({
        success: false,
        message: 'Products not found',
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);

    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get single product
app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const product = await Products.findOne(query);

    if (product) {
      res.send({
        success: true,
        message: 'Product found',
        data: product,
      });
    } else {
      res.send({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);

    res.send({
      success: false,
      message: error.message,
    });
  }
});

//* POST
// add a product
app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const result = await Products.insertOne(product);
    // console.log(result);

    // undefined.null();

    if (result.insertedId) {
      res.send({
        success: true,
        message: `Successfully created the product`,
      });
    } else {
      res.send({
        success: false,
        message: `Failed to create the product`,
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);

    res.send({
      success: false,
      message: error.message,
    });
  }
});

//* PUT / PATCH
// update a product
app.put('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const product = req.body;
    const options = { upsert: true };
    const updatedProduct = {
      $set: {
        name: product.name,
        price: product.price,
        image: product.image,
      },
    };
    const result = await Products.updateOne(filter, updatedProduct, options);

    if (result.modifiedCount) {
      res.send({
        success: true,
        message: 'Product updated successfully',
      });
    } else {
      res.send({
        success: false,
        message: 'Product did not updated!! Something went wrong',
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);

    res.send({
      success: false,
      message: error.message,
    });
  }
});

//* DELETE
// delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);

    // first get the product (to check if product already exists)
    const product = await Products.findOne({ _id: new ObjectId(id) });

    if (!product?._id) {
      res.send({
        success: false,
        message: `Product doesn't exist`,
      });
      return;
    }

    const query = { _id: new ObjectId(id) };
    const result = await Products.deleteOne(query);

    if (result.deletedCount === 1) {
      res.send({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      res.send({
        success: false,
        message: `Can't delete the product. Please Try again`,
      });
    }
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold, error.stack);

    res.send({
      success: false,
      message: error.message,
    });
  }
});

//* Global Error Handling
app.use((error, req, res, next) => {
  console.log(error.name.bgRed, error.message.bold, error.stack);
  res.status(500).send(`Something broke`);
});

app.listen(PORT, () => {
  console.log(`Server Up and Running`.cyan.blue);
});
