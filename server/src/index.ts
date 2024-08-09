import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { userAuth } from './Routes/userRoutes';
import { mailAuth } from './Routes/mailRoutes';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = 9000;
const mongo_url = 'mongodb+srv://raman75way:75WT446@cluster0.3uxpqtx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongo_url)
    .then(() => console.log("Mongo DB Connected :)"))
    .catch((err) => console.log(err))

app.get('/', (req: Request, res: Response)=>{
    res.send(
        "Hello, TypeScript with Node.js!"
    )
})

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})

// base route
app.use('/', userAuth);
app.use('/mail', mailAuth);