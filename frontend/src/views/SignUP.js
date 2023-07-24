import React, { useEffect, useState } from "react";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/SignUP.css";
import axios from "axios";


function SignUP() {
    const [InputID, setInputID] = useState("");         //로그인 입력창
    const [InputPW, setInputPW] = useState("");         //비밀번호 입력창
    const [InputPWCHK, setInputPWCHK] = useState("");         //비밀번호 확인 입력창
    const [InputNickName, setInputNickName] = useState("");         //닉네임 입력창
    const [InputName, setInputName] = useState("");         //이름 입력창
    const [InputPhoneNumber, setInputPhoneNumber] = useState("");   //전화번호 입력창
    const [InputBirth, setInputBirth] = useState("");   //생년월일 입력창
    const [InputGender, setInputGender] = useState("");    //성별
    const [InputAddress, setInputAddress] = useState("");   //거주지 입력창
    const [InputEmail, setInputEmail] = useState("");       //이메일 입력창
    const [InputWorkArea, setInputWorkArea] = useState("");   //희망근무지역 입력창
    

    const handleInputID = (e) => {
        setInputID(e.target.value);
    };

    const handleInputPW = (e) => {
        setInputPW(e.target.value);
    };

    const handleInputPWCHK = (e) => {
        setInputPWCHK(e.target.value);
    }

    const handleInputNickName = (e) => {
        setInputNickName(e.target.value);
    };

    const handleInputName = (e) => {
        setInputName(e.target.value);
    };

    const handleInputPhoneNumber = (e) => {
        setInputPhoneNumber(e.target.value);
    };

    const handleInputBirth = (e) => {
        setInputBirth(e.target.value);
    };

    const handleInputAddress = (e) => {
        setInputAddress(e.target.value);
    };

    const handleInputGender = (e) => {
        setInputGender(e.target.value);
    };

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputWorkArea = (e) => {
        setInputWorkArea(e.target.value);
    };

    const onClickSignUP = () => {
        console.log("click SignUP");
        console.log("id: ", InputID);
        console.log("pw: ", InputPW);

        axios.post('http://localhost:3000/signup', {
            id: InputID,
            pw: InputPW,
            name: InputName,
            email: InputEmail,
            nickmame: InputNickName,
            phone: InputPhoneNumber,
            home: InputAddress,
            hopeLocation: InputWorkArea,
            birth: InputBirth,
            // gender: 
            // hopeJob: InputWorkArea,
            hopeLocation: InputWorkArea
        })
        .then(response => {
            console.log(response);
            alert("회원가입 완료");
            document.location.href = "/Login";  //회원가입 되면 로그인 페이지 이동(새로고침)
        })
        .catch();
    };

    // useEffect(() => {
    //     axios.get('http://localhost:3000/SignUP')
    //     .then(response => console.log(response))
    //     .catch()
    // },[])

    
    return(
        <div>
            <div className="logo-container">
                    <img src={damnBreadLogo} alt="damnBreadLogo" width="30" style={{position: "relative", zIndex: 2}}/>
                    <span className="logo-container-1">
                        <b>회원가입</b>
                    </span>
            </div>
            <div className="division-line" style={{position: "relative", zIndex: 2}}></div>

            <div className="SignUP-form">
                <body>
                    <div id="root"></div>

                    <label style={{fontSize: "16px", marginTop: "550px", position: "relative", zIndex: 1}}><b>아이디</b></label>
                    <div>
                        <input type='text' name='input_id' placeholder="아이디" value={InputID}
                             onChange={handleInputID} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px", 
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>    
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>비밀번호</b></label>
                    <label style={{fontSize: "9px", color: "#7F7F7F", marginTop: "30px", marginLeft: "20px"}}>8~20자, 하나 이상의 대문자, 특수문자 포함</label>
                    <div>
                        <input type='password' name='input_pw' placeholder="비밀번호" value={InputPW}
                             onChange={handleInputPW} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>
                    <div>
                        <input type='password' name='input_pw_check' placeholder="비밀번호 확인" value={InputPWCHK}
                             onChange={handleInputPWCHK} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>닉네임</b></label>
                    <div>
                        <input type='text' name='input_nickname' placeholder="닉네임" value={InputNickName}
                             onChange={handleInputNickName} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>이름</b></label>
                    <div>
                        <input type='text' name='input_name' placeholder="이름 (실명)" value={InputName}
                             onChange={handleInputName} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>전화번호</b></label>
                    <div>
                        <input type='text' name='input_phoneNumber' placeholder=" ex) 010-1234-5678" value={InputPhoneNumber}
                             onChange={handleInputPhoneNumber} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>생년월일</b></label>
                    <label style={{fontSize: "16px", marginTop: "30px", marginLeft: "85px"}}><b>성별</b></label>
                    <label style={{fontSize: "16px", marginTop: "30px", marginLeft: "23px"}}><b>거주지</b></label>
                    <div className="SignUP-form1">
                        <input type='date' name='input_birth' value={InputBirth}
                             onChange={handleInputBirth} style={{width:"130px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        
                        <select className="select-style" name="gender" id="gender" required="true">
                            <option value="true">남</option>
                            <option value="false">여</option>
                        </select>

                        <input type='text' name='input_address' placeholder="거주지" value={InputAddress}
                             onChange={handleInputAddress} style={{width:"150px", height: "40px", marginLeft: "10px"
                             , marginTop: "15px", borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />

                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                            marginTop: "22px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 검색</button>      
                   
                    </div>

                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>이메일</b></label>
                    <div>
                        <input type='text' name='input_email' placeholder="이메일" value={InputEmail}
                             onChange={handleInputEmail} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>희망 근무 지역</b></label>
                    <div>
                        <input type='text' name='input_workarea' placeholder="희망 근무 지역" value={InputWorkArea}
                             onChange={handleInputWorkArea} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 검색</button>      
                    </div>


                    <div className="border1">
                        <button type='button' style={{fontSize: "15px", borderColor: "#BF5E49", marginLeft: "164px", marginTop: "8px",
                             color:"#BF5E49", backgroundColor: "#FFFFFF", border:"0px", borderRadius: "15px"}}><b>회원가입</b></button>
                    </div>
                         

                </body>
            </div>
            
        </div>
        
    )
}

export default SignUP;