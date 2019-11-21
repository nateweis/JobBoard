//***************************************************** */
// Heroku Site :  https://job-board-api.herokuapp.com/
//***************************************************** */

const express = require('express');
const app = express();
const  cors = require('cors');


const port = process.env.PORT || 3000;

// /////////////////////////////////////////
// MiddleWear
// ////////////////////////////////////////
const corsOption = {
    origin:"*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  }
  app.use(cors(corsOption))
  app.use(express.json())
  
  

// /////////////////////////////////////////
// Routes
// ////////////////////////////////////////
// app.use('/', (req, res) => {
//   res.send("Hello World")
// })

const userController = require('./controllers/userRoutes')
app.use('/users', userController);

const boosterController = require('./controllers/boosterRoutes');
app.use('/boosters', boosterController);

const sewerController = require('./controllers/sewerRoutes');
app.use('/sewers', sewerController);

const fireController = require('./controllers/fireRoutes');
app.use('/fire', fireController);


app.listen(port, () => {console.log(`Port ${port} is listening for the job board app`)}  )