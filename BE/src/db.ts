import mongoose, { MongooseError }  from "mongoose"

const userSchema = new mongoose.Schema({
    username:{type:String, unique:true},
    password: String
})

export const userModel = mongoose.model('user',userSchema)

const tagsSchema = new mongoose.Schema({
    tags:{type:String,required:true,unique:true}
})
export const tagsModel = mongoose.model('tags',tagsSchema)

const contentTypes = ['image','youtube','twitter','article']

const contentSchema = new mongoose.Schema({
    link:String,
    type:{type:String, enum:contentTypes},
    title:String,
    tags:[{type:mongoose.Schema.ObjectId,ref:tagsModel}],
    userId:{type:mongoose.Schema.ObjectId,ref:userModel}
})

export const contentModel = mongoose.model('content',contentSchema)

const linkSchema = new mongoose.Schema({
    hash:{type:String},
    userId:{type:mongoose.Schema.ObjectId,ref:userModel,unique:true},
    
})

export const linkModel = mongoose.model('link',linkSchema)