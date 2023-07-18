import React from "react";
import damnBreadLogo from "./images/damnBread_logo.png";
import "./Agreement.css";

function Agreement() {
    
    return(
        <div>
            <div className="logo-container">
                    <img src={damnBreadLogo} alt="damnBreadLogo" width="30"/>
                    <span className="logo-container-1">
                        <b>회원가입</b>
                    </span>
            </div>
            <div className="division-line"></div>

            <div className="Agreement-form">
                <body>
                    <div id="root"></div>
                    <label style={{fontSize: "20px", marginLeft: "390px"}}><b>약관 동의</b></label>

                    <div className="box">
                        <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox"
                         style={{marginLeft: "20px", marginTop: "25px", marginBottom: "10px", color: "#BF5E49"}}/>
                         <b>필수 동의 항목 및 개인정보수집 및 이용 동의-마케팅(선택), 광고성 정보 수신 동의(선택)에 전체 동의합니다.</b></label><br></br>

                         <div className="division-line" style={{marginTop: "20px"}}></div>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox"
                         style={{marginLeft: "20px", marginTop: "25px", color: "#BF5E49"}}/>
                         <b>(필수) 만 15세 이상입니다.</b></label><br></br>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox"
                         style={{marginLeft: "20px", marginTop: "20px", color: "#BF5E49"}}/>
                         <b>(필수) 서비스 이용 약관 동의</b></label><br></br>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox"
                         style={{marginLeft: "20px", marginTop: "20px",  marginBottom: "25px", color: "#BF5E49"}}/>
                         <b>(필수) 개인정보 수집 및 이용 동의</b></label><br></br>

                         <div className="division-line" style={{marginTop: "20px"}}></div>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox"
                         style={{marginLeft: "20px", marginTop: "25px", color: "#BF5E49"}}/>
                         <b>(선택) 개인정보 수집 및 이용 동의 - 마케팅</b></label><br></br>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox"
                         style={{marginLeft: "20px", marginTop: "20px",  marginBottom: "25px", color: "#BF5E49"}}/>
                         <b>(필수) 광고성 정보 이메일/SMS 수신 동의</b></label><br></br>
                    
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

export default Agreement;