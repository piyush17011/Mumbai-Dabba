const mongoose = require('mongoose');
const { subscribe } = require('../routes/userRoutes');
const orderSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  kId: {
    type: mongoose.Schema.Types.ObjectId, // Kitchen ID as ObjectId
    ref: 'User', // Optionally, reference to a Kitchen model (if you have one)
    required: true,
  },
    
  orderItems: [{
      
      meal: {
        type: String,
        required: true,
      },
      deliveryAddress:{
        type: String,
        required: true,
      },
      subscriptionType:{
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    }],
    amount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model('Order', orderSchema);
