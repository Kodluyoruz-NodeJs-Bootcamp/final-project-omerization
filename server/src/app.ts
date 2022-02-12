import express, { Application, Request, Response, NextFunction } from "express";
import { createConnection, getRepository, getConnection, Repository } from "typeorm";
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from "./routes/user";
import favoriteRouter from "./routes/favorite";
import postRouter from "./routes/post";
import commentRouter from "./routes/comment";


const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());


app.use("/user", userRouter);
app.use("/favorites", favoriteRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

//typeorm connection 
createConnection().then(connection => {

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });

}).catch(err => console.log(err));