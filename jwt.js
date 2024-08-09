const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
    //extracting the jwt token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({error:"Unauthorized"});
    try {
        //verify the jwt token
      const decoded =  jwt.verify(token,process.env.JWT_SECRET);
      //Attach user information to the request object
      req.body = decoded;
      next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:"invalid token"});
        
    }    
    }
}
//generate token
const generateToken = (userData) => {
    //generate a new JWT Token using user data
    return jwt.sign(userData,process.env.JWT_SECRET);

}
module.exports = {jwtAuthMiddleware,generateToken};