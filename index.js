// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter');
// const ExpenseRouter = require('./Routes/ExpenseRouter');
// const ensureAuthenticated = require('./Middlewares/Auth');

// require('dotenv').config();
// const connectDB = require('./Models/db');
// connectDB();


// app.use(bodyParser.json());
// app.use(cors());

// app.get('/ping', (req, res) => {
//   res.send('PONG');
// });

// app.use('/auth', AuthRouter);
// app.use('/products', ProductRouter);
// app.use('/expenses', ensureAuthenticated, ExpenseRouter);

// // ✅ EXPORT APP (VERY IMPORTANT)
// module.exports = app;


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const connectDB = require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

// Connect DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter);

// ✅ THIS IS REQUIRED FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
