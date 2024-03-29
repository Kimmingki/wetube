// const express = require("express");
import express from "express";
import morgan from "morgan";
import path from "path";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

// html 쓰지 않고 view engine을 pug로 쓰기
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session 확인 미들웨어
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    // 로그인한 유저에게만 session 건내주기
    saveUninitialized: false,
    // 쿠키값 설정
    cookie: {
      // 쿠기 만료일자 설정
      maxAge: 20000000,
    },
    // session을 mongoDB에 저장하기
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());

// middleware는 순서가 중요 session보다 뒤에 와야함
app.use(localsMiddleware);

// routing은 마지막에
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
