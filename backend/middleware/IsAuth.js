const jwt = require("jsonwebtoken");

const IsAuth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization || req.cookies.learn;
        if(!token){
            return res.status(401).json({message : "Unauthorized User",status : false})
        }
        const decodedToken = jwt.verify(token , process.env.SECRET_KEY)
        if(decodedToken){
            console.log(decodedToken)
            req.profile = decodedToken;
            req.userId = decodedToken?._id;
            req.role = decodedToken?.role
           
            next()
        }
        else{
            return res.status(401).json({message : "Unauthorized User",status : false})
        }
        
    } catch (error) {
        return res.status(400).json({message : error.message,status : false})
    }
}

module.exports = IsAuth