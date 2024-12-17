
import { MdOutlineClose } from "react-icons/md";
const Model=({handleClose,handleBlur,data})=>{

    return(

        <>
        <div className="model" onClick={handleBlur}> </div> 
            <div className="model-content">
                <h3>All Comments </h3>
                <div className="line"></div>
                <button><MdOutlineClose onClick={handleClose} /></button>
               
           {data}
          
        </div>
        </>
    )
}
export default Model;