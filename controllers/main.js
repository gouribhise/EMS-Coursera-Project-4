const jwt=require('jsonwebtoken')
const Employees=require('../models/employees')
var objectId = require('mongodb').ObjectID;
const notifier = require('node-notifier');

const login=(req,res)=>{
    console.log('inside login')
    const {username,password}=req.body
    console.log('what is username:',username)
    if(!username||!password){
        res.status(400).json({msg:'Please provide username and password'})
    }
    //dummy id
    const id=new Date().getDate()
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    console.log('what is token:',token)

 
res.redirect('dashboard');
}


const dashboard=(req,res)=>{
 
    Employees.find({}).then((employees) => {
        //if succeded do this block of code
        console.log(employees)
        res.render("dashboard",{
          title:"Dashboard",
          employees:employees
        })
      }).catch((err) => {
        //catch error
      });
 
}

const add_employees=(req,res)=>{
    res.render('add_employees')
}
const users=(req,res)=>{
  Employees.find({}).then((employees) => {
    //if succeded do this block of code
    console.log(employees)
    res.render("users",{
      title:"Users",
      employees:employees
    })
  }).catch((err) => {
    //catch error
  });
 
}

const add=(req,res)=>{
    console.log('what is add body:',req.body.gender)
    const{name,email,gender}=req.body
    console.log('name:',name)
    console.log('gender:',gender)
    const employee=new Employees({
        name:req.body.name,
        email:req.body.email,       
        city: req.body.city,
        phone: req.body.phone,
        title: req.body.title,  
        age: req.body.age,
        gender: req.body.gender,
        salary: req.body.salary,
       
    })
    employee.save()
    res.redirect('/')

}

const edit=(req,res)=>{
    // console.log('inside edit controller')
     let id=req.params.id    

    // Employees.find({}).then(id,(employee) => {
    //     //if succeded do this block of code
    //     res.render("dashboard",{
    //       title:"Edit employee",
    //       employee:employee
    //     })
    //   }).catch((err) => {
    //    console.log(err)
    //   });


    Employees.findById(id).then((employee) => {
        //if succeded do this block of code
        res.render("edit_employees",{
          title:"Edit employee",
          employee:employee
        })
      }).catch((err) => {
        //catch error
      });
 
 
}

 

//test
const update=async(req,res)=>{
  let id=req.params.id    
console.log('inside update:',req.body)  
 
// const employee=await Employees.findOne({_id:id})
//   employee.name=req.body.name,
//   employee.email=req.body.email,       
//   employee.city= req.body.city,
//   employee.phone= req.body.phone,
//   employee.title= req.body.title,  
//   employee.age= req.body.age,
//   employee.gender= req.body.gender,
//   employee.salary= req.body.salary,

// await employee.save()
// res.redirect('/')
Employees.findByIdAndUpdate(id).then((employee) => {
  employee.name=req.body.name,
    employee.email=req.body.email,       
    employee.city= req.body.city,
    employee.phone= req.body.phone,
    employee.title= req.body.title,  
    employee.age= req.body.age,
    employee.gender= req.body.gender,
    employee.salary= req.body.salary,
 
 employee.save()
    res.redirect('/')
}).catch((err) => {
  //catch error
});



}

const deletion=(req,res)=>{
let id=req.params.id
console.log('id to delete:',id)
 

Employees.findByIdAndDelete(id).then((employee) => {
  notifier.notify({
    title: 'Salutations!',
    message: 'Hey there!',
    icon: path.join(__dirname, 'icon.jpg'),
    sound: true,
    wait: true
  }),
  //if succeded do this block of code
  res.render("/",{
    title:"Edit employee",
    employee:employee
  })
}).catch((err) => {
  //catch error
});

res.redirect('/')
}
module.exports={
    login,dashboard,users,add_employees,add,edit,update,deletion
}