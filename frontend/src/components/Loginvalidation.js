

const LoginValidation=(values)=>{
        let error={}
        const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
         const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
       
         if(values.name===""){
            error.name="Email should not be empty"
        }
        else{
            error.name=""
        }
        
        if(values.email===""){
            error.email="Email should not be empty"
        }
        else if(!email_pattern.test(values.email)){
            error.email="Email didn`t match "
        }
        else{
            error.email=""
        }
        if(values.password===""){
            error.password="Password should not be empty"
        }
        else if(!password_pattern.test(values.password)){
            error.password="Password length should be at least 8 characters and must have at least one capital letter one small letter and one number"
        }
        else{
            error.password=""
        }
        
    return error
}
export default LoginValidation;