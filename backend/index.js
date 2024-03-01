import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import corse from "cors";

const app = express();
app.use(bodyParser.json())
app.use(corse());
dotenv.config();

const PORT = process.env.PORT || 4500;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

  console.log("DB connected Successfully");

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
}).catch(error => console.log(error));

// connect("mongodb://localhost:27017/collectionName", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// });

// app.get('/', (req, res) => {
//   res.send('Hello from the Node.js backend!');
// });


