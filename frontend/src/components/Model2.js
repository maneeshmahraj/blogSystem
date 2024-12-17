import { MdOutlineClose } from "react-icons/md";
const Model2=({handleClose,handleBlur,userdata})=>{

    return(

        <>
        <div className="model" onClick={handleBlur}> </div> 
            <div className="model-content">
                <h3>All Viewer </h3>
                <div className="line"></div>
                <button><MdOutlineClose onClick={handleClose} /></button>
               
           {userdata}
          
        </div>
        </>
    )
}
export default Model2;