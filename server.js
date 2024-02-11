const express = require("express");
const path = require("path"); // Import path module
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

// Establish database connection
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
