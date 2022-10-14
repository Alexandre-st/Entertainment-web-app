import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// To setup the project
const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5050;

mongoose.connect(process.env.CONNECTION_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => app.listen(PORT), () => console.log(`Server running on Port : ${PORT}`)).catch((error) => console.error(error.message)); 