import React, { useEffect, useState } from "react";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/SignUP.css";

function SignUP() {
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
    
    return(
        <div>
            <div className="logo-container">
                    <img src={damnBreadLogo} alt="damnBreadLogo" width="30"/>
                    <span className="logo-container-1">
                        <b>회원가입</b>
                    </span>
            </div>
            <div className="division-line"></div>
{/* ... */}
            <div className="SignUP-form">
                <body>
                    <div id="root"></div>
                    <label style={{fontSize: "16px"}}><b>아이디</b></label>
                    <div>
                        <input type='text' name='input_id' placeholder="아이디" value={InputID}
                             onChange={handleInputID} style={{width:"400px", height: "30px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "15px", padding: ".2em"}} />
                    </div>
                    
                    <div className="border1">
                        <button type='button' style={{fontSize: "15px", borderColor: "#BF5E49", marginLeft: "143px", marginTop: "8px",
                             color:"#BF5E49", backgroundColor: "#FFFFFF", border:"0px", borderRadius: "15px"}}><b>회원가입</b></button>
                    </div>
                         

                </body>
            </div>
            
        </div>
        
    )
}

export default SignUP;