import React, { useState, useEffect } from "react";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import workstaff from "../assets/img/workicon-staff.png";
import workcoffeebeans from "../assets/img/workicon-coffeebeans.png";
import workcustomer from "../assets/img/workicon-customer.png";
import workdelivery from "../assets/img/workicon-delivery.png";
import workdesign from "../assets/img/workicon-design.png";
import workknife from "../assets/img/workicon-knife.png";
import workeducation from "../assets/img/workicon-education.png";
import workmedia from "../assets/img/workicon-media.png";
import workplatter from "../assets/img/workicon-platter.png";
import worksale from "../assets/img/workicon-sale.png";
import workbackground from "../assets/img/workicon-background.png";
import "../assets/css/SignUP.css";
import axios from "axios";
import Swal from "sweetalert2";
import "moment/locale/ko";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { items, items_city, items_dong } from '../components/CityItem';

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
    const [InputWorkArea, setInputWorkArea] = useState("");   //희망근무지역 입력창
    const [InputWorkJob, setInputWorkJob] = useState("");   //희망업직종 입력창 

    const [usableId, setUsableId] = useState("");  //아이디 중복확인  -> true여야 사용 가능
    const [usableNickname, setUsableNickname] = useState("");  //닉네임 중복확인
    const [usableEmail, setUsableEmail] = useState("");  //이메일 중복확인    (인증하기 X -> 중복확인)

    const [show, setShow] = useState(false);   //모달창

    const [showWorkArea, setShowWorkArea] = useState(false);   //모달창
    const [showWorkJob, setShowWorkJob] = useState(false);   //모달창

    const handleClose = () => {
        setShow(false);   //모달창 닫기
    }
    const handleCloseWorkArea = () => {
        setShowWorkArea(false);   //모달창 닫기
    }
    const handleCloseWorkJob = () => {
        setShowWorkJob(false);   //모달창 닫기
    }

    const handleShow = () =>{ setShow(true)};     //모달창 켜기
    const handleShowWorkArea = () => setShowWorkArea(true);     //모달창 켜기
    const handleShowWorkJob = () => setShowWorkJob(true);     //모달창 켜기

    const [showCityItems, setShowCityItems] = useState(true);  //시/군/구
    const [showDongItems, setShowDongItems] = useState(true);  //동/읍/면

    //거주지
    const [SelectAddress, setSelectAddress] = useState("");  //시/도 선택
    const [citySelectAddress, setCitySelectAddress] = useState("");  //시/군/구 선택
    const [dongSelectAddress, setDongSelectAddress] = useState(""); //동/읍/면 선택

    //희망근무지역
    const [SelectWorkArea, setSelectWorkArea] = useState("");  //시/도 선택
    const [citySelectWorkArea, setCitySelectWorkArea] = useState("");  //시/군/구 선택
    const [dongSelectWorkArea, setDongSelectWorkArea] = useState(""); //동/읍/면 선택
    const [addedWorkAreas, setAddedWorkAreas] = useState([]);

    const [SelectWorkJob, setSelectWorkJob] = useState([]);  //희망업직종 선택 
    const [activeWorkJob, setActiveWorkJob] = useState('');  //색 변경

  const handleInputID = (e) => {
    setInputID(e.target.value);
  };

  const handleInputPW = (e) => {
    setInputPW(e.target.value);
  };

  const handleInputPWCHK = (e) => {
    setInputPWCHK(e.target.value);
  };

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

  const handleInputWorkJob = (e) => {
    setInputWorkJob(e.target.value);
  };


    //거주지
    const handleClick = (itemType) => {
        setCitySelectAddress(null);
        setDongSelectAddress(null);
        setShowCityItems(true);
        setShowDongItems(true);
        setSelectAddress(itemType);
    };

    const CityhandleClick = (cityItem) => {
        setCitySelectAddress(cityItem);
        setShowDongItems(true);           
    }

    const DonghandleClick = (dongItem) => {
        setDongSelectAddress(dongItem);          
    }


    //희망 근무 지역
    const handleClickWorkArea = (itemType) => {
        setSelectWorkArea(itemType);
        setCitySelectWorkArea(null);
        setDongSelectWorkArea(null);
        setShowCityItems(true);
        setShowDongItems(true);
    };

    const CityhandleClickWorkArea = (cityItem) => {
        setCitySelectWorkArea(cityItem);
        setShowDongItems(true);       
    }

    const DonghandleClickWorkArea = (dongItem) => {
        setDongSelectWorkArea(dongItem);         
    }

    const handleSelectAddress = (e) => {   //거주지 적용 버튼 클릭시
        if(SelectAddress && citySelectAddress && dongSelectAddress) {
          setInputAddress(SelectAddress + " " + citySelectAddress + " " + dongSelectAddress);
        } else {
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "거주지가 모두 선택되지 않았습니다. 다시 선택해주세요.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          }).then((res) => {});
        }
        setShow(false);
    }

    const handleAddWorkArea = () => {   //희망근무지역 추가 버튼 클릭시
      if (SelectWorkArea && citySelectWorkArea && dongSelectWorkArea) {
        const addWorkArea = SelectWorkArea + " " + citySelectWorkArea + " " + dongSelectWorkArea;
        if (addedWorkAreas.includes(addWorkArea)) {
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "이미 추가된 지역입니다.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          }).then((res) => {});
        } else {
          setAddedWorkAreas(prevWorkAreas => [...prevWorkAreas, addWorkArea]);
        }
        console.log(addWorkArea);
      } else {
        Swal.fire({
          icon: "warning",
          title: "경고",
          text: "거주지가 모두 선택되지 않았습니다. 다시 선택해주세요.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        }).then((res) => {});
      }
    }

    const removeWorkArea = (workAreaToRemove) => {    //희망근무지역 하나씩 삭제
      setAddedWorkAreas(prevWorkAreas =>
        prevWorkAreas.filter(workArea => workArea !== workAreaToRemove)
      );
    }

    const handleSelectWorkArea = (e) => {   //희망근무지역 완료 버튼 클릭시
      if(SelectWorkArea && citySelectWorkArea && dongSelectWorkArea) {
        setInputWorkArea(addedWorkAreas.join("|"));
        setShowWorkArea(false);
        setAddedWorkAreas([]);
      } 
      else {
        Swal.fire({
          icon: "warning",
          title: "경고",
          text: "희망근무지역이 없습니다. 다시 선택해주세요.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        }).then((res) => {});
      }
    }

    //희망 업직종
    const handleWorkJobClick = (job) => {
      if (SelectWorkJob.includes(job)) {
        setSelectWorkJob((prevSelected) =>
          prevSelected.filter((selectedJob) => selectedJob !== job)
        );
      } else if (SelectWorkJob.length < 3) {
        if (!SelectWorkJob.includes(job)) {
          setActiveWorkJob(job);
          setSelectWorkJob((prevSelected) => [...prevSelected, job]);
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "경고",
          text: "최대 3개까지 가능합니다.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        }).then((res) => {});
      }
    };

    const handleSelectWorkJob = () => {
      const workJobsString = SelectWorkJob.join("|");
      setInputWorkJob(workJobsString);
      setShowWorkJob(false);
      setSelectWorkJob([]); // Reset selected work jobs
    };

    const idValidation = () => {   // 아이디 중복 확인
          axios
            .post('/signup/verify/id', decodeURIComponent(InputID), {
                responseType: 'text/plain', 
            })
            .then((res) => {
                console.log(res.data);
                setUsableId(res.data);
                console.log("1111 " + usableId);
                if(res.data === "true") {
                    alert("이미 사용중인 아이디입니다.");
                    setUsableId(res.data);
                    console.log("Dsfdfsd :" + usableId);
                } else {
                    alert("사용 가능한 아이디입니다.");
                    setUsableId(res.data);
                    console.log("Dsfdfsd123 :" + usableId);
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
                  if(res.data === "true") {
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
              .post('/signup/verify/email', {
                email: InputEmail 
              })
              .then((res) => {
                  console.log(res.data);
                  if(res.data === "true") {
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

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-]).{8,20}$/;

        if (InputPW !== InputPWCHK) {
          // 비밀번호와 비밀번호 체크가 다를 때
          Swal.fire({
            icon: "error",
            title: "경고",
            text: "비밀번호를 다시 확인해주세요.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          }).then((res) => {});
        } else if (
          InputID === "" ||
          InputPW === "" ||
          InputNickName === "" ||
          InputEmail === "" ||
          InputName === "" ||
          InputPhoneNumber === "" ||
          InputAddress === "" ||
          InputBirth === "" ||
          InputGender === ""
        ) {
          // 항목들이 비어있을 때
          Swal.fire({
            icon: "error",
            title: "경고",
            text: "필수 항목을 모두 채워주세요.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          }).then((res) => {});
        } else if (!passwordPattern.test(InputPW)) {
          Swal.fire({
            icon: "error",
            title: "경고",
            text: "비밀번호는 8~20자 이면서 하나 이상의 대문자와 특수문자를 포함해야 합니다.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          }).then((res) => {});
        } else {
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
              hopeLocation: InputWorkArea,
              hopeJob: InputWorkJob
          },
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          .then(response => {
              console.log(response);
              Swal.fire({
                icon: "success",
                title: "성공",
                text: "회원가입이 완료되었습니다. 로그인 후 이용해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
              document.location.href = "/login";  //회원가입 되면 로그인 페이지 이동(새로고침)
            });
              
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
              }).then((res) => {});
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
        }
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
                        <button type='button' onClick={idValidation} disabled={InputID.length !==0 ? false:true } style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px", 
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>    
                    </div>

          <label style={{ fontSize: "16px", marginTop: "30px" }}>
            <b>비밀번호</b>
          </label>
          <label
            style={{
              fontSize: "9px",
              color: "#7F7F7F",
              marginTop: "30px",
              marginLeft: "20px",
            }}
          >
            8~20자, 하나 이상의 대문자, 특수문자 포함
          </label>
          <div>
            <input
              type="password"
              id="pw"
              name="pw"
              placeholder="비밀번호"
              value={InputPW}
              onChange={handleInputPW}
              style={{
                width: "440px",
                height: "40px",
                marginTop: "15px",
                borderColor: "#E7E6E6",
                fontSize: "15px",
                borderRadius: "10px",
                padding: ".5em",
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="input_pw_check"
              placeholder="비밀번호 확인"
              value={InputPWCHK}
              onChange={handleInputPWCHK}
              style={{
                width: "440px",
                height: "40px",
                marginTop: "15px",
                borderColor: "#E7E6E6",
                fontSize: "15px",
                borderRadius: "10px",
                padding: ".5em",
              }}
            />
          </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>닉네임</b></label>
                    <div>
                        <input type='text' id='nickname' name='nickname' placeholder="닉네임" value={InputNickName}
                             onChange={handleInputNickName} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={nicknameValidation} disabled={InputNickName.length !==0 ? false:true } style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>

          <label style={{ fontSize: "16px", marginTop: "30px" }}>
            <b>이름</b>
          </label>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름 (실명)"
              value={InputName}
              onChange={handleInputName}
              style={{
                width: "440px",
                height: "40px",
                marginTop: "15px",
                borderColor: "#E7E6E6",
                fontSize: "15px",
                borderRadius: "10px",
                padding: ".5em",
              }}
            />
          </div>

          <label style={{ fontSize: "16px", marginTop: "30px" }}>
            <b>전화번호</b>
          </label>
          <div>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder=" ex) 010-1234-5678"
              value={InputPhoneNumber}
              onChange={handleInputPhoneNumber}
              style={{
                width: "440px",
                height: "40px",
                marginTop: "15px",
                borderColor: "#E7E6E6",
                fontSize: "15px",
                borderRadius: "10px",
                padding: ".5em",
              }}
            />
          </div>

          <label style={{ fontSize: "16px", marginTop: "30px" }}>
            <b>생년월일</b>
          </label>
          <label
            style={{ fontSize: "16px", marginTop: "30px", marginLeft: "85px" }}
          >
            <b>성별</b>
          </label>
          <label
            style={{ fontSize: "16px", marginTop: "30px", marginLeft: "23px" }}
          >
            <b>거주지</b>
          </label>
          <div className="SignUP-form1">
            <input
              type="date"
              id="birth"
              name="birth"
              value={InputBirth}
              onChange={handleInputBirth}
              style={{
                width: "130px",
                height: "40px",
                marginTop: "15px",
                borderColor: "#E7E6E6",
                fontSize: "15px",
                borderRadius: "10px",
                padding: ".5em",
              }}
            />

                        
                        <select className="select-style" name="gender" id="gender" required="true" onChange={handleInputGender}>
                            <option value="true">남</option>
                            <option value="false">여</option>
                        </select>

                        <input type='text' id='home' name='home' placeholder="거주지" value={InputAddress} disabled
                             onChange={handleInputAddress} style={{width:"150px", height: "40px", marginLeft: "10px"
                             , marginTop: "15px", borderColor: "#E7E6E6", backgroundColor: "#D3D3D364", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />

                        <button type='button' variant="outline-primary" onClick={handleShow} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                            marginTop: "22px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 선택</button>     
                   
                   <Modal dialogClassName="custom-modal-content" show={show} onHide={handleClose}>
                                <Modal.Header>
                                    <Modal.Title>거주지 선택</Modal.Title>
                                </Modal.Header>
                                <div className="custom-modal-box-whole">
                                    <Modal.Body dialogClassName="custom-modal-box">

                                        {/* 시/도 */}
                                        <div className="items-container scrollable-container">
                                          {items.map((item, index) => (
                                              <div
                                                  key={index}
                                                  onClick={() => handleClick(item.type)}
                                                  className={`custom-modal-box ${SelectAddress === item.type ? 'select' : ''}`}
                                              >
                                                  {item.title}
                                              </div>
                                          ))}
                                        </div>
                                    </Modal.Body>

                                        {/* 시/군/구 */}
                                    {showCityItems && (
                                        <div className="city-items-container scrollable-container">
                                            {items_city
                                                .filter((cityItem) => cityItem.type === SelectAddress)
                                                .map((cityItem, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => CityhandleClick(cityItem.title)}
                                                        className={`custom-modal-box ${citySelectAddress === cityItem.title ? 'select' : ''}`}
                                                    >
                                                        {cityItem.title}
                                        
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                        

                                    {/* 동/읍/면 */}
                                    {showDongItems && (
                                            <div className="dong-items-container scrollable-container">
                                                {items_dong
                                                    .filter((dongItem) => dongItem.type === citySelectAddress)
                                                    .map((dongItem, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => DonghandleClick(dongItem.title)}
                                                            className={`custom-modal-box ${dongSelectAddress === dongItem.title ? 'select' : ''}`}
                                                        >
                                                            {dongItem.title}
                                                        </div>
                                                    ))}
                                            </div>
                                        )}

                                </div>
                                <Modal.Footer>
                                    <Button className="footerButton-style" varient="primary" onClick={handleSelectAddress}>
                                        선택
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                    </div>

                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>이메일</b></label>
                    <div>
                        <input type='text' id='email' name='email' placeholder="이메일" value={InputEmail}
                             onChange={handleInputEmail} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={emailValidation} disabled={InputEmail.length !==0 ? false:true } style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>희망 근무 지역</b></label>
                    <div>
                        <input type='text' id='hopeLocation' name='hopeLocation' placeholder="희망 근무 지역" value={InputWorkArea} disabled
                             onChange={handleInputWorkArea} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", backgroundColor: "#D3D3D364", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={handleShowWorkArea} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 검색</button> 
                        
                        <Modal dialogClassName="custom-modal-content" show={showWorkArea} onHide={handleCloseWorkArea}>
                            <Modal.Header>
                                <Modal.Title>
                                  <h5>희망 근무 지역 선택</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <div className="custom-modal-box-whole">
                                <Modal.Body dialogClassName="custom-modal-box">

                                    {/* 시/도 */}
                                    <div className="items-container scrollable-container">
                                      {items.map((item, index) => (
                                          <div
                                              key={index}
                                              onClick={() => handleClickWorkArea(item.type)}
                                              className={`custom-modal-box ${SelectWorkArea === item.type ? 'select' : ''}`}
                                          >
                                              {item.title}
                                          </div>
                                      ))}
                                    </div>
                                </Modal.Body>

                                    {/* 시/군/구 */}
                                {showCityItems && (
                                    <div className="city-items-container scrollable-container">
                                        {items_city
                                            .filter((cityItem) => cityItem.type === SelectWorkArea)
                                            .map((cityItem, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => CityhandleClickWorkArea(cityItem.title)}
                                                    className={`custom-modal-box ${citySelectWorkArea === cityItem.title ? 'select' : ''}`}
                                                >
                                                    {cityItem.title}
                                                </div>
                                            ))}
                                    </div>
                                )}
                                    

                                {/* 동/읍/면 */}
                                {showDongItems && (
                                        <div className="dong-items-container scrollable-container">
                                            {items_dong
                                                .filter((dongItem) => dongItem.type === citySelectWorkArea)
                                                .map((dongItem, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => DonghandleClickWorkArea(dongItem.title)}
                                                        className={`custom-modal-box ${dongSelectWorkArea === dongItem.title ? 'select' : ''}`}
                                                    >
                                                        {dongItem.title}
                                                    </div>
                                                ))}
                                        </div>
                                    )}


                                    

                            </div>
                            <Modal.Footer>
                              {/* 희망 근무 지역 여러개 선택 */}
                              <div className="addedWorkArea-style">
                                {addedWorkAreas.length > 0 && (     
                                      <div className="added-work-areas left-align-footer">
                                          {addedWorkAreas.map((workArea, index) => (
                                              <div key={index}>
                                                {workArea}
                                                <button className="close" onClick={() => removeWorkArea(workArea)}>   
                                                    x
                                                </button>
                                              </div>
                                          ))}
                                      </div>
                                  )}
                              </div>
                                <Button varient="secondary" onClick={handleAddWorkArea}>
                                    추가
                                </Button>
                                <Button varient="primary" onClick={handleSelectWorkArea}>
                                    완료
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        
                    </div>




                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>희망 업직종</b></label>
                    <div>
                        <input type='text' id='hopeJob' name='hopeJob' placeholder="희망 업직종" value={InputWorkJob} disabled
                             onChange={handleInputWorkJob} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", backgroundColor: "#D3D3D364", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={handleShowWorkJob} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>직종 선택</button>

                        <Modal dialogClassName="job-box" show={showWorkJob} onHide={handleCloseWorkJob}>
                            <Modal.Header>
                                <Modal.Title>
                                  <h5>희망 업직종 선택 (최대 3개)</h5>
                                </Modal.Title>
                            </Modal.Header>
                            <div>
                                <Modal.Body dialogClassName="custom-job-box">
                                  <div className="work-icon">
                                    <div className={`icon-style ${activeWorkJob === '카페' || SelectWorkJob.includes('카페') ? 'active' : ''}`} style={{position: "relative", left: "60px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('카페')}>
                                          <img src={workbackground} width="130" alt="cafeImage1"/>
                                            <span style={{position: "absolute", top: "32px", left:"40px"}}>
                                              <img src={workcoffeebeans} id="카페" width="65" alt="cafeImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "210px", left:"125px"}}>
                                          <b>카페</b>
                                      </span>
                                    
                                    <span>
                                      <div className={`icon-style ${activeWorkJob === '서빙' || SelectWorkJob.includes('서빙') ? 'active' : ''}`} style={{position: "relative", left:"140px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('서빙')}>
                                          <img src={workbackground} width="130" alt="platterImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={workplatter} id="서빙" width="65" alt="platterImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "210px", left:"350px"}}>
                                          <b>서빙</b>
                                      </span>
                                    </span>

                                    <span>
                                      <div className={`icon-style ${activeWorkJob === '판매' || SelectWorkJob.includes('판매') ? 'active' : ''}`} style={{position: "relative", left:"220px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('판매')}>
                                          <img src={workbackground} width="130" alt="saleImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={worksale} id="판매" width="65" alt="saleImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "210px", left:"575px"}}>
                                          <b>판매</b>
                                      </span>
                                    </span>

                                    <span>
                                      <div className={`icon-style ${activeWorkJob === '주방 보조' || SelectWorkJob.includes('주방 보조') ? 'active' : ''}`} style={{position: "relative", left:"300px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('주방 보조')}>
                                          <img src={workbackground} width="130" alt="knifeImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={workknife} id="주방 보조" width="65" alt="knifeImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "210px", left:"777px"}}>
                                          <b>주방 보조</b>
                                      </span>
                                    </span>

                                    <div>
                                      <div className={`icon-style ${activeWorkJob === '배달' || SelectWorkJob.includes('배달') ? 'active' : ''}`} style={{position: "relative", left:"380px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('배달')}>
                                          <img src={workbackground} width="130" alt="deliveryImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={workdelivery} id="배달" width="65" alt="deliveryImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "210px", left:"1020px"}}>
                                          <b>배달</b>
                                      </span>
                                    </div>
                                  </div>

                                  <div className="work-icon">
                                    <div className={`icon-style ${activeWorkJob === '교육' || SelectWorkJob.includes('교육') ? 'active' : ''}`} style={{position: "relative", left: "60px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('교육')}>
                                            <img src={workbackground} width="130" alt="educationImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workeducation} id="교육" width="65" alt="educationImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "460px", left:"130px"}}>
                                            <b>교육</b>
                                        </span>

                                        <div className={`icon-style ${activeWorkJob === '스태프' || SelectWorkJob.includes('스태프') ? 'active' : ''}`} style={{position: "relative", left: "140px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('스태프')}>
                                            <img src={workbackground} width="130" alt="staffImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workstaff} id="스태프"width="65" alt="staffImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "460px", left:"340px"}}>
                                            <b>스태프</b>
                                        </span>

                                        <div className={`icon-style ${activeWorkJob === '생산' || SelectWorkJob.includes('생산') ? 'active' : ''}`} style={{position: "relative", left: "220px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('생산')}>
                                            <img src={workbackground} width="130" alt="designImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workdesign} id="생산" width="65" alt="designImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "460px", left:"570px"}}>
                                            <b>생산</b>
                                        </span>

                                        <div className={`icon-style ${activeWorkJob === '미디어' || SelectWorkJob.includes('미디어') ? 'active' : ''}`} style={{position: "relative", left: "300px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('미디어')}>
                                            <img src={workbackground} width="130" alt="mediaImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workmedia} id="미디어" width="65" alt="mediaImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "460px", left:"790px"}}>
                                            <b>미디어</b>
                                        </span>

                                        <div className={`icon-style ${activeWorkJob === '고객 상담' || SelectWorkJob.includes('고객 상담') ? 'active' : ''}`} style={{position: "relative", left: "380px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('고객 상담')}>
                                            <img src={workbackground} width="130" alt="customerImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workcustomer} id="고객 상담" width="65" alt="customerImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "460px", left:"1000px"}}>
                                            <b>고객 상담</b>
                                        </span>

                                        
                                    </div>

                                    <div className="margin"/>
                                </Modal.Body>
                            </div>
                            <Modal.Footer>
                                <Button varient="primary" onClick={handleSelectWorkJob}>
                                    선택 완료
                                </Button>
                            </Modal.Footer>
                        </Modal>

                         
                    </div>
            


          <div className="border1">
            <button
              type="button"
              onClick={onClickSignUP}
              style={{
                fontSize: "15px",
                borderColor: "#BF5E49",
                marginLeft: "164px",
                marginTop: "8px",
                color: "#BF5E49",
                backgroundColor: "#FFFFFF",
                border: "0px",
                borderRadius: "15px",
              }}
            >
              <b>회원가입</b>
            </button>
          </div>
        </body>
      </div>
    </div>
  );
}
                                            
export default SignUP;