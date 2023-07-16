import React, { useEffect, useState } from "react";
import axios from "axios";
import damnBreadLogo from "./images/damnBread_logo.png";
import "./Login.css";

function SignUP() {


    return(
        <div>
                <div className="logo-container">
                        <img src={damnBreadLogo} alt="damnBreadLogo" width="30"/>
                        <span className="logo-container-1">
                            <b>회원가입</b>
                        </span>
                </div>
                <div className="division-line"></div>

            <div className="login-form">
                <body>
                    <div id="root"></div>
                    <img src={damnBreadLogo} alt="damnBreadLogo" width="120" className="logo-margin"/>
                    <div>
                        <input type='text' name='input_id' placeholder="아이디" value={InputID}
                             onChange={handleInputID} style={{width:"350px", height: "30px", marginTop: "10px", fontSize: "15px"}} />
                    </div>
                    <div>
                        <input type='password' name='input_pw' placeholder="비밀번호" value={InputPW}
                             onChange={handleInputPW} style={{width:"350px", height: "30px", marginTop: "15px", fontSize: "15px"}} />
                    </div>
                    <div>
                        <button type='button' onClick={onClickLogin} style={{width:"357px", height:"40px",
                             marginTop:"15px", backgroundColor:"#BF5E49", color:"#FFFFFF", border:"0px"}}>로그인</button>
                    </div>
                    <label style={{fontSize: "7px", color: "#7F7F7F"}}><input type="checkbox" name="info-save" value="login-info-save" 
                         style={{width: "11px", height: "11px", marginTop: "9px", color: "#BF5E49"}} checked={infoSave}
                         onChange={handleInfoSaveChange}/><b> 아이디 저장</b></label>
                        
                    <label style={{fontSize: "7px", color: "#7F7F7F", marginLeft: "153px"}}>아이디 찾기</label>
                    <label style={{fontSize: "7px", color: "#7F7F7F"}}> | </label>
                    <label style={{fontSize: "7px", color: "#7F7F7F"}}>비밀번호 찾기</label>

                    <div>
                        <label style={{fontSize: "7px", color: "#7F7F7F", marginLeft: "314px"}}><b>회원가입</b></label>
                    </div>

                    <div className="division-line-1"></div>
                </body>
                
            </div>
        </div>
        
    )
}

export default SignUP;