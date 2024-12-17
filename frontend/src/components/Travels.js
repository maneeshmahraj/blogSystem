import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Travels=()=>{
         
    const [blogData,setBlogData]=useState([])
           const navigate=useNavigate()
    const loadData=()=>{
        let api="http://localhost:8000/v1/editsave2";
        axios.get(api).then((res)=>{
          //  console.log(res.data)
            setBlogData(res.data)
        })
    }
   useEffect(()=>{
    loadData()
   },[]) 

   const handleBlog=(id)=>{
          navigate(`/blogview/${id}`)
   }
              const ans=blogData.map((key)=>{
                return(
                    <>
                     <div className="grid-view" onClick={()=>{handleBlog(key.Id)}}>
                <img src={key.image}/>
                <div>
                    <span style={{float:"left"}}>mk#lifeStyle</span>
                    <span style={{float:"right"}}>6 mins read</span>
                    <br/>
                    <h3> Title : {key.titile}</h3>
                   <span className="userimg"><img src="../image/u.png" /> 
                   <span className="name-user">sourabh</span>
                   <br/>
                   <span className="dat">27 nov 2024</span>
                   
                   </span>
                     <a href="#" className="user-btn">read more</a>
                </div>
            </div>
                    </>
                )
              })
    return(
        <>
           <div className="grid">
           {ans}
            
           </div>
        </>
    )
}
export default Travels;