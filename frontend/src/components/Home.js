import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home=()=>{
         
    const [blogData,setBlogData]=useState([])
           const navigate=useNavigate()
       
    const loadData=()=>{
        let api="http://localhost:8000/v1/getuser";
        axios.get(api).then((res)=>{
          //  console.log(res.data)
            setBlogData(res.data)
        })
    }
   

   useEffect(()=>{
    loadData()
   
   },[]) 
   const handleLike=(e)=>{
           
            e.preventDefault()
            let pid=e.target.id;
            console.log(pid)
    navigate(`/view/${pid}`)
   }
   const handleBlog=(e)=>{
    e.preventDefault()
              let id=e.target.id;
          navigate(`/blogview/${id}`)
   }              

           
              const ans=blogData.map((key)=>{
                return(
                    <>
                     <div className="grid-view" >
                <img src={key.image}/>
                <div>
                    <span style={{float:"left"}}>mk#lifeStyle</span>
                   
                    <span className="likes"><a href="" style={{color:"lime",fontWeight:"bold"}} id={key.Id} onClick={handleLike} >Views</a> </span>
                    
                    <br/>
                    <h3> Title : {key.title}</h3>
                   <span className="userimg"><img src={key.userimage} height="50px"/> 
                   <span className="name-user">{key.username}</span>
                   <br/>                 
                   </span>
                     <a href="#" className="user-btn" id={key.Id} onClick={handleBlog}>read more</a>
                </div>
            </div>
                    </>
                )
              })
    return(
        <>
        <div className="home-heading">
                <h1>Editor`s picked</h1>
                <p>Features and highly rated articls</p>
            </div>
           
           <div className="grid">
            
           {ans}
            
           </div>
        </>
    )
}
export default Home;