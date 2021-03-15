//***************************************************** */
// Heroku Site :  https://job-board-api.herokuapp.com/
//***************************************************** */

const express = require('express');
const app = express();
// const  cors = require('cors');


const port = process.env.PORT || 3001;

// /////////////////////////////////////////
// MiddleWear
// ////////////////////////////////////////
// const corsOption = {
//     origin:"*",
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false
//   }
  
//   app.use(cors())
//   app.options('*', cors())

  app.use(express.json())

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true)
    if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({})
    }
    next();
  })
  

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

const tankfillController = require('./controllers/tankfillRoutes');
app.use('/tankfill', tankfillController);

const sewerController = require('./controllers/sewerRoutes');
app.use('/sewers', sewerController);

const fireController = require('./controllers/fireRoutes');
app.use('/fire', fireController);

const linkController = require('./controllers/linkJobRoutes');
app.use('/link', linkController);


app.listen(port, () => {console.log(`Port ${port} is listening for the job board app`)}  )