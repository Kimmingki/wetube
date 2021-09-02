// const express = require("express");
import express from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

// html 쓰지 않고 view engine을 pug로 쓰기
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

// session 확인 미들웨어
app.use(
  session({
    secret: "Hello!",
    resave: false,
    saveUninitialized: false,
    // session을 mongoDB에 저장하기
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
  })
);

// middleware는 순서가 중요 session보다 뒤에 와야함
app.use(localsMiddleware);

// routing은 마지막에
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
