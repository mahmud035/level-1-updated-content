const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const Port = process.env.PORT || 5000;

const productsCollection = require('./data/products.json');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', async (req, res) => {
  try {
    res.send(productsCollection);
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = productsCollection.find((p) => p.id === id);
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(Port, () => {
  console.log('Server is running:', Port);
});
