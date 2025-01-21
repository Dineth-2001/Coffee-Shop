import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import cookieParser from 'cookie-parser';

import itemRouter from './routes/itemRoute.js';
import userRouter from './routes/userRoute.js';
import deliveryRouter from './routes/deliveryRoute.js';
import cart_itemRouter from './routes/cart_itemRoute.js';
import cartRouter from './routes/cartRoute.js';
import employeeRouter from './routes/employeeRoute.js';

import 'dotenv/config';


// App Config
const app = express();
const port = 4000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(cookieParser());

// DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the MySQL database!');
    return sequelize.sync({alter: true}); // Sync all models
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.message);
});




// API Endpoints
app.use('/api/item', itemRouter);
app.use('/api/user', userRouter);
app.use('/api/delivery', deliveryRouter);
app.use('/api/cart', cartRouter);
app.use('/api/cart_item', cart_itemRouter);
app.use('/api/employee', employeeRouter);
app.use('/images', express.static('uploads'));




app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
