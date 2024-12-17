import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HTMLReactParser from 'html-react-parser';
import { BsShare } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const username=localStorage.getItem("username");
const image=localStorage.getItem("userimage")
const BlogView=()=>{
    const {id}=useParams()
       const [myblog,setMyblog]=useState({})
       const [comment,setComment]=useState("")
       const [isLoad,setIsload]=useState(false)
       const [coData,seCodata]=useState([])
    const loadData=()=>{
        let api="http://localhost:8000/v1/edituser";
        axios.post(api,{id:id}).then((res)=>{
            setMyblog(res.data)
            setIsload(true);
           
           
        })
    }
    const loadCommentData=async()=>{
        let api="http://localhost:8000/v1/displayComment";
      await  axios.post(api,{blogId:myblog.Id}).then((res)=>{
        console.log(res.data)
        seCodata(res.data)
        

        })
    }
   // console.log(coData)
    useEffect(()=>{
        loadData();

        if(isLoad){
            loadCommentData();
        }
    },[isLoad])
    const handleSubmit=(e)=>{
      e.preventDefault()
        let api="http://localhost:8000/v1/comment";
        axios.post(api,{comment:comment,blogId:myblog.Id,user:username,userImage:image}).then((res)=>{
          //  console.log(res.data)
            loadCommentData();;
        })
    }
    const handleDelete=(e)=>{
      e.preventDefault()
      let Did=e.target.id;
        let api="http://localhost:8000/v1/deleteComment";
          axios.post(api,{id:Did}).then((res)=>{
         
           toast.success(res.data,
            {
            position: "top-center",
            autoClose: 5000,
             hideProgressBar: false,
               closeOnClick: true,
              pauseOnHover: true,
             draggable: true,
           progress: undefined,                                                                
          });
          loadCommentData();
  
          })
    }
        const ans=coData.map((key)=>{
            return(
                <>
                  <div className="comment-user-img"> 
                    <img src={key.userImage} />
                    <span>{key.user}</span>
                  <div className="c-user">
                  <p >{key.comment}</p>
                    <a href="" style={{color:"green",fontWeight:"bold"}} >like</a>
                    {key.user==username?<a href="" style={{color:"red",fontWeight:"bold"}} id={key.id} onClick={handleDelete}>Delete</a>:<a href="" style={{color:"rgb(34, 44, 63)",fontWeight:"bold"}} >Reply</a>}

                  </div>
                 </div>
                </>
            )
        })
    return(
        <>
       <div className="blog-view-d">
             <div className="blog-discription">
                   <p ><BsShare className="share-icon"/></p>
                    <img src={myblog.image} />
                    <h1>{myblog.title}</h1>
                    <div className="user-info">
                        <img src={myblog.userimage}/>
                        <span>{myblog.username}</span>
                    <b className="">{myblog.created_at}</b>
                    </div>
                    <br/><br/>
               <div className="blog-contnt">  
                 {HTMLReactParser(myblog.post || '')};
              </div>
              <div className="comment-section">
                <h3>Comments {coData.length>0&&<span style={{color:"green"}}>{coData.length}</span>}</h3>
                <hr/>
               <div style={{display:"flex"}}> <input type="text" name="comment" onChange={(e)=>{setComment(e.target.value)}} placeholder="Write a comment..."/>
               <button onClick={handleSubmit}>comment</button></div>
               <div className="comment-box">
                
                 {ans}
               </div>
              </div>
          </div> 
        
       </div>
       <ToastContainer />
        </>
    )
}
export default BlogView;