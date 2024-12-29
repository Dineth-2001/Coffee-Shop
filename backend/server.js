import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import itemRouter from './routes/itemRoute.js';


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





app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
