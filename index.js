require('dotenv').config();
const connection = require('./dbconfig');
const express = require('express');
const cors = require('cors');
const app = express();
// const router = require('./routes/index.routes');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const corsOptions ={
  // origin:process.env.CLIENT_URL,  
  origin: true,
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors(corsOptions));
// app.use('/api', router);
app.use('/uploads',express.static('uploads'));

app.get("/", (req, res) => {
    res.send("Welcome");
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;