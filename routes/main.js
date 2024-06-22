const express=require('express')
const router=express.Router() 
const {login,dashboard,users,add_employees,add,edit,update,deletion}=require('../controllers/main')
router.route('/dashboard').get(dashboard)
router.route('/add_employees').get(add_employees)
router.route('/users').get(users) 
router.route('/login').post(login)
router.route('/add').post(add)
router.route('/edit/:id').get(edit)

router.route('/update/:id').post(update)
router.route('/delete/:id').get(deletion)
module.exports=router