const AuthModel = require("../../models/Auth/Users");

const ApprovedUser = async(req,res)=>{
    const userId = req.params.id;
    console.log(req.userId,"USERID")
    const {approve_status , status} = req.body;
    console.log(approve_status,status)
    try {
       if(req?.role=="Admin"){
        const findUser = await AuthModel.findById(userId)
        if(findUser){
            if(status =="block"){
                const ActionOnUser = await AuthModel.findByIdAndUpdate(userId,{...req.body,approve_status:false},{new : true})
                return res.status(200).json({message : "User Blocked",status : true})
            }
            else if(status =="active"){
                const ActionOnUser = await AuthModel.findByIdAndUpdate(userId,{...req.body,approve_status:true},{new : true})
                return res.status(200).json({message : "User Activated",status : true})
            }
            else if(approve_status){
                const ActionOnUser = await AuthModel.findByIdAndUpdate(userId,{...req.body,status:"active"},{new : true})
                return res.status(200).json({message : "User Approved",status : true})
            }
            else if(!approve_status){
                const ActionOnUser = await AuthModel.findByIdAndUpdate(userId,{...req.body,status : "block"},{new : true})
                return res.status(200).json({message : "User DisApproved",status : true})
            }
        }
        else{
            return res.status(400).json({message : "User Not Exist",status : true})
        }
       }
       else{
        return res.status(400).json({message : "You are not Admin",status : true})
       }
    } catch (error) {
        return res.status(400).json({message : error.message , status : false})
    }
}

module.exports = ApprovedUser;