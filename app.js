const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const people = [
  {
    id: 1,
    name: 'james bond',
    active: true
  },
  {
    id: 2,
    name: 'jason borne',
    active: false
  },
  {
    id: 3,
    name: 'jack buaer',
    active: false
  }
];

app.get('/api/people', validateToken, (req, res) => {
  res.json(people.filter(pers => pers.name === req.user.username));
});

app.post('/api/login', async (req, res) => {
  const user = req.body.name;
  const username = { username: user };
  try {
    const token = await jwt.sign(username, 'qwerty12345');
    res.json({ token });
  } catch (err) {
    res.status(403).json({ err });
  }
});

async function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const authToken = authHeader && authHeader.split(' ')[1];
  if (!authToken) return res.sendStatus(401);
  try {
    const usernom = await jwt.verify(authToken, 'qwerty12345');
    req.user = usernom;
    next();
  } catch (err) {
    res.status(403).json({ err });
  }
}

app.listen('1124', () => console.log('server started ....'));
