//email,password,roles
const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {   
        username: {
            type: String,
            required: true,
            trim: true,
            
          },
        email : { 
            type:String,
            unique:true,
            required:true
                //unique //not working 
        },
        phone:
          {
            type:Number,
            required:true
          }
          ,
        address : {
            type:String,
            required:true
        },
        role: {
            type: String,
            enum: ['admin', 'user','kitchen'], // Restrict roles to specific values
            // default: 'user', // Default role is 'user'
          },
          
            password : { 
            type:String,
            required:true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },

        },
    
    {
        timestamps : true,
    }

)
// const user1=new UserSchema("piyush","gg","admin");
module.exports = mongoose.model("User",userSchema);