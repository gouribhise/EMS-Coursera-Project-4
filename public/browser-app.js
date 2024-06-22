const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.username-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')

formDOM.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const username = usernameInputDOM.value
    const password = passwordInputDOM.value

    try {
     const {data}=    await axios.post('/api/v1/login', { username, password })
     console.log('password',data.msg)
        
    }
    catch(error){
        console.log(error)
    }    
    

    // try {
    //  const {data}=    await axios.get('/api/v1/dashboard', { username, password })
    //  console.log('password',data)
        
    // }
    // catch(error){
    //     console.log(error)
    // }    
    
    console.log('form submitted')
})