
import mongoose from "mongoose";
const schema = mongoose.Schema
const blog = new schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    by:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
export default mongoose.model('newBlogData',blog) 