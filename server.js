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

app.post('/apia/posts', (req, res) => {

});

app.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});
