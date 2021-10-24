// dotenv 추가 주석 방식으로 적용하면 .env를 사용하는 모든 파일에 적용시켜야함
// require("dotenv").config();
import regeneratorRuntime from "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
