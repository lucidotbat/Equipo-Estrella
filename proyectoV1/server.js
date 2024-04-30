const express = require('express');
const cors = require('cors');
const router = require('./app/backEnd/controllers/router');
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('app'));
app.use('/views', express.static('views'));

let mongoConnection = "mongodb+srv://admin:kalikali@myapp.zjzkunw.mongodb.net/MyAppDB";
let db = mongoose.connection;
db.on('connecting', () => {
    console.log('conectando...');
    console.log(mongoose.connection.readyState);
});

db.on('connected', () => {
    console.log('conectao');
    console.log(mongoose.connection.readyState);
});
mongoose.connect(mongoConnection, {useNewUrlParser: true});

app.use(router);

app.use((req, res, next) => {
    res.sendStatus(404);
}); 
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
