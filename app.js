const express = require('express')
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
const routes = require('./routes');

const app = express()
app.use(bodyParser.json())
app.use(express.json());
app.use(routes)

dotenv.config();

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});