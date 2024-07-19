const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");
const cors = require('cors');
const https = require('https');

// Initialize MongoDB connection
mongoDB();

// CORS configuration to allow requests from the frontend
app.use(cors({
  origin: "https://front-putx.onrender.com",
  methods: "GET, PUT, PATCH, POST, DELETE",
  credentials: true, // Enable set cookie
}));

app.use(express.json());

// Define routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Keep the server awake on Render
setInterval(() => {
  https.get('https://backend-b06f.onrender.com', (res) => {
    console.log(`Server hit with status code: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}, 3 * 60 * 1000); // Ping the server every 3 minutes (180000 ms)
