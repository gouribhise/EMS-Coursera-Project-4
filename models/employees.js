const mongoose=require('mongoose')
const employeesSchema=new mongoose.Schema({
    name: String,
    email: String,
    city: String,
    phone: Number,
    title: String,  
    age: Number,
    gender: String,
    salary: Number,
   
},{timestamps:true})

module.exports=mongoose.model('Employees',employeesSchema)