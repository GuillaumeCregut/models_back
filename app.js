require('dotenv').config();
<<<<<<< HEAD
//const connection = require('./dbconfig');
=======
>>>>>>> middlewares
const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions=require('./config/corsConfig')
const router = require('./routes/index.routes');
const cookieParser = require('cookie-parser');
const headerConfig = require('./config/headerConfig');
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(headerConfig);
app.use(cookieParser());


app.use('/api', router);
app.use('/uploads',express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Welcome");
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;