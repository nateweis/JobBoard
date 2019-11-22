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
  
  app.use(express.json())
  app.use(cors(corsOption))
  app.options('*', cors(corsOption))
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "*");
  // })
  

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