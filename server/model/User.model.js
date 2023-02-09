import mongoose from "mongoose";

// Creating Mongoose Schema in which we'll specify structure of mongoDB document

export const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required :[true, "Please Provide Unique Username"],
        unique:[true,"Username Exist"]
    },

    password:{
        type:String,
        required:[true,"please Provide a password"],
        unique: false,
    },

    email:{
        type: String,
        required:[true,"please provide a unique Email"],
        unique:true,
    },

    firstName: {type: String},
    lastName:  {type: String},
    mobile:    {type: Number},
    address:   {type: String},
    profile:   {type: String},
})


// Here if UserModel is already there we'll use that otherwise we'll use another one
// Now keep in mind when we use mongoose.model.Users we have to specify pluarl Name to collection name like "Users"
export default mongoose.model.Users|| mongoose.model('user',UserSchema);