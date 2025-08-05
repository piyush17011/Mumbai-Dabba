
const express = require('express');
const connect = require('./dbConnection');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const mealRoutes = require('./routes/mealRoutes');

const app = express();
connect();

const corsOptions = {
    origin: true,
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/users",userRoutes);

app.use("/api/orders",orderRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/meals",mealRoutes);


app.listen(5000,()=>{
    console.log("Server is running...")
});