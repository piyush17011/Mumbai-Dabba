
const Order = require('../model/orderModel');


const createOrder = async (req, res) => {
  const { userId, kId, orderItems, amount } = req.body;
  try {
    const newOrder = new Order({ userId, kId, orderItems, amount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error saving order:', err); // Log error to console
    res.status(400).json({ message: err.message });
  }
};


// Get all orders

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    .populate('userId', 'username email') // Populate user details
    .sort({ createdAt: -1 }); // Optional: Sort orders by creation date (newest first) // Populate orderItems.product with selected fields

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve all orders for this user
    const orders = await Order.find({ userId })
      .populate('userId', 'username email') // Populate user details
      .sort({ createdAt: -1 }); // Optional: Sort orders by creation date (newest first)

    res.json(orders); // Send the orders back as the response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to delete all orders of a user
const deleteUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    // Delete all orders associated with the userId
    const deletedOrders = await Order.deleteMany({ userId });

    if (deletedOrders.deletedCount > 0) {
      return res.status(200).json({ success: true, message: 'Orders deleted successfully.' });
    } else {
      return res.status(404).json({ success: false, message: 'No orders found for this user.' });
    }
  } catch (error) {
    console.error('Error deleting orders:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete orders.' });
  }
};

// Get kitchen orders based on the kitchen user ID
const mongoose = require('mongoose'); // Ensure mongoose is required
const getKorders = async (req, res) => {
  try {
    const kitchenId = req.params.id;

    // Fetch orders where the kId matches the given kitchenId
    const orders = await Order.find({ kId: new mongoose.Types.ObjectId(kitchenId) })
      .populate('userId', 'username email') // Populate user details
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this kitchen.' });
    }

    res.status(200).json(orders); // Send the orders back as the response
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};




module.exports = {createOrder,getAllOrders,getUserOrders,deleteUserOrders,getKorders};  //use curly brackets to export more than one var,fn
 










































