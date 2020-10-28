const express = require('express');
const app = express();
const cors = require('cors');
const util = require('util');
const streamPipeline = util.promisify(require('stream').pipeline);
const fetch = require('node-fetch');
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
  console.log('/proxy');
  console.log(req.query.url);

  return new Promise((resolve) => {
    fetch(req.query.url)
      .then((response) => response.text())
      .then((text) => {
        res.status(200).send(text);
        resolve();
      })
      .catch((err) => {
        res.status(400).send(err.message);

        resolve();
      });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
