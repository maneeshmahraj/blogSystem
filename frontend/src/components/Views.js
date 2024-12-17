
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Model from "./Model";
import Model2 from "./Model2";

const user=localStorage.getItem("userId")
const username=localStorage.getItem("username")
const Views=()=>{
        
           const [likeData,setLikeData]=useState([])
           const [blogData,setBlogData]=useState([])
           const [filterD,setFilterD]=useState(blogData)
        const [isLikes,setIslikes]=useState(true)
        const [comment,setComment]=useState([])
        const [viewer,setViewer]=useState([])
        const [myblog,setMyblog]=useState({})
        const [isShow,setIsshow]=useState(false)
        const [isView,setIsView]=useState(false)
        const [uData,setUData]=useState({})
        const [activeFilter,setActivefilter]=useState([])
        let likeCount=0;

        const {id}=useParams()
        const navigate=useNavigate()
         const likeDataLoad=()=>{
                let api="http://localhost:8000/v1/likesdisplay";
                axios.post(api,{postId:id}).then((res)=>{
                     setLikeData(res.data)
        
                   
                })
            }
            const loadDataFilter=async()=>{
              let api="http://localhost:8000/v1/getuser";
              await axios.get(api).then((res)=>{
                  setBlogData(res.data)
              })
          }
            const loadData2=()=>{
              let api="http://localhost:8000/v1/edituser";
              axios.post(api,{id:id}).then((res)=>{
                  setMyblog(res.data)             
                 
              })
          }
            const handleLike=(e)=>{
                e.preventDefault()
                    setIslikes(!isLikes)
                     let api="http://localhost:8000/v1/likes";
                       axios.post(api,{postId:id,userId:user,likes_user:isLikes}).then((res)=>{
                    
                     likeDataLoad()
                })
              
               }
              
               const loadComment=()=>{
                let api="http://localhost:8000/v1/commentuser";
                axios.post(api,{blogId:id}).then((res)=>{
                  setComment(res.data)
                })
               }
               const loadViewer=()=>{
                let api="http://localhost:8000/v1/viewer";
                axios.post(api,{blogId:id,user:username}).then((res)=>{
                 
                })
               }
            const  loadUdata=()=>{
              let api="http://localhost:8000/v1/mk";
              axios.post(api,{userId:user,postId:id}).then((res)=>{
                    setUData(res.data)
              })
               }
               const loadViewerBlogBy=()=>{
                let api="http://localhost:8000/v1/viewerDisplay";
                axios.post(api,{blogId:id}).then((res)=>{
                  setViewer(res.data)
                })
               }
               const filterData=async()=>{
                    if(activeFilter.length>0){
                      const tempItem=await blogData.filter((item)=>activeFilter.includes(item.category))
                    //  console.log("tem item",tempItem)
                      setFilterD(tempItem)
                    }
                    else{
                      setFilterD(blogData)
                    }
                    
               
               }
               const handleViewUser=(e)=>{
                e.preventDefault()
                setIsView(true)
               }
               const handleBlog=()=>{
                navigate(`/blogview/${id}`)
         }              
       const handleFiterItem=(e)=>{
        let category=e.target.name;
          if(activeFilter.includes(category)){
             const filters=activeFilter.filter((el)=>el!==category)
             setActivefilter(filters)
          }
          else{
            setActivefilter([...activeFilter,category])
          }
       }
       console.log(likeData)
             useEffect(()=>{
               
                likeDataLoad()
                loadComment()
                loadViewer()
                loadViewerBlogBy()
                loadData2()
                loadUdata()
                loadDataFilter()
                filterData()
               },[isLikes,activeFilter]) 

                  const ans=likeData.map((key)=>{
                        likeCount+=key.likes_user;
                        
                  })
             const handleComment=(e)=>{
                    e.preventDefault()
                    setIsshow(true)

             } 
             const handleClose=()=>{
              setIsshow(false)
              setIsView(false)
             }
             const handleBlur=()=>{
              setIsshow(false)
              setIsView(false)
             }
             const data=comment.map((key)=>{
                        return(
                          <>
                             <div className="comment-user-img2"> 
                    <img src={key.userImage} />
                    <span>{key.user}</span>
                  <div className="c-user">
                  <p >{key.comment}</p>
                  
                  </div>
                
              </div>
                          </>
                        )
             })           
             const ans4=filterD.map((key)=>{
              return(
                  <>
                   <div className="grid-view2" >
              <img src={key.image}/>
              <div>
                  <span style={{float:"left"}}>mk#lifeStyle</span>
                    {
                          likeData.map((key2)=>{
                            return(
                              <>
                              </>
                            )
                          })
                    }
                  <span className="likes2"><a href="" style={{color:"lime",fontWeight:"bold"}}  >like</a> </span>
                  
                  <br/>
                  <h4> Title : {key.title}</h4>
               
                 <br/>                 
               
                 
              </div>
          </div>
                  </>
              )
            }) 

                      
            
             const userdata=viewer.map((key)=>{
                     return(
                      <>
                       <div className="comment-user-img3">                 
                         <b>{key.user}</b>             
                
                       </div>
                      </>
                     )
             })
            
    return(
        <>
       
       <div className="home-heading">
       <h1  style={{color:"rgb(34, 44, 63)"}}>Editor`s picked</h1>
       
       
       </div>
       <div className="view-content">
       <div className="view-part">
        <img src={myblog.image} style={{cursor:"pointer"}} onClick={handleBlog}/>
       
       </div>
       <div className="view-part2">
       <h3>{myblog.title}</h3>
       <span style={{marginLeft:"20px"}}>Lorem ipsum is typically a corrupted version
         of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman 
         and philosopher Cicero
         </span>
       <hr/>
       <div className="portion">
        <span>{uData.userId==user&&uData.likes_user==1?<a href="" style={{color:"green",fontWeight:"bold"}} 
        onClick={handleLike}>like </a>:<a href="" style={{color:"purple",fontWeight:"bold"}} onClick={handleLike}>like </a>}<span
         style={{fontSize:"20px",color:"lime" ,fontWeight:"bold"}}
         >{likeCount}</span></span>
        <span><a href="" style={{color:"rgb(34, 44, 63)",fontWeight:"bold"}} onClick={handleComment}>Comments</a>
        <span
         style={{fontSize:"20px",color:"lime" ,fontWeight:"bold"}}
         > {comment.length}</span>
        </span>  
        <span><a href="" style={{color:"rgb(34, 44, 63)",fontWeight:"bold"}} onClick={handleViewUser}>Views</a>
        <span
         style={{fontSize:"20px",color:"purple" ,fontWeight:"bold"}}
         > {viewer.length}</span>
         </span>
       </div>
       </div>
       </div>
       {
        isShow&& <Model handleClose={handleClose} handleBlur={handleBlur} data={data}/>
       }
       {
        isView&&<Model2 handleClose={handleClose} handleBlur={handleBlur} userdata={userdata}/>
       }
        <div className="home-heading">
        <h1 style={{color:"rgb(34, 44, 63)",marginTop:"50px"}}>Filter By Blogs</h1>
       <div className="filter">
             <div className="filter-item" onClick={handleFiterItem}>
            
             <div className="filter-list"><button className={activeFilter.includes("Nature")?"selected":"unselected"} name="Nature">Nature</button></div>
             <div className="filter-list"><button className={activeFilter.includes("Travels")?"selected":"unselected"} name="Travels">Travels</button></div>
             <div className="filter-list"> <button className={activeFilter.includes("Technology")?"selected":"unselected"} name="Technology">Technology</button></div>
             <div className="filter-list"><button className={activeFilter.includes("Politics")?"selected":"unselected"} name="Politics">politics</button></div>


             </div>
              <div className="filter-item2">
               {ans4}
             </div>
       </div>
        </div>
        </>
    )
}
export default Views