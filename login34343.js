// WARNING: Hard-coding credentials like this is insecure — see notes below.

const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));

// ⚠️ Insecure: credentials directly in code
const VALID_EMAIL = 'gattemswathi369@gamil.com';
const VALID_PASSWORD = 'swathi@2005';

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // Optionally hash and compare
    req.session.user = { email };
    return res.send('Login successful (hard-coded user)');
  }
  res.status(401).send('Invalid credentials');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.status(401).send('Unauthorized');
  res.send(`Welcome, ${req.session.user.email}`);
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
