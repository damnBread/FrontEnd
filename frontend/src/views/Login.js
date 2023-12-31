import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/Login.css";
import Swal from "sweetalert2";

function Login() {

    const [InputID, setInputID] = useState("");         //로그인 입력창
    const [InputPW, setInputPW] = useState("");         //비밀번호 입력창
    const [infoSave, setInfoSave] = useState(false);    //아이디 저장 체크박스

    const [cookies, setCookie, removeCookie] = useCookies();

    const handleInputID = (e) => {
        setInputID(e.target.value);
    };

    const handleInputPW = (e) => {
        setInputPW(e.target.value);
    };

    const handleInfoSaveChange = (e) => {
        setInfoSave(e.target.checked);
    };

    const history = useHistory();

    function onClickAgreement() {
      history.push('/Agreement'); // SignUP으로 url 이동
      window.scrollTo(0, 0);   //새 페이지로 이동한 후 화면이 맨 위로 스크롤
    }


    function onClickLogin() {
        console.log("click login");
        console.log("id: ", InputID);
        console.log("pw: ", InputPW);

        axios.post('http://localhost:3000/login', {
            id: InputID,
            pw: InputPW,
        })
        .then(async response => {
            console.log(response);
            console.log("token", response.data); //회원의 고유 토큰
            sessionStorage.setItem("id", InputID);
            for (const [key, value] of Object.entries(response.data)) {
                console.log(`Key: ${key}`);
                console.log(`Value: ${value}`);
                console.log("****로그인 성공*****");
                sessionStorage.setItem("token", value);     //웹브라우저에 SessionStorage에 저장 -> 찾아보니 이게 베스트인 거 같아요
                sessionStorage.setItem("idNum", key);
                
                setCookie('token', response.data, {                 //웹브라우저에 쿠키에 저장
                    path: '/',             
                    // maxAge: 20000
                });

                localStorage.setItem('token', cookies.token);       //웹브라우저에 localStroge에 저장
                
                console.log('token1', cookies.token);

                document.location.href = "/";  //로그인 되면 페이지 이동(새로고침)
              }
        })
        .catch((error) => {
            console.log(error);
            console.log(error.data);
            if(error.message.status === 400) {
                Swal.fire({
                    icon: "warning",
                    title: "경고",
                    text: "입력하신 ID나 비밀번호가 올바르지 않습니다. 다시 입력해주세요.",
                    showCancelButton: false,
                    confirmButtonText: "확인",
                    width: 800,
                    height: 100,
                }).then((res) => {
                });
            }             
        });
    };

    function onClickFindId() {
        console.log("IDID");
        document.location.href = "/findID";
        window.scrollTo(0, 0);
    }

    function onClickFindPW() {
        console.log("PWPW");
        document.location.href = "/findPW";
        window.scrollTo(0, 0);
    }
    
    return(
        <div>
                <div className="logo-container">
                        <img src={damnBreadLogo} alt="damnBreadLogo" width="30"/>
                        <span className="logo-container-1">
                            <b>로그인</b>
                        </span>
                </div>
                <div className="division-line"></div>

            <div className="login-form">
                <body>
                    <div id="root"></div>
                    <img src={damnBreadLogo} alt="damnBreadLogo" width="120" className="logo-margin"/>
                    <div>
                        <input type='text' name='input_id' placeholder="아이디" value={InputID}
                             onChange={handleInputID} style={{width:"350px", height: "40px", marginTop: "10px", fontSize: "15px", left:"200px", 
                             borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                    </div>
                    <div>
                        <input type='password' name='input_pw' placeholder="비밀번호" value={InputPW}
                             onChange={handleInputPW} style={{width:"350px", height: "40px", marginTop: "15px", fontSize: "15px", 
                             borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                    </div>
                    <div>
                        <button type='button' onClick={onClickLogin} style={{fontSize: "15px", width:"357px", height:"40px",
                             marginTop:"15px", backgroundColor:"#BF5E49", color:"#FFFFFF", border:"0px", borderRadius: "10px"}}>로그인</button>
                    </div>
                    <label style={{fontSize: "7px", color: "#7F7F7F"}}><input type="checkbox" name="info-save" value="login-info-save" 
                         style={{width: "11px", height: "11px", marginTop: "9px", color: "#BF5E49"}} checked={infoSave}
                         onChange={handleInfoSaveChange}/><b> 아이디 저장</b></label>
                        
                    <label onClick={onClickFindId} style={{fontSize: "7px", color: "#7F7F7F", marginLeft: "153px"}}>아이디 찾기</label>
                    <label style={{fontSize: "7px", color: "#7F7F7F", marginLeft: "8px", marginRight: "8px"}}>|</label>
                    <label onClick={onClickFindPW} style={{fontSize: "7px", color: "#7F7F7F"}}>비밀번호 찾기</label>

                    <div>
                        <Link to={'/Agreement'}>
                            <label onClick={onClickAgreement} style={{fontSize: "7px", color: "#7F7F7F", marginLeft: "314px", cursor: "pointer"}}><b>회원가입</b></label>
                        </Link>
                    </div>

                    <div className="division-line-1"></div>
                </body>
                
            </div>
        </div>
        
    )

}
 
export default Login;