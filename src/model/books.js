import mongoose from './index.js'

const emailvalidation = (value)=>{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(value)
}

const StudentSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:emailvalidation,
            message:props=>`${props.value} is not a valid email`
        }
    },
    mobile:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Boolean,
        default:true
    },
    Studentof:{
        type:String
    },
    PreviousStudentof:{
        type:Array,
        default:[]
    }
},{
    versionKey:false,
    collection:'student'
})

const StudentModel = mongoose.model('student',StudentSchema)
export default StudentModel