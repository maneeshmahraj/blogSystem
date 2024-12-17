const express=require("express")
const router=express.Router()
const userController=require("../controllers/usercontroller")
const regController=require("../controllers/ragisterController")
const likeController=require("../controllers/likeController")
const viewerController=require("../controllers/viewerController")
router.post("/create",userController.insertData)
router.get("/getuser",userController.getData)
router.post("/edituser",userController.editData)
router.post("/register",regController.saveData)
router.post("/login",regController.loginData)
router.post("/comment",userController.commentData);
router.post("/displayComment",userController.displayData)
router.post("/deleteComment",userController.delData)
router.post("/likes",likeController.likeData)
router.post("/likesdisplay",likeController.likeDisplay)
router.post("/commentuser",userController.userComment)
router.post("/viewer",viewerController.viewerData)
router.post("/viewerDisplay",viewerController.viewerDisplay)
router.post("/mk",likeController.userInfo)
module.exports=router;