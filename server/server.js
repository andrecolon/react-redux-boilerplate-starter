const path = require('path');
const express = require('express');

const { EV_PORT } = require('./config');

const app = express();

const publicPath = path.join(__dirname, '..', 'public');
// Heroku port
const port = EV_PORT || 3000;

app.use(express.static(path.join(publicPath)));

// server index.html to all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(
    `Server is running. You better go catch it! LOL. I am listening on ${port}`
  );
});
