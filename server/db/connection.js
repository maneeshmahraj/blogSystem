const mysql=require("mysql2")

const conn=mysql.createConnection({
      user:process.env.DB_USER,
      host:process.env.DB_HOST,
      password:"",
      database:process.env.DB_DATABASE
})
conn.connect((err)=>{
  if(err) throw err;
  console.log("DB connected !!")
})

module.exports=conn;