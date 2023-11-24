const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoDB = require("./db")
const cors = require('cors');

mongoDB();

//ye banana he padt hai jab frontend port 3000 se backend port 5000 pe data accept krna hota haii to
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })same;


app.use(cors({
  origin: "https://6560f03fe2e688167d89bd85--statuesque-haupia-65b657.netlify.app",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true, // enable set cookie
}));

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


//nomal express start
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
