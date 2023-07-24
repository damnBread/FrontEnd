import React, { useState } from "react";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import { useHistory, Link } from "react-router-dom";
import $ from "jquery";
import "../assets/css/Agreement.css";
import Swal from "sweetalert2";

function Agreement() {

    const history = useHistory();

    const [selected, setSelected] = useState(null);

    const handleChange = (event) => {
        setSelected(event.target.value);
        console.log($('#cboxAll').is(':checked'));
        if($('#cboxAll').is(':checked')) {
            $("input[name=cbox]").prop("checked", true);
            $("input[name=cbox1]").prop("checked", true);
            $("input[name=cbox2]").prop("checked", true);
            $("input[name=cbox3]").prop("checked", true);
            $("input[name=cbox4]").prop("checked", true);
        } else {
            $("input[name=cbox]").prop("checked", false);
            $("input[name=cbox1]").prop("checked", false);
            $("input[name=cbox2]").prop("checked", false);
            $("input[name=cbox3]").prop("checked", false);
            $("input[name=cbox4]").prop("checked", false);
        }
      };

    function onClickSignUP() {
        if ($('#cboxAll').is(':checked') === true || ($("input[name=cbox1]").is(":checked") === false && $("input[name=cbox2]").is(":checked") === true && $("input[name=cbox3]").is(":checked") === true && $("input[name=cbox4]").is(":checked") === true))  {
            history.push('/SignUP'); // SignUP으로 url 이동
            window.scrollTo(0, 0);   //새 페이지로 이동한 후 화면이 맨 위로 스크롤
        } else {
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "필수 동의 항목을 모두 동의해주세요.",
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
        }
      }
    
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
                    <label style={{fontSize: "20px"}}><b>약관 동의</b></label>

                    <div className="box">
                        <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox" id="cboxAll" name="cboxAll" onClick={handleChange}
                          style={{marginLeft: "20px", marginTop: "25px", marginBottom: "10px", color: "#BF5E49"}}/>
                         <b> 필수 동의 항목 및 개인정보수집 및 이용 동의-마케팅(선택), 광고성 정보 수신 동의(선택)에 전체 동의합니다.</b></label><br></br>

                         <div className="division-line" style={{marginTop: "20px"}}></div>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox" name="cbox2" id="checkbox1"
                         style={{marginLeft: "20px", marginTop: "25px", color: "#BF5E49"}}/>
                         <b> (필수) 만 15세 이상입니다.</b></label><br></br>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox" name="cbox3" id="checkbox1"
                         style={{marginLeft: "20px", marginTop: "20px", color: "#BF5E49"}}/>
                         <b> (필수) 서비스 이용 약관 동의</b></label><br></br>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox" name="cbox4" id="checkbox1"
                         style={{marginLeft: "20px", marginTop: "20px",  marginBottom: "25px", color: "#BF5E49"}}/>
                         <b> (필수) 개인정보 수집 및 이용 동의</b></label><br></br>

                         <div className="division-line" style={{marginTop: "20px"}}></div>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox" name="cbox1" id="checkbox3"
                         style={{marginLeft: "20px", marginTop: "25px", color: "#BF5E49"}}/>
                         <b> (선택) 개인정보 수집 및 이용 동의 - 마케팅</b></label><br></br>

                         <label style={{fontSize: "13px", color: "#7F7F7F"}}><input type="checkbox" name="cbox1" id="checkbox3"
                         style={{marginLeft: "20px", marginTop: "20px",  marginBottom: "25px", color: "#BF5E49"}}/>
                         <b> (선택) 광고성 정보 이메일/SMS 수신 동의</b></label><br></br>
                    
                    </div>
                    <div className="border1" style={{marginLeft:"140px"}}>
                            <button onClick={onClickSignUP} type='button' style={{fontSize: "15px", borderColor: "#BF5E49", marginLeft: "160px", marginTop: "8px",
                                color:"#BF5E49", backgroundColor: "#FFFFFF", border:"0px", borderRadius: "10px"}}><b>회원가입</b></button>
                    </div>
                         

                </body>
            </div>
            
        </div>
        
    )
}

export default Agreement;