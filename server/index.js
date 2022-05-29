import express from 'express';
import mogoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

// 123dev - password
// mongodb+srv://Evgene:<password>@cluster0.uzhho.mongodb.net/?retryWrites=true&w=majority
const app = express();

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello express')
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})