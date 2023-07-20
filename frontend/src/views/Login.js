import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/Login.css";

function Login() {
    const [InputID, setInputID] = useState("");         //로그인 입력창
    const [InputPW, setInputPW] = useState("");         //비밀번호 입력창
    const [infoSave, setInfoSave] = useState(false);    //아이디 저장 체크박스

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

    function onClickSignUP() {
      history.push('/SignUP'); // SignUP으로 url 이동
      window.scrollTo(0, 0);   //새 페이지로 이동한 후 화면이 맨 위로 스크롤
    }

    const onClickLogin = () => {
        console.log("click login");
        console.log("id: ", InputID);
        console.log("pw: ", InputPW);

        axios.post('http://localhost:3000', {
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
        axios.get('http://localhost:3000')
        .then(response => console.log(response))
        .catch()
    },[])

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
                             onChange={handleInputID} style={{width:"350px", height: "30px", marginTop: "10px", fontSize: "15px", left:"200px", borderRadius: "15px", padding: ".2em"}} />
                    </div>
                    <div>
                        <input type='password' name='input_pw' placeholder="비밀번호" value={InputPW}
                             onChange={handleInputPW} style={{width:"350px", height: "30px", marginTop: "15px", fontSize: "15px", borderRadius: "15px", padding: ".2em"}} />
                    </div>
                    <div>
                        <button type='button' onClick={onClickLogin} style={{width:"357px", height:"40px",
                             marginTop:"15px", backgroundColor:"#BF5E49", color:"#FFFFFF", border:"0px", borderRadius: "15px"}}>로그인</button>
                    </div>
                    <label style={{fontSize: "7px", color: "#7F7F7F"}}><input type="checkbox" name="info-save" value="login-info-save" 
                         style={{width: "11px", height: "11px", marginTop: "9px", color: "#BF5E49"}} checked={infoSave}
                         onChange={handleInfoSaveChange}/><b> 아이디 저장</b></label>
                        
                    <label style={{fontSize: "7px", color: "#7F7F7F", marginLeft: "153px"}}>아이디 찾기</label>
                    <label style={{fontSize: "7px", color: "#7F7F7F"}}> | </label>
                    <label style={{fontSize: "7px", color: "#7F7F7F"}}>비밀번호 찾기</label>

                    <div>
                        <label onClick={onClickSignUP} style={{fontSize: "7px", color: "#7F7F7F", marginLeft: "314px", cursor: "pointer"}}><b>회원가입</b></label>
                    </div>

                    <div className="division-line-1"></div>
                </body>
                
            </div>
        </div>
        
    )

}
 
export default Login;