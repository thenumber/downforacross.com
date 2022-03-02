const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

const build_dir = path.resolve('build');
app.use(express.static(build_dir));

app.get('/*', (req, res) => {
  res.sendFile(path.join(build_dir, 'index.html'));
});

app.listen(port);
