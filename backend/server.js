import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import itemRouter from './routes/itemRoute.js';
import userRouter from './routes/userRoute.js';
import deliveryRouter from './routes/deliveryRoute.js';
import cart_itemRouter from './routes/cart_itemRoute.js';
import cartRouter from './routes/cartRoute.js';


// App Config
const app = express();
const port = 4000;

// Middlewares
app.use(express.json());
app.use(cors());

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





app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
