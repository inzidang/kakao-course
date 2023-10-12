// const idDom = document.getElementById("id");
// const pwDom = document.getElementById("password");
// const nameDom = document.getElementById("name");
// const btn = document.getElementById("btn");

// const joinFetch = () => {
//     const id = idDom.value;
//     const password = pwDom.value;
//     const name = nameDom.value;

//     console.log(id);
//     console.log(password);
//     console.log(name);

//     // TODO : 서버 전송하고 비밀번호를 암호화 한다음 데이터베이스 저장
// }

// btn.addEventListener('click', joinFetch)



const joinBtn = document.getElementById("joinBtn");
const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");
const userNameInput = document.getElementById("userName");

const msgAlert = (position, message, type) => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton : false,
        timer: 2000,
    })
    Toast.fire({title: message, icon : type })
};

const joinFetch = async() => {
    const userId = userIdInput.value;
    const userPassword= userPasswordInput.value;
    const userName = userNameInput.value;

    if(!userId || !userPassword || !userName) {
        msgAlert("bottom", "모든 필드를 채워주세요", "error");
    }
    const response = await fetch("/api/join", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body : JSON.stringify({
            userId: userId,
            userPassword : userPassword,
            userName : userName,
        })
    })
    // console.log(response);
    const result = await response.json();
    // console.log(result);
    if(response.status === 201) {
            msgAlert("center", "회원가입 성공", "success");
            setTimeout(() => {
                window.location.href = "/login";
            },1000)
    } else {
        msgAlert("bottom", result.status, "error");
    }
    //존재하는 아이디
}

joinBtn.addEventListener("click", joinFetch)
