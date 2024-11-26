/* eslint-disable no-undef */
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Alex', email: 'alex@gmail.com' },
  { id: 2, name: 'Smith', email: 'smith@gmail.com' },
  { id: 3, name: 'Steve', email: 'steve@gmail.com' },
];

// Route
app.get('/users', (req, res) => {
  res.send(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(users);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
