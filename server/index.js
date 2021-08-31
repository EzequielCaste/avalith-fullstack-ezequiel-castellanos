const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
// const {createTables} = require('./config/createTables');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

// Uncomment to create tables in local PostreSQL Database
// createTables();

app.listen(process.env.PORT, console.log('ok'));
