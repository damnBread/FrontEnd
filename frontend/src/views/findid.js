import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/Login.css";
import Swal from "sweetalert2";

function Findid() {

    const [InputEmail, setInputEmail] = useState("");       
    const [InputCode, setInputCode] = useState(""); 

    const [status, setStatus] = useState(false);

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputCode = (e) => {
        setInputCode(e.target.value);
    };

    const history = useHistory();

    function emailVerify() {
        axios.get('http://localhost:3000/login/findId/verify', {
            email: InputEmail
        })
        .then(async response => {
            console.log(response);
            console.log("id 찾기 email get 완료!")
            
        })
        .catch((error) => {
            console.log(error);
            console.log(error.data);
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "입력하신 이메일이 올바르지 않아 인증 코드를 전송할 수 없습니다. 다시 입력해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
                if (res.isConfirmed) {
                     //삭제 요청 처리
                }
                else{
                    //취소
                }
            });
        });
    };

    function findid() {
        axios.get('http://localhost:3000/login/findId', {
        })
        .then(async response => {
            console.log(response);
            console.log("id 찾기 완료!");
        })
        .catch((error) => {
            console.log(error);
            console.log(error.data);
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "인증 코드가 틀립니다. 다시 입력해주세요.",
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
                if (res.isConfirmed) {
                     //삭제 요청 처리
                }
                else{
                    //취소
                }
            });
        });
    };
    
    return(
        <div>
                <div className="logo-container">
                        <img src={damnBreadLogo} alt="damnBreadLogo" width="30"/>
                        <span className="logo-container-1">
                            <b>아이디 찾기</b>
                        </span>
                </div>
                <div className="division-line"></div>


            {/* 연동할 때 다시 확인 */}
            {!status ? (
                <div className="login-form">
                    <label style={{fontSize: "16px", marginTop: "-300px", marginLeft: "-490px", zIndex: 1}}><b>이메일</b></label>
                    <div>
                        <input type='text' id="id" name="id" placeholder="이메일" value={InputEmail}
                             onChange={handleInputEmail} style={{width:"450px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={emailVerify} disabled={InputEmail.length !==0 ? false:true } style={{fontSize: "11px", width: "90px", height: "30px", 
                        borderColor: "#BF5E49", marginLeft: "10px", marginTop: "10px", backgroundColor: "#BF5E49B0",
                         border:"0px", borderRadius: "5px"}}>인증 코드 전송</button>    
                    </div>

                    <div>
                        <input type='text' id="id" name="id" placeholder="인증 코드" value={InputCode}
                             onChange={handleInputCode} style={{width:"450px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={findid} disabled={InputCode.length !==0 ? false:true } style={{fontSize: "11px", width: "90px", height: "30px", 
                        borderColor: "#BF5E49", marginLeft: "10px", marginTop: "10px", backgroundColor: "#BF5E49B0",
                         border:"0px", borderRadius: "5px"}}>인증하기</button>
                    </div>

            </div>
            ) : (
                <div className="login-form">
                <label style={{fontSize: "16px", marginTop: "-300px", marginLeft: "-490px", zIndex: 1}}><b>회원님의 아이디는 </b></label>
                        <button type='button' style={{fontSize: "11px", width: "150px", height: "30px", 
                        borderColor: "#BF5E49", marginLeft: "10px", marginTop: "10px", backgroundColor: "#BF5E49B0",
                         border:"0px", borderRadius: "5px"}}>비밀번호 찾기</button>
                         <button type='button' style={{fontSize: "11px", width: "150px", height: "30px", 
                        borderColor: "#BF5E49", marginLeft: "10px", marginTop: "10px", backgroundColor: "#BF5E49B0",
                         border:"0px", borderRadius: "5px"}}>로그인하기</button>
                    </div>
            )}
            
        </div>
    )

}
 
export default Findid;