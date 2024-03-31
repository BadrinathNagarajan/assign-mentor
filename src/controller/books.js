import StudentModel from '../model/books.js'
import UserModel from '../model/users.js'


const getAll = async (req,res)=>{
   
    try {
        
        let users = await StudentModel.find()
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

const create = async(req,res)=>{
    
    try {
        await StudentModel.create(req.body)

        res.status(200).send({
            message:"Student Created Successfully"
        })
       
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const assignstudent = async(req,res)=>{
    
    const {userID,studentID} = req.body

    let user = await UserModel.findById(userID)
    let student = await StudentModel.findById(studentID)
    

    if(user && student && student.status)
    {
        student.Studentof = user.name
        student.status = false
        await student.save()

        user.students.push(student._id)
        await user.save()
        
        res.status(200).send({
            message:"Data saved successfully"
        })
    }
    else
    {
        res.status(400).send({
            message:"UserID and StudentID is invalid"
        })
    }
}

const changementor = async(req,res)=>{
    const{userID,studentID,newuserID} = req.body

    let user = await UserModel.findById(userID)
    let student = await StudentModel.findById(studentID)
    let newuser = await UserModel.findById(newuserID)

    console.log(student)

    if(user && student && newuser)
    {
        student.Studentof = newuser.name
        student.status = false
        student.PreviousStudentof.push(user._id)
        await student.save()

        user.students.splice(user.students.indexOf(student._id),1)
        await user.save()

        newuser.students.push(student._id)
        await newuser.save()

        res.status(200).send({
            message:"New Mentor assigned Successfully"
        })
    }
    else
    {
        res.status(200).send({
            message:"New Mentor not assigned"
        })
    }
}

const studentsformentor = async(req,res)=>{
    let userID = req.params.id
    let user = await UserModel.findById(userID)
    console.log(userID,user)
    if(user)
    {
        let students = await StudentModel.find({_id:{
            $in:user.students
        }})

        console.log(students)
        res.status(200).send({
            message:"Data fetched successfully",
            students
        })
    }
    else{
        res.status(200).send({
            message:"Invalid UserID"
        })
    }
}

 const previousmentor = async(req,res)=>{
     let studentID = req.params.id
     let student = await StudentModel.findById(studentID)
     console.log(student)
     try {
        if(student)
        {
         let users =  await UserModel.find({_id:{
             $in: student.PreviousStudentof
        }})

        console.log(users)
        res.status(200).send({
            message:"Data of Previous mentor fetched successfully",
            users
         })
     }
     else{
        res.status(200).send({
            message:"Invalid StudentID"
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
    assignstudent,
    changementor,
    studentsformentor,
    previousmentor
}