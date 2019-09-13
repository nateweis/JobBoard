
const express = require('express');
const app = express();
const  cors = require('cors');


const port = process.env.PORT || 3000;

// /////////////////////////////////////////
// MiddleWear
// ////////////////////////////////////////
const corsOption = {
    origin:'http://localhost:3001',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  }
  app.use(cors(corsOption))
  app.use(express.json())
  
  

// /////////////////////////////////////////
// Routes
// ////////////////////////////////////////
const userController = require('./controllers/userRoutes')
app.use('/users', userController);

const boosterController = require('./controllers/boosterRoutes');
app.use('/boosters', boosterController);


app.listen(port, () => {console.log(`Port ${port} is listening for the job board app`)}  )