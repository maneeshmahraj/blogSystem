const conn=require("../db/connection")
const bcript=require("bcryptjs")
const jwt=require("jsonwebtoken")
const secret_key="MK195"


const saveData=async(req,res)=>{
    const {name,email,userimage,password}=req.body;
  //  console.log(name,email,password)
  const hashpassword=await bcript.hash(password,10)
    try {
       
        
        conn.query(`INSERT INTO login  SET ?`,{name,email,userimage,hashpassword},(err,result)=>{
            if(err){
                console.log("err",err)
            }
            else{
                res.status(201).json(req.body)
            }
        })
    


} catch (error) {
console.error(error)  
}

}

const loginData=async(req,res)=>{
    const {email,password}=req.body;
    try {
        conn.query("SELECT * FROM login WHERE `email`=? ",email,async(err,result)=>{
            if(err){
                console.log("err",err)
            }
            else{
               if(result.length>0){
               const isPasswordValid= await bcript.compare(password,result[0].hashpassword)
               if(!isPasswordValid){
                res.json("password does not match")
               }
               else{
                const token=await jwt.sign({id:result[0].Id,username:result[0].name,email:result[0].email},secret_key)
               // console.log(token)
                res.status(201).json({token:token,username:result[0].name,email:result[0].email,userimage:result[0].userimage,id:result[0].Id,massage:"you are login.."})
            }
               
               }
               else{
               }
            }
        })
    } catch (error) {
        console.error(error) 
    }
}



module.exports={
    saveData,
    loginData
}