var jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"
const fetch = (req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Invalid Auth Token"})

    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.user = data.user
        next();
        
    } catch (error) {
        res.status(401).send({error:"Invalid Auth Token"})
    }

}
module.exports = fetch

// import  jwt  from 'jsonwebtoken';

// const authMiddleware = async (req, res, next) =>{
//     const {token} = req.headers;
//     if(!token){
//         return res.json({success:false, message:'Not Authorized, login again'})
//     }

//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// export default authMiddleware;