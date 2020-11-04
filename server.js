const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
// const fetch = require('node-fetch');
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ['http://localhost:3000', '127.0.0.1:3000', 'gold.is'],
  methods: ['GET'],
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/proxy', (req, res) => {
  request(req.query.url).pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
