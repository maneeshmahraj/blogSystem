
const conn=require("../db/connection")

const insertData=async(req,res)=>{
    const {title,category,post,image,userimage,username}=req.body
  //  console.log(req.body)
 
    try {
       
      
        conn.query("INSERT INTO titleblog SET ?",{title,category,post,image,userimage,username},(err,result)=>{
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
 const getData=async(req,res)=>{
    try {
            conn.query("SELECT * FROM titleblog",(err,result)=>{
                if(err){
                    res.status(201).json("nodata available")
                }
                else{
                    res.status(201).json(result)
                }
            })
    } catch (error) {
        console.error("err ",error)
    }
 }
 
 const editData=async(req,res)=>{
    let id=req.body.id;
    try {
        conn.query("SELECT * FROM titleblog WHERE id=?",id,(err,result)=>{
            if(err){
                res.status(201).json("data does not find")
            }
            else{
                res.status(201).json(result[0])
              
            } 
        })
    } catch (error) {
        
    }
 }
//  const editSaveData=async(req,res)=>{
//     const {id,data}=req.body
//    // console.log(id,data)
//     try {
       
//         conn.query("SELECT * FROM titleblog WHERE category=?","Nature",(err,result)=>{
//             if(err){
//                 res.status(201).json("data does not find")
//             }
//             else{
//                 res.status(201).json(result)
              
//             } 
//         })
//     } catch (error) {
//         console.error("err ",error)
        
//     }
//  }

 
 const commentData=async(req,res)=>{
    const {comment,blogId,user,userImage}=req.body;
    try {
       
      
        conn.query("INSERT INTO comment SET ?",{comment,blogId,user,userImage},(err,result)=>{
            if(err){
                console.log("err",err)
            }
            else{
                res.status(201).json("comment pass")
            }
        })
       
        
               
            
       
       
    } catch (error) {
      console.error(error)  
    }
   
    
 }
 const displayData=async(req,res)=>{
    const blogId=req.body.blogId;
    try {
       
        conn.query("SELECT * FROM comment WHERE blogId=?",blogId,(err,result)=>{
            if(err){
                res.status(201).json("data does not find")
            }
            else{
                res.status(201).json(result)
              
            } 
        })
    } catch (error) {
        console.error("err ",error)
        
    }

 }
 const delData=async(req,res)=>{
      let id=req.body.id;
      try {
        conn.query("DELETE FROM comment WHERE id=?",id,(err,result)=>{
            if(err){
                res.status(201).json("comment is not delete")
            }
            else{
                res.status(201).json("comment successfully delete")
            }
        })
      } catch (error) {
        console.error("err ",error)
      }
 }
 const userComment=async(req,res)=>{
    const {blogId}=req.body;

    try {
        conn.query("SELECT * FROM comment WHERE blogId=?",blogId,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.status(200).json(result)
            }
        })
    } catch (error) {
        console.error("err ",error)
        
    }
 }
 module.exports={
    insertData,
    getData, 
    editData,
    commentData,
    displayData,
    delData,
    userComment
 }