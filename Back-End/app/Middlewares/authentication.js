import jwt from 'jsonwebtoken'

export default function authenticationUser(req,res,next){
    const token=req.headers['authorization']

    if(!token){
        return res.status(401).json({errors:'token is required'})
    }
    try {
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)
        // console.log('TD', tokenData)
        req.userId=tokenData.userId
        req.role=tokenData.role
        next()
        } catch (error) {
        console.log(error)
        return res.status(401).json({errors:error.message})
    }

}