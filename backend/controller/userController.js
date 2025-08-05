
const User = require('../model/userModel');
const { use } = require('../routes/userRoutes');
const jwt = require("jsonwebtoken");
const SECRET_KEY =  "Piyush@17";
const Order = require('../model/orderModel'); // Adjust the path as necessary


const registerUser = async(req,res)=>{
    try{
        const{ username , email, phone,address, role, password } = req.body;
    // console.log("test->",email,password,role);
    const existingUser = await User.findOne ({ email });
    if(existingUser){
        console.log(res);
        res.json({
            message: "Exists",
          });
    }
    else{
        const user = await User.create ({
            username,
            email,
            phone,
            address,
            role,
            password,
            
        });
        console.log(user)
        await user.save()
        res.send(user);
        
    }

    }
    catch(err){
        console.log(err);
    }
    
    
}

// const loginUser = async(req,res)=>{
    
//   const { email, password , role} = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && user.password === password) {
      
//       const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
//       console.log(token);
//       res.status(200).json({
//         token,
//         data: { ...user } });
//       // res.cookie("token",token)
    
//     }
//     else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   }
//    catch(err){
//     res.status(500).json({ message: err.message }); 
//    }

           
// }

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password && user.password !== password) {
      return res.status(403).json({ message: 'Password Incorrect' });
    }

    // Check if the user role matches the requested role
    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Access denied: incorrect role' });
    }

    // Generate JWT token with user information and role
    const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

    // Return the token and user data (excluding password)
    res.status(200).json({
      token,
      data: { ...user.toObject(), password: undefined }, // Exclude password
    });

  } catch (err) {
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const deleteUserAndOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // First, find and delete the orders associated with the user
    const deletedOrders = await Order.deleteMany({ userId });

    if (deletedOrders.deletedCount === 0) {
      console.log(`No orders found for user with ID ${userId}`);
    } else {
      console.log(`${deletedOrders.deletedCount} orders deleted for user ${userId}`);
    }

    // Now, delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    console.log(`User with ID ${userId} deleted successfully`);

    // Send a response back to the client indicating success
    res.status(200).json({ success: true, message: 'User and their orders deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user and orders:', error);
    res.status(500).json({
      success: false,
      message: `Failed to delete user and their orders: ${error.message}`,
    });
  }
};

module.exports = {registerUser,loginUser,getUsers,deleteUserAndOrders};  //use curly brackets to export more than one var,fn
 










































