require('dotenv').config();
//require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const Employees=require('./models/employees')
let alert=require('alert')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const mainRouter=require('./routes/main')
//const notFoundMiddleware = require('./middleware/not-found');
//const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use('',mainRouter)
//app.use(notFoundMiddleware);
//app.use(errorHandlerMiddleware);

app.set('view engine','ejs')
app.get('/',(req,res)=>{
  Employees.find({}).then((employees) => {
    //if succeded do this block of code
    res.render("index",{
      title:"Home page",
      employees:employees
    })
  }).catch((err) => {
    //catch error
  });
  
 
 
})
const port = process.env.PORT || 3000;
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
        console.log('db connected')
      );
    } catch (error) {
      console.log(error);
    }
  };

start()