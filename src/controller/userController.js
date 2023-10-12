import bcrypt from "bcrypt";
import db from "../config/db";
import jwt from "jsonwebtoken";
import { request, response } from "express";

export const join = async(request, response) => {
    // console.log("들어옴");
    const joinData = request.body;
    // console.log(joinData);
    // 20~300 성공, 400 프론트 잘못, 500 백엔드 잘못 ---> 외우지 말고 "Http 상태코드"로 검색해 보면 됨

    // id가 중복인지 여부 체크 (duplicate id)

    const QUERY1 = `SELECT * FROM users WHERE user_email=?`;
    const user = await db.execute(QUERY1, [joinData.userId])
                        .then((result) => result[0][0]);

    if(user) {
        return response.status(400).json({status : "ID 중복"})
    }

    // 비밀번호 암호화
    // 8번 최소, 12 좀 많은데?
    // 높을수록 암호화 높음, 시간 많이 듬
    // 1초안에 처리 가능하도록
    const hashPassword = await bcrypt.hash(joinData.userPassword, 8);

    console.log(hashPassword);

    // 회원가입
    const QUERY2 = `
        INSERT INTO users
            (user_email, user_password, user_name)
        VALUES
            (?, ?, ?)`

        db.execute(QUERY2, [joinData.userId, hashPassword, joinData.userName])

    response.status(201).json({ status : "success"});

}

export const login = async (request, response) => {
    const loginData = request.body; //userId, userPassword

    const QUERY1 = `SELECT * FROM users WHERE user_email = ?`;
    const user = await db.execute(QUERY1, [loginData.userId]).then((result) => result[0][0]);

    if(!user) {
        return response.status(400).json({ status : "아이디, 비밀번호 확인"});
    }
    // console.log(user);
    // 2. 비밀번호 확인 - DB비밀번호(암호화된 값 - 프론트에서 보낸 비밃번호(1234)
    const isPasswordRight = await bcrypt.compare(loginData.userPassword, user.user_password);
    // True, False
    console.log(isPasswordRight);
    if(!isPasswordRight) { // !true = false => 비밀번호가 틀리면
        return response.status(400).json({ status : "아읻, 비밀번호 확인"});
    }

    // 3.json web Token 토큰을 만들어야함 -> 로그인 유지
    // 서버는 바보라서 단기기억상실
    // npm install jsonwebtoken 

    const accessToken =  jwt.sign({id: user.user_id}, process.env.SECRET_KEY, {expiresIn : "30d"}) //3개 넣을 수 있음 - 넣을 값, 시크릿 값, 만료일
    console.log(accessToken);
    return response.status(200).json({ accessToken : accessToken });
}

export const authMe = (request, response) => {
    const user = request.user;
    return response.status(200).json(user);
}