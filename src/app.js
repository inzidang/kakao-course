// common js
// const express = require("express");

// buile -> common js

import express from "express";

const app = express();
/* 
*node는sms 
*/
/**
 * express야 나 ejs 쓸거야
 */
app.set("view engine", "ejs");
/**
 * ejs의 파일의 위치는 여기야
 */
app.set("views", process.cwd() + "/src/client/html");

// console.log(process.cwd())
app.use((request, response, next) => {
console.log("지나갑니다");
next();
});

app.use((request, response, next) => {
console.log("지나갑니다2");
next();
});

app.get("/", (request, response) =>{
    const homeData = {
        data : [{name: "철수"},{name: "영희"},{name: "민수"}]
    };
    response.render("home", homeData);
});

app.get("/introduce", (request, response) =>{
    response.render("introduce");
});
// app.get("/", (request, response) =>
// response.send("루트로 들어왔습니다."));


app.get("/abc", (request, response) =>
response.send("abc로 들어왔습니다."));

/*
*port -cs 지식 (참고사항)
*/
app.listen(8080, () => {console.info("8080포트 서버  열림 http://localhost:8080");
});