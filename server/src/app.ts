import express, { Application } from "express";
import { createConnection } from "typeorm";
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import userRouter from "./routes/user";
import favoriteRouter from "./routes/favorite";
import postRouter from "./routes/post";
import commentRouter from "./routes/comment";


const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));


app.use("/user", userRouter);
app.use("/favorites", favoriteRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

//typeorm connection 
createConnection().then(connection => {

    app.get('/*', (req, res)=>{
        res.sendFile(path.join(__dirname,'build/index.html'))
    })

    const PORT = process.env.PORT || 1337;

    app.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });

}).catch(err => console.log(err));