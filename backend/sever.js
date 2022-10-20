import express from 'express';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`));