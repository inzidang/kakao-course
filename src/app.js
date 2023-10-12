import "dotenv/config";
import "regenerator-runtime";

import express from "express";
import viewRouter from "./router/viewRouter";
import apiRouter from "./router/apiRouter";

const app = express();

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html");

// json 데이터 파싱 미들웨어
app.use(express.json());

app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

app.use("/api", apiRouter);
app.use("/", viewRouter);

app.listen(8080, () => {
  console.info("8080 포트 서버 열림 http://localhost:8080");
});

