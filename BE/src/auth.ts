import jwt from "jsonwebtoken"
import { userModel } from "./db"
import { NextFunction, Request, Response } from "express"

export async function authMiddleware(req:Request,res:Response,next:NextFunction){

    

    try{
    const token = req.headers.token

    if(!token){
        res.status(401).json({
            msg:'Token missing'
        })
        return
    }
    
    const decodedData:Object= jwt.verify(token as string,process.env.JWT_SECRET as string )
    if(decodedData){
        //@ts-ignore
        req.id = decodedData.id
        next()
    }
    else{
        res.status(401).json({
            msg:'you are not logged in'
        })
        return
    }
}
catch(e){
    res.status(500).json({
        msg:"Internal server error"
    })
}
}