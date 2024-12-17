const conn=require("../db/connection")


const likeData=async(req,res)=>{
    const {userId,postId,likes_user}=req.body;
           console.log(likes_user)
    try {
       
       
        conn.query("SELECT * FROM likes WHERE postId=? AND userId=?", 
    [postId, userId], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                conn.query(
                    "INSERT INTO likes SET ?", 
                    { userId, postId, likes_user }, 
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(201).json("Data inserted successfully");
                        }
                    }
                );
            } else {
                conn.query(
                    "UPDATE likes SET likes_user=? WHERE postId=? AND userId=?", 
                    [likes_user, postId, userId], 
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).json("Data updated successfully");
                        }
                    }
                );
            }
        }
    }
);


} catch (error) {
console.error(error)  
}

}

const likeDisplay=async(req,res)=>{
    const postId=req.body.postId;
    try {
        conn.query("SELECT * FROM likes WHERE postId=?",postId,(err,result)=>{
            if(err){
                console.log("errror ",err)
            }
            else{
                res.status(201).json(result)
            }
        })
    } catch (error) {
        console.error(error)  
    }
}
const userInfo=async(req,res)=>{
    const {userId,postId}=req.body;
    try {
    
        conn.query("SELECT * FROM likes WHERE userId=? AND postId=?",[userId,postId],(err,result)=>{
            if(err){
                console.log("errror ",err)

            }
            else{
                res.status(200).json(result[0])
            }
        })
    } catch (error) {
        console.error(error)  
        
    }
}
module.exports={
    likeData,
    likeDisplay,
    userInfo
    
}