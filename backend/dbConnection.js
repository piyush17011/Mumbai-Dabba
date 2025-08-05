require('dotenv').config(); // ✅ load .env file
const mongoose = require('mongoose'); 


const connection= async() =>{
    try{
        const connection  = await mongoose.connect(process.env.MONGO_URL);
        //
    }       
    catch(err){
        console.log(err);
    }
}
module.exports = connection;