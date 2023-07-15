import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
    const [InputID, setInputID] = useState("");
    const [InputPW, setInputPW] = useState("");

    const handleInputID = (e) => {
        setInputID(e.target.value);
    };

    const handleInputPW = (e) => {
        setInputPW(e.target.value);
    };

    const onClickLogin = () => {
        console.log("click login");
        console.log("id: ", InputID);
        console.log("pw: ", InputPW);

        axios.post('http://localhost:8080/login', {
            id: InputID,
            pw: InputPW,
        })
        .then(response => {
            console.log(response);
            console.log("data.userId :: ", response.data.InputID);
            if (response.data.userID === undefined) {
                //id가 일치하지 않은 경우
                console.log("===========")
                alert("입력하신 ID는 회원가입하지 않은 ID입니다.");
            } else if (response.data.userID === null) {
                //id는 있지만 pw가 다른 경우
                console.log("+++++++++")
                alert("비밀번호가 일치하지 않습니다.");
            } else if(response.data.userID === InputID) {
                //id, pw 일치 -> 로그인 성공
                console.log("****로그인 성공*****");
                sessionStorage.setItem("userID", InputID);
                //sessionStorage.setItem("name", response.data.userID);
            }
            document.location.href = "/";  //로그인 되면 페이지 이동(새로고침)
        })
        .catch();
    };

    useEffect(() => {
        axios.get('http://localhost:8080/login')
        .then(response => console.log(response))
        .catch()
    },[])


    return(
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={InputID} onChange={handleInputID} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={InputPW} onChange={handleInputPW} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
            </div>
        </div>
    )
}
 
export default Login;