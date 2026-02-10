import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import RegisterRouter from "./routes/register";
import LoginRouter from "./routes/login";

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/register", RegisterRouter);
app.use("/login", LoginRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});