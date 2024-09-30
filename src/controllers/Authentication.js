import jwt from "jsonwebtoken";

export const validationToken = async(req, res, next) => {
    
    const header = req.headers['authorization']

    if(!header){
        return res.status(500).json({message: "se requiere token"})
    }

    const token = header.split(' ')[1]

    jwt.verify(token, process.env.SECRET, (error, decoded)=>{
        if(error){
            return res.status(400).json({message: "Token Invalido"})
        }
        req.user = decoded

        next()
    })
}