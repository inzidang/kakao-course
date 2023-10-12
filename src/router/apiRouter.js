// apiRouter.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { getCourseList, qrCheck } from "../controller/courseController";
import { authMe, join, login } from "../controller/userController";
import { handleKakaoLogin, isAuth } from "../middleware/auth";
import { Strategy as KakaoStrategy } from "passport-kakao";
const apiRouter = express.Router();


// /api

//코스
apiRouter.get("/courses", isAuth, getCourseList)
apiRouter.post("/courses", isAuth, qrCheck)

//회원가입
apiRouter.post("/join", join)
apiRouter.post("/login", login)

//카카오 로그인
const clientId = process.env.CLIENT_ID;
const callback = "/api/kakao/callback"

passport.use(new KakaoStrategy({ clientID : clientId, callbackURL : callback }, handleKakaoLogin));

apiRouter.get("/kakao", passport.authenticate("kakao", {session : false}));
apiRouter.get("/kakao/callback", (request, response) => {
    passport.authenticate("kakao", { session : false }, async (err, user, info) => {

        // info로 들어오면
        if(info) {
            console.error(info);
            return response.redirect("/login?error=" + info);
        } else if(!user) {
            return response.redirect("/login?error=sns_login_fall")
        } else {
            // console.log(user);
            const accessToken =  jwt.sign({id: user.user_id}, process.env.SECRET_KEY, {expiresIn : "30d"}) 
            // console.log(accessToken);
            // TODO 정상처리 해야함
            return response.redirect("/login/callback?accessToken=" + accessToken);
        }

    })(request, response);
})

apiRouter.post("/token/check", isAuth, authMe)
export default apiRouter;
