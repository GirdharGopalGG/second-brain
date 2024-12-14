import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
require('dotenv').config()
const mongoose = require('mongoose')
import { contentModel, linkModel, userModel } from './db'
import { authMiddleware } from './auth'
import cors from 'cors'
import {z} from 'zod'

const app = express()
app.use(express.json())
app.use(cors())

const signupSchema = z.object({
    username:z.string().min(3, {message:'Username must be at least 3 characters long'}),
    password:z.string().min(3,{message:'password must be at least 3 characters long'})
})

app.post('/signup', async(req,res) => {
    try{
        const zodData = signupSchema.parse(req.body)
        
        const username = zodData.username
        const password = zodData.password

        
        await userModel.create({
            username,
            password
        })
        res.status(201).json({
            msg:'Signed up successfully'
        })  
         
    }catch(e){

        if(e instanceof z.ZodError){
        res.status(400).json({
                msg:e.errors[0]?.message  +' '+e.errors[1]?.message 
            })
            console.log(e.errors)
        return
        }
        
        res.status(400).json({
            msg:'Username already exists, Please Log in.'
        })
        
        
    }
})

app.post('/signin',async(req:Request,res:Response)=>{
    const {username,password} = req.body
    const user = await userModel.findOne({
        username,
        password
    })
    if(user){
        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET as string)
        res.json({
            token:token
        })
    }
    else{
        res.status(401).json({
            msg:'wrong credentials'
        })
    }
})

app.post('/content',authMiddleware,async(req,res)=>{
    const {link,type,title} = req.body
    
    await contentModel.create({
        link,type,title,
        //@ts-ignore
        userId:req.id,
        tags:[]

    })

    res.json({
        msg:'content added'
    })
})

app.get('/content',authMiddleware,async(req,res)=>{
        //@ts-ignore
    
    const userId = req.id
    const content =  await contentModel.find({
        userId:userId
    }).populate('userId','username ')     
    res.json({
        content
    })     
})

app.delete('/content',authMiddleware,async (req,res)=>{
    const contentId = req.body.contentId
    
    await contentModel.deleteMany({
    //@ts-ignore
    userId:req.id,
    _id:contentId
    })
    res.json({
        msg:'deleted'
    })
})


app.post('/share',authMiddleware,async (req,res)=>{
    const share:boolean = req.body.share

    const linkExists = await linkModel.findOne({
        //@ts-ignore
        userId:req.id,
    })
    if(linkExists){
        const hash = linkExists.hash
        res.json({
            link:'/share/'+hash
        })
        return
    }
    
    if(share===true){
        let hash = ''

        const random = 'qwertyuiopasdfghjklzxcvbnm1234567890'
        for(let i = 0;i<10;i++){
            hash+=random[Math.floor(Math.random()*random.length)]
        }
        try{
        await linkModel.create({
            hash:hash,
            //@ts-ignore
            userId:req.id
        })
        res.json({
            link:'share/'+hash
        })
        return
        }catch(e){
             console.log(e)
        }       
        
    
       
    }else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId:req.id,
            
        })
        res.json({
            msg:'sharing off'
        })
        return
    }
    
    
     
})

app.get('/:shareLink',async (req,res)=>{
    const hash = req.params.shareLink

    const link = await linkModel.findOne({
        hash:hash
    })
    if(!link){
        res.status(404).json({
            msg:'link does not exist'
        })
        return
    }
    const content = await contentModel.find({
        userId:link.userId
    })

    const user = await userModel.findOne({
        _id:link.userId
    }) 

    res.json({
        username:user?.username,
        content:content
    })
})


async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log(`you're connected now to Port 3000`)
}
main()
