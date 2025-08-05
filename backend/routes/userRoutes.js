const express = require('express');

const { registerUser, loginUser,getUsers,deleteUserAndOrders } = require('../controller/userController');
const router = express.Router();

router.post('/register',registerUser)
router.post("/login",loginUser)
router.get("/allusers",getUsers)
// router.delete('/deleteuser/:id', deleteUserAndOrders);
router.delete('/deleteuser/:userId', deleteUserAndOrders);


module.exports = router;