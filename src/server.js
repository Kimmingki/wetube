import express from "express";
// const express = require("express");
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morga("dev");

const handleHome = (req, res) => {
  return res.send("I still love you");
};

const handleLogin = (req, res) => {
  return res.send("Login");
};

app.use(logger);

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
