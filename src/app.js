import express from "express";
import viewRouter from "./router/viewRouter";
import apiRouter from "./router/apiRouter";
const app = express();

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/client/html");

app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

app.use("/api", apiRouter);
app.use("/", viewRouter);

app.listen(8080, () => {
  console.info("8080 포트 서버 열림 http://localhost:8080");
});
