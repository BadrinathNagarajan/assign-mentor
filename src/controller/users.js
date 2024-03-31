import UserModel from "../model/users.js"

const getAll = async (req,res)=>{
   
    try {
        
        let users = await UserModel.find()
        res.status(200).send({
            message:"Data Fetch Successful",
            users
        })
        
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const getById = async (req,res)=>{
    try {
        let {id} = req.params
        let user = await UserModel.findById(id)
        if(user)
        {
            res.status(200).send({
                message:"Data Fetch Successful",
                user
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid Id"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
   
}

const create = async(req,res)=>{
    
    try {
        await UserModel.create(req.body)

        res.status(200).send({
            message:"User Created Successfully"
        })
       
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const editById = async (req,res)=>{
    try {
        let {id} = req.params
        let user = await UserModel.findById(id)
        if(user)
        {
            user.name = req.body.name,
            user.email = req.body.email,
            user.mobile = req.body.mobile

            await user.save()

            res.status(200).send({
                message:"User Edited Successfully",
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid Id"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const deleteById = async (req,res)=>{
   
    try {
        let {id} = req.params
        let user = await UserModel.findById(id)
        if(user)
        {
            await UserModel.deleteOne({_id:id})
            res.status(200).send({
                message:"User Deleted Successfully",
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid User Id"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

export default {
    create,
    getAll,
    getById,
    editById,
    deleteById
}