const express = require('express');
const jwt = require('jsonwebtoken');

const port = 8000;
const host = "127.0.0.1";

const app = express();

app.get('/api', (req, res) => {
  res.cookie('user', 'Alex', {expires: new Date(Date.now()+5000)});
  res.json({
    message: 'Welcome to api'
  });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      res.status(403).send({error: err.message});
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'Brad',
    email: 'brad@gamil.com'
  };

  jwt.sign({ user }, 'secretKey', { expiresIn: '30s' }, (err, token) => {
    res.json({ token });
  });
});

app.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});

// Format of token
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader.split(' ')[2];
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
