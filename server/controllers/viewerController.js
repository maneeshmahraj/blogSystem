const conn=require("../db/connection")


const viewerData=async(req,res)=>{
    const {blogId,user}=req.body;
          // console.log(blogId,user)
    try {
       
       
        conn.query("SELECT * FROM viewer WHERE blogId=? AND user=?", 
    [blogId, user], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                conn.query(
                    "INSERT INTO viewer SET ?", 
                    { blogId, user }, 
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(201).json("Data inserted successfully");
                        }
                    }
                );
            } else {
                
                 res.status(200).json(result);
                 
            }
        }
    }
);


} catch (error) {
console.error(error)  
}

}

const viewerDisplay=async(req,res)=>{
    const blogId=req.body.blogId;
    try {
        conn.query("SELECT * FROM viewer WHERE blogId=?",blogId,(err,result)=>{
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

module.exports={
    viewerData,
    viewerDisplay
    
}