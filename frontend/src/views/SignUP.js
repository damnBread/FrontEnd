import React, { useState } from "react";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/SignUP.css";
import axios from "axios";
import Swal from "sweetalert2";
import 'moment/locale/ko';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

function SignUP() {
    const [InputID, setInputID] = useState("");         //로그인 입력창
    const [InputPW, setInputPW] = useState("");         //비밀번호 입력창
    const [InputPWCHK, setInputPWCHK] = useState("");         //비밀번호 확인 입력창
    const [InputNickName, setInputNickName] = useState("");         //닉네임 입력창
    const [InputName, setInputName] = useState("");         //이름 입력창
    const [InputPhoneNumber, setInputPhoneNumber] = useState("");   //전화번호 입력창
    const [InputBirth, setInputBirth] = useState(Date);   //생년월일 입력창
    const [InputGender, setInputGender] = useState(true);    //성별
    const [InputAddress, setInputAddress] = useState("");   //거주지 입력창
    const [InputEmail, setInputEmail] = useState("");       //이메일 입력창
    const [InputWorkArea, setInputWorkArea] = useState([,]);   //희망근무지역 입력창
    const [InputWorkJob, setInputWorkJob] = useState([]);   //희망업직종 입력창 

    const [usableId, setUsableId] = useState(false);  //아이디 중복확인  -> true여야 사용 가능
    const [usableNickname, setUsableNickname] = useState(false);  //닉네임 중복확인
    const [usableEmail, setUsableEmail] = useState(false);  //이메일 중복확인    (인증하기 X -> 중복확인)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        console.log(e.target.value);
    };

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputWorkArea = (e) => {
        setInputWorkArea(e.target.value);
    };

    const handleInputWorkJob = (e) => {
        setInputWorkJob(e.target.value);
    };

    const items = [     //지역 선택 아이템
        { 
            type: 'Seoul',
            title: '서울',
        },
        {
            type: 'Gyeonggi',
            title: '경기',
        },
        {
            type: 'Incheon',
            title: '인천',
        },
        {
            type: 'Gwangwon',
            title: '강원',
        },
        {
            type: 'Daejeon',
            title: '대전',
        },
        {
            type: 'Sejong',
            title: '세종',
        },
        {
            type: 'Chungnam',
            title: '충남'
        },
        {
            type: 'Chungbuk',
            title: '충북',
        },
        {
            type: 'Busan',
            title: '부산',
        },
        {
            type: 'Ulsan',
            title: '울산',
        },
        {
            type: 'Gyeongnam',
            title: '경남',
        },
        {
            type: 'Gyeongbuk',
            title: '경북',
        },
        {
            type: 'Daegu',
            title: '대구',
        },
        {
            type: 'Gwangju',
            title: '광주',
        },
        {
            type: 'Jeonnam',
            title: '전남',
        },
        {
            type: 'Jeonbuk',
            title: '전북',
        },
        {
            type: 'Jeju',
            title: '제주',
        }
      ];

      const items_city = [     //지역 선택 아이템
        { 
            type: 'Gangnam',
            title: '강남구',
        },
        {
            type: 'Gangdong',
            title: '강동구',
        },
        {
            type: 'Gangbuk',
            title: '강북구',
        },
        {
            type: 'Gangseo',
            title: '강서구',
        },
        {
            type: 'Gwanak',
            title: '관악구',
        },
        {
            type: 'Gwangjin',
            title: '광진구',
        },
        {
            type: 'Guro',
            title: '구로구'
        },
        {
            type: 'Geumcheon',
            title: '금천구',
        },
        {
            type: 'Nowon',
            title: '노원구',
        },
        {
            type: 'Dobong',
            title: '도봉구',
        },
        {
            type: 'Dongdaemun',
            title: '동대문구',
        },
        {
            type: 'Dongjak',
            title: '동작구',
        },
        {
            type: 'Mapo',
            title: '마포구',
        },
        {
            type: 'Seodaemun',
            title: '서대문구',
        },
        {
            type: 'Seocho',
            title: '서초구',
        },
        {
            type: 'Seongdong',
            title: '성동구',
        },
        {
            type: 'Seongbuk',
            title: '성북구',
        },
        {
            type: 'Songpa',
            title: '송파구',
        },
        {
            type: 'Yangcheon',
            title: '양천구',
        },
        {
            type: 'Yeongdeungpo',
            title: '영등포구',
        },
        {
            type: 'Yongsan',
            title: '용산구',
        },
        {
            type: 'Eunpyeong',
            title: '은평구',
        },
        {
            type: 'Jung',
            title: '중구',
        },
        {
            type: 'Jungnang',
            title: '중랑구',
        }
    ];

      const [select, setSelect] = useState('');

      const handleClick = (type) => {
        setSelect(type);
        };

    const idValidation = () => {   // 아이디 중복 확인
          axios
            .post('/signup/verify/id', decodeURIComponent(InputID), {
                responseType: 'text/plain', 
            })
            .then((res) => {
                console.log(res.data);
                console.log(InputID);
                if(res.data === true) {
                    alert("이미 사용중인 아이디입니다.");
                    return true;
                } else {
                    alert("사용 가능한 아이디입니다.");
                    return false;
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
        };
        const nicknameValidation = () => {   // 닉네임 중복 확인
            axios
              .post('/signup/verify/nickname', InputNickName, {
                responseType: 'text/plain',
              })
              .then((res) => {
                  console.log(res.data);
                  if(res.data === true) {
                      alert("이미 사용중인 닉네임입니다.");
                  } else {
                      alert("사용 가능한 닉네임입니다.");
                  }
              })
              .catch((error) => {
                  console.log(error.response);
              });
          };


          const emailValidation = () => {   // 이메일 중복 확인
            axios
              .post('/signup/verify/email', InputEmail, {
                responseType: 'text/plain',
              })
              .then((res) => {
                  console.log(res.data);
                  if(res.data === true) {
                      alert("이미 사용중인 이메일입니다.");
                  } else {
                      alert("사용 가능한 이메일입니다.");
                  }
              })
              .catch((error) => {
                  console.log(error.response);
              });
          };

    const onClickSignUP = async () => {
        console.log("click SignUP");
        const workAreaArray = Array.isArray(InputWorkArea) ? InputWorkArea : [InputWorkArea];
        const workJobArray = Array.isArray(InputWorkJob) ? InputWorkJob : [InputWorkJob];

        const outputWorkArray = workAreaArray[0].split(', ');
        const outputJobArray = workJobArray[0].split(', ');
    
        console.log("_____", outputWorkArray);
        console.log("*****", outputJobArray);

        if(InputPW !== InputPWCHK) {   
            // 비밀번호와 비밀번호 체크가 다를 때
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "비밀번호를 다시 확인해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
            });
        } else if(InputID === '' || InputPW === '' || InputNickName === '' || InputEmail === '' || InputName === ''
             || InputPhoneNumber === '' || InputAddress === '' || InputBirth === '' || InputGender === '' ){  
            // 항목들이 비어있을 때
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "필수 항목을 모두 채워주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
            });
        }

        //모든 항목을 채웠을 경우
        await axios.post('http://localhost:3000/signup', {
            id: InputID,
            pw: InputPW,
            name: InputName,
            email: InputEmail,
            nickname: InputNickName,
            phone: InputPhoneNumber,
            home: InputAddress,
            birth: InputBirth,
            gender: InputGender,
            hopeLocation: outputWorkArray,
            hopeJob: outputJobArray
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response);
            if (response.status === "CREATED 201") {
                console.log(response);
                document.location.href = "/login";  //회원가입 되면 로그인 페이지 이동(새로고침)
            }
        })
        .catch((error) => {
            console.log(error.response);
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "회원가입할 수 없습니다. 다시 시도해주세요.",
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
            if (error.response) {
                console.log("1", error.response.data);
                console.log("2", error.response.status);
                console.log("3", error.response.headers);
              } else if (error.request) {
                console.log("4", error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log("5", error.config);
        });
    };

    
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
                        <input type='text' id="id" name="id" placeholder="아이디" value={InputID}
                             onChange={handleInputID} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={idValidation} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px", 
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>    
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>비밀번호</b></label>
                    <label style={{fontSize: "9px", color: "#7F7F7F", marginTop: "30px", marginLeft: "20px"}}>8~20자, 하나 이상의 대문자, 특수문자 포함</label>
                    <div>
                        <input type='password' id="pw" name='pw' placeholder="비밀번호" value={InputPW}
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
                        <input type='text' id='nickname' name='nickname' placeholder="닉네임" value={InputNickName}
                             onChange={handleInputNickName} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={nicknameValidation} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>이름</b></label>
                    <div>
                        <input type='text' id='name' name='name' placeholder="이름 (실명)" value={InputName}
                             onChange={handleInputName} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>전화번호</b></label>
                    <div>
                        <input type='text' id='phone' name='phone' placeholder=" ex) 010-1234-5678" value={InputPhoneNumber}
                             onChange={handleInputPhoneNumber} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>생년월일</b></label>
                    <label style={{fontSize: "16px", marginTop: "30px", marginLeft: "85px"}}><b>성별</b></label>
                    <label style={{fontSize: "16px", marginTop: "30px", marginLeft: "23px"}}><b>거주지</b></label>
                    <div className="SignUP-form1">
                        <input type='date' id='birth' name='birth' value={InputBirth}
                             onChange={handleInputBirth} style={{width:"130px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />

                        <select className="select-style" id="gender" name="gender" required="true" onChange={handleInputGender}>
                            <option value="true">남</option>
                            <option value="false">여</option>
                        </select>

                        <input type='text' id='home' name='home' placeholder="거주지" value={InputAddress}
                             onChange={handleInputAddress} style={{width:"150px", height: "40px", marginLeft: "10px"
                             , marginTop: "15px", borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />

                        <button type='button' variant="outline-primary" onClick={handleShow} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                            marginTop: "22px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 검색</button>     
                   
                        <Modal dialogClassName="custom-modal-content" show={show} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>지역 선택</Modal.Title>
                            </Modal.Header>
                                <Modal.Body dialogClassName="custom-modal-box">
                                        {items.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleClick(item.type)} 		      // type 받아 set함수에 넣어준다
                                                    className={`custom-modal-box ${select === item.type ? 'select' : ''}`} // 클릭하면 select클래스가 추가
                                                > 
                                                    {item.title}
                                                </div>
                                            ))}
                                        
                                            {items_city.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleClick(item.type)} 		      // type 받아 set함수에 넣어준다
                                                    className={`custom-modal-box ${select === item.type ? 'select' : ''}`} // 클릭하면 select클래스가 추가
                                                > 
                                                    {item.title}
                                                </div>
                                            ))}
                                    

                                </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn_close" variant="secondary" onClick={handleClose}>
                                    닫기
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>이메일</b></label>
                    <div>
                        <input type='text' id='email' name='email' placeholder="이메일" value={InputEmail}
                             onChange={handleInputEmail} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={emailValidation} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>희망 근무 지역</b></label>
                    <div>
                        <input type='text' id='hopeLocation' name='hopeLocation' placeholder="희망 근무 지역" value={InputWorkArea}
                             onChange={handleInputWorkArea} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 검색</button>   

                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>희망 업직종</b></label>
                    <div>
                        <input type='text' id='hopeJob' name='hopeJob' placeholder="희망 업직종" value={InputWorkJob}
                             onChange={handleInputWorkJob} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>직종 검색</button>      
                    </div>


                    <div className="border1">
                        <button type='button' onClick={onClickSignUP} style={{fontSize: "15px", borderColor: "#BF5E49", marginLeft: "164px", marginTop: "8px",
                             color:"#BF5E49", backgroundColor: "#FFFFFF", border:"0px", borderRadius: "15px"}}><b>회원가입</b></button>
                    </div>
                         

                </body>
            </div>
            
        </div>
        
    )
}

export default SignUP;