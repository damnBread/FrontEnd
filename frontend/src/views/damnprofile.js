import React, { useEffect, useState } from "react";
import axios from "axios";
import man from "../assets/img/damnRank-man-icon.png";
import woman from "../assets/img/damnRank-woman-icon.png";
import Header from "../components/Headers/Header";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "../assets/css/damnprofile.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { items, items_city, items_dong } from '../components/CityItem';
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
import {View, Switch, StyleSheet} from 'react-native';

const Damnprofile = () => {
    
    const sessionToken = sessionStorage.getItem('token');

    const history = useHistory();

    //고정
    const [myCareer, setMyCareer] = useState("");                 //땜빵 경력

    const [myPublic, setMyPublic] = useState("");

    //내 정보
    const [myNoShow, setMyNoShow] = useState("");                 //노쇼 횟수
    const [myId, setMyId] = useState("");                         //사용자 아이디
    const [myName, setMyName] = useState("");                     //사용자 이름
    const [myGender, setMyGender] = useState("");                 //사용자 성별
    const [myNickname, setMyNickname] = useState("");             //닉네임 
    const [myPassword, setMyPassword] = useState("");             //비밀번호 수정
    const [myEmail, setMyEmail] = useState("");                   //이메일
    const [myPhoneNumber, setMyPhoneNumber] = useState("");       //전화번호
    const [myLocation, setMyLocation] = useState("");             //현재 거주 지역
    const [myHopeLocation, setMyHopeLocation] = useState("");     //희망 근무 지역
    const [myHopeJob, setMyHopeJob] = useState("");               //희망 업직종


    //내 활동
    const [myScrab, setMyScrab] = useState("");                   //스크랩
    const [myDamnHistory, setMyDamnHistory] = useState("");       //땜빵 이력
    const [myBadge, setMyBadge] = useState("");                   //뱃지
    const [myIntroduce, setMyIntroduce] = useState("");           //내 소개글

  
    const [showInfo, setShowInfo] = useState(true);  //내 정보
    const [showActivity, setShowActivity] = useState(false);  //내 활동
    const [showDamnApply, setShowDamnApply] = useState(false);  //내가 지원한 땜빵
    const [showDamnRequest, setShowDamnRequest] = useState(false);  //내가 의뢰한 땜빵

    const [isNoShowActive, setNoShowIsActive] = useState(false);
    const [isNicknameActive, setNicknameIsActive] = useState(false);
    const [isEmailActive, setEmailIsActive] = useState(false);
    const [isPhoneActive, setPhoneIsActive] = useState(false);
    const [isLocationActive, setLocationIsActive] = useState(false);
    const [isHopeJobActive, setHopeJobIsActive] = useState(false);
    const [isHopeLocationActive, setHopeLocationIsActive] = useState(false);

    const [isIntroduceActive, setIntroduceIsActive] = useState(false);
    const [isBadgeActive, setBadgeIsActive] = useState(false);

    const [show, setShow] = useState(false);   //모달창

    const [showWorkArea, setShowWorkArea] = useState(false);   //모달창
    const [showWorkJob, setShowWorkJob] = useState(false);   //모달창

    const noShowToggleSwitch = () => {
      setNoShowIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const nicknameToggleSwitch = () =>  {
      setNicknameIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const emailToggleSwitch = () => {
      setEmailIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const phoneToggleSwitch = () =>  {
      setPhoneIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const locationToggleSwitch = () => {
      setLocationIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const hopeJobToggleSwitch = () => {
      setHopeJobIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const hopeLocationToggleSwitch = () => {
      setHopeLocationIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const introduceToggleSwitch = () => {
      setIntroduceIsActive(previousState => !previousState);
      toggleButtonValue()
    }
    const badgeToggleSwitch = () => {
      setBadgeIsActive(previousState => !previousState);
      toggleButtonValue()
    }

    const toggleButtonValue = () => {
      const toggleIsPublic = isNoShowActive + "|" + isNicknameActive + "|" + isEmailActive + "|" + isPhoneActive + "|" + 
        isLocationActive + "|" + isHopeLocationActive + "|" + isHopeJobActive + "|" + isBadgeActive + "|" + isIntroduceActive;

        //공개여부 patch
        axios
            .patch(`http://localhost:3000/mypage/setting`, {
              isPublic: toggleIsPublic
            },
              { headers: {
                Authorization: "Bearer " + sessionToken
              }
            })
            .then((response) => {
                console.log(response);
                console.log("공개 여부 patch 완료")
                console.log("Toggle: ", toggleIsPublic)
                setMyPublic(toggleIsPublic);
            })
            .catch((error)=>{
              console.log("session: ", sessionToken)
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
            })
    }

    const handleClose = () => {
        setShow(false);           //모달창 닫기
    }
    const handleCloseWorkArea = () => {
        setShowWorkArea(false);   //모달창 닫기
    }
    const handleCloseWorkJob = () => {
        setShowWorkJob(false);    //모달창 닫기
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


    //희망업직종
    const [SelectWorkJob, setSelectWorkJob] = useState([]);  //희망업직종 선택 
    const [activeWorkJob, setActiveWorkJob] = useState('');  //색 변경

    const shouldApplyActiveStyle = (clickedElement) => {
      return clickedElement === true;
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

useEffect(() => {
  firstPage();
  toggleButtonValue();

}, [isNoShowActive, isNicknameActive, isEmailActive, isPhoneActive, isLocationActive, 
  isHopeLocationActive, isHopeJobActive, isBadgeActive, isIntroduceActive]);


  const handleSelectAddress = (e) => {   //거주지 적용 버튼 클릭시
    if(SelectAddress && citySelectAddress && dongSelectAddress) {
      let allAddress = SelectAddress + " " + citySelectAddress + " " + dongSelectAddress;
      setMyLocation(allAddress);

      //거주지 patch
      axios
            .patch(`http://localhost:3000/mypage/setting`, {
              home: allAddress
            },
            {headers: {
              Authorization: "Bearer " + sessionToken
            }})
            .then((response) => {
                console.log(response);
                console.log("거주지 patch 완료")
              
            })
            .catch((error)=>{
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
            })

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
              text: "희망근무지역이 모두 선택되지 않았습니다. 다시 선택해주세요.",
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
            setMyHopeLocation(addedWorkAreas.join("|"));
            setShowWorkArea(false);
            setAddedWorkAreas([]);
            
            //희망근무지역 patch
            axios
            .patch(`http://localhost:3000/mypage/setting`, {
              hopeLocation: addedWorkAreas.join("|"),
            },
            {headers: {
              Authorization: "Bearer " + sessionToken
            }})
            .then((response) => {
                console.log(response);
                console.log("희망근무지역 patch 완료")
            })
            .catch((error)=>{
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
            })
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
      setMyHopeJob(workJobsString);

      //희망업직종 patch
      axios
            .patch(`http://localhost:3000/mypage/setting`, {
              hopeJob: workJobsString
            },
            {headers: {
              Authorization: "Bearer " + sessionToken
            }})
            .then((response) => {
                console.log(response);
                console.log("희망업직종 patch 완료")
            })
            .catch((error)=>{
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
            })

      setShowWorkJob(false);
      setSelectWorkJob([]); // Reset selected work jobs
    };    

    const firstPage = () => {
      axios
            .get(`http://localhost:3000/mypage/setting`, {
              headers: {
                Authorization: "Bearer " + sessionToken
              }
            })
            .then((response) => {
                console.log("eww: ", response.data);

                setMyNoShow(response.data.noShow);
                setMyId(response.data.id);
                setMyName(response.data.name); 
                setMyGender(response.data.gender);
                setMyNickname(response.data.nickname);
                setMyPassword(response.data.pw);
                setMyEmail(response.data.email);
                setMyPhoneNumber(response.data.phone);
                setMyLocation(response.data.home);
                setMyHopeJob(response.data.hopeJob);
                setMyHopeLocation(response.data.hopeLocation);
                setMyPublic(response.data.isPublic);

                setMyIntroduce(response.data.introduce);
                setMyBadge(response.data.badge);
                
                //땜빵이력, 스크랩 아직 ... 모르겟엉

                console.log("마이페이지 첫 페이지 완료");

                const isPublicData = response.data.isPublic.split("|");
                if (isPublicData[0] === "true") {
                  setNoShowIsActive(true);
                  console.log("SS: ", isNoShowActive)
                } if (isPublicData[1] === "true") {
                  setNicknameIsActive(true);
                } if (isPublicData[2] === "true") {
                  setEmailIsActive(true);
                } if (isPublicData[3] === "true") {
                  setPhoneIsActive(true);
                } if (isPublicData[4] === "true") {
                  setLocationIsActive(true);
                } if (isPublicData[5] === "true") {
                  setHopeLocationIsActive(true);
                } if (isPublicData[6] === "true") {
                  setHopeJobIsActive(true);
                } if (isPublicData[7] === "true") {
                  setBadgeIsActive(true);
                } if (isPublicData[8] === "true") {
                  setIntroduceIsActive(true);
                }
                
            })
            .catch((error)=>{
              if (error.response.status === 400) {
                Swal.fire({
                  icon: "warning",
                  title: "경고",
                  text: "로그인 또는 회원가입이 필요한 서비스입니다. 로그인 또는 회원가입을 해주세요.",
                  showCancelButton: true,
                  confirmButtonText: "확인",
                  cancelButtonText: "취소",
                  width: 800,
                  height: 100,
              }).then((res) => {
                  if (res.isConfirmed) {
                       //삭제 요청 처리
                      history.push('/Login'); // SignUP으로 url 이동
                      window.scrollTo(0, 0);   //새 페이지로 이동한 후 화면이 맨 위로 스크롤
                  }
              });
              }
            })
          }          

        function getGenderImage(genderValue) {
          switch (genderValue) {
            case false:
              return woman;
            case true:
              return man;
            default:
    
          }
        }

        function replaceWorkJob(workJob) {
          const replaceWorkJob = workJob.replaceAll("|", ", ");
          return replaceWorkJob;
        }    

        const handleClickMyInfo = () => {
          setShowInfo(true); 
          setShowActivity(false); 
          setShowDamnApply(false);   
          setShowDamnRequest(false);  
        }

        const handleClickMyActivity = () => {
          setShowInfo(false); 
          setShowActivity(true); 
          setShowDamnApply(false);   
          setShowDamnRequest(false);    
        }

        const handleClickDamnApply = () => {
          setShowInfo(false); 
          setShowActivity(false); 
          setShowDamnApply(true);   
          setShowDamnRequest(false);
        }

        const handleClickDamnRequest = () => {
          setShowInfo(false); 
          setShowActivity(false); 
          setShowDamnApply(false);   
          setShowDamnRequest(true); 
        }
        
    return (
      <div className="damnprofilewhole">
        <Header />
        <div className="damnprofile">
            <div className="whole-box">

                <div>
                    <div>
                      <span>
                          <img src={getGenderImage(myGender)} className="gender-image-profile" id="성별" width="100" alt="gender"/>
                            
                            {/* 고정 */}
                            <span className="name-style-profile">
                              {myName}
                                <span className="label-style-profile" style={{fontSize: "20px"}}>
                                  <label className="label-style-profile" style={{zIndex: 1, marginLeft: "1px", marginTop: "5px"}}>땜빵 경력</label>     
                                  <label className="label-style-profile1" style={{zIndex: 1, marginLeft: "5px", marginTop: "5px"}}><b>{myCareer} </b></label>회    
                                </span>
                            </span>


                            {/* 버튼 */}
                            <div className="button-and-box-style">
                              <span>
                                <div>
                                  <button type='button' onClick={handleClickMyInfo} className={showInfo ? "button-style-profile clicked" : "button-style-profile"}>내 정보</button>
                                </div>
                                <div>
                                  <button type='button' onClick={handleClickMyActivity} className={showActivity ? "button-style-profile1 clicked" : "button-style-profile1"}>내 활동</button>
                                </div>
                                <div>
                                  <button type='button' onClick={handleClickDamnApply} className={showDamnApply ? "button-style-profile1 clicked" : "button-style-profile1"}>내가 지원한 땜빵</button>
                                </div>
                                <div>
                                  <button type='button' onClick={handleClickDamnRequest} className={showDamnRequest ? "button-style-profile1 clicked" : "button-style-profile1"}>내가 의뢰한 땜빵</button>
                                </div>
                          
                              </span>
                              <span className="content-box">  

                              {/* 내 정보 */}
                                {showInfo && (
                                  <div>
                                    <label className="content-label-style-profile-s" style={{zIndex: 1, marginLeft: "985px", marginTop: "30px", fontSize: "15px"}}>공개 유무</label>
                                  

                                  {/* 노쇼 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1}}>노쇼 횟수</label>     
                                      <b>{myNoShow}</b> / 5
                                      <span className="blank" style={{color: "#848484"}}>* 노쇼 횟수 5회 이상시, 자동으로 탈퇴처리가 되며, 땜빵 이용이 불가능합니다.</span>
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isNoShowActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={noShowToggleSwitch}
                                          value={isNoShowActive}
                                          style={{marginTop: "-20px", marginLeft: "1000px"}}
                                        />
                                      </span>
                                    </div>

                                  {/* 닉네임 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>닉네임</label>     
                                      <input type='text' name='nick' placeholder={myNickname} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "15px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isNicknameActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={nicknameToggleSwitch}
                                          value={isNicknameActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>
                                    </div>

                                  {/* 이메일 */}
                                    <div>
                                        <label className="content-label-style-profile1" style={{zIndex: 1}}>이메일</label>     
                                        <input type='text' name='email' placeholder={myEmail} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "15px", fontSize: "18px", 
                                          borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                        <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isEmailActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={emailToggleSwitch}
                                          value={isEmailActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>
                                      </div>

                                    {/* 전화번호 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>전화번호</label>     
                                      <input type='text' name='phone' placeholder={myPhoneNumber} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "-5px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isPhoneActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={phoneToggleSwitch}
                                          value={isPhoneActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>
                                    </div>

                                    {/* 거주지 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>거주지</label>  
                                      <button type='button' className="select-button-style" onClick={handleShow}>변경하기</button>   
                                      <label style={{marginTop: "10px", marginLeft: "40px", fontSize: "16px", color: "#888888"}}>{myLocation}</label>
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isLocationActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={locationToggleSwitch}
                                          value={isLocationActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>

                                      <Modal dialogClassName="custom-modal-content" show={show} onHide={handleClose}>
                                        <Modal.Header>
                                            <Modal.Title>거주지 변경</Modal.Title>
                                        </Modal.Header>
                                        <div className="custom-modal-box-whole">
                                            <Modal.Body>

                                                {/* 시/도 */}
                                                <div className="scrollable-container">
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
                                                선택 완료
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </div>

                                    {/* 희망근무지역 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>희망근무지역</label>  
                                      <button type='button' className="select-button-style" style={{marginLeft: "-36px"}} onClick={handleShowWorkArea}>변경하기</button>   
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isHopeLocationActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={hopeLocationToggleSwitch}
                                          value={isHopeLocationActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>

                                      <div>
                                      <label style={{marginTop: "20px", marginLeft: "240px", fontSize: "16px", color: "#888888", marginRight: "130px"}}>{replaceWorkJob(myHopeLocation)}</label>
                                      </div>

                                      <Modal dialogClassName="custom-modal-content" show={showWorkArea} onHide={handleCloseWorkArea}>
                                        <Modal.Header>
                                            <Modal.Title>
                                              <h5>희망 근무 지역 변경</h5>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <div className="custom-modal-box-whole">
                                            <Modal.Body dialogClassName="custom-modal-box">

                                                {/* 시/도 */}
                                                <div className="scrollable-container">
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
                                          <div>
                                            {addedWorkAreas.length > 0 && (     
                                                  <div className="left-align-footer">
                                                      {addedWorkAreas.map((workArea, index) => (
                                                          <div key={index}
                                                          className={`addedWorkArea-style-rank  ${shouldApplyActiveStyle(workArea) ? 'active' : ''}`}>
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

                                    {/* 희망 업직종 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1, marginTop: "30px"}}>희망 업직종</label>  
                                      <button type='button' className="select-button-style" style={{marginLeft: "-23px"}} onClick={handleShowWorkJob}>변경하기</button>   
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isHopeJobActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={hopeJobToggleSwitch}
                                          value={isHopeJobActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>

                                      <div>
                                      <label style={{marginTop: "20px", marginLeft: "240px", fontSize: "16px", color: "#888888"}}>{replaceWorkJob(myHopeJob)}</label>
                                      </div>

                                      <Modal dialogClassName="job-box" show={showWorkJob} onHide={handleCloseWorkJob}>
                                          <Modal.Header>
                                              <Modal.Title>
                                                <h5>희망 업직종 선택 (최대 3개)</h5>
                                              </Modal.Title>
                                          </Modal.Header>
                                          <div>
                                              <Modal.Body dialogClassName="custom-job-box">
                                                <div className="work-icon">
                                                  <div className={`icon-style ${SelectWorkJob.includes('카페') ? 'active' : ''}`} style={{position: "relative", left: "60px", top: "50px"}}>
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
                                                    <div className={`icon-style ${SelectWorkJob.includes('서빙') ? 'active' : ''}`} style={{position: "relative", left:"140px", top: "50px"}}>
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
                                                    <div className={`icon-style ${SelectWorkJob.includes('판매') ? 'active' : ''}`} style={{position: "relative", left:"220px", top: "50px"}}>
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
                                                    <div className={`icon-style ${SelectWorkJob.includes('주방 보조') ? 'active' : ''}`} style={{position: "relative", left:"300px", top: "50px"}}>
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
                                                    <div className={`icon-style ${SelectWorkJob.includes('배달') ? 'active' : ''}`} style={{position: "relative", left:"380px", top: "50px"}}>
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
                                                  <div className={`icon-style ${SelectWorkJob.includes('교육') ? 'active' : ''}`} style={{position: "relative", left: "60px", top: "170px"}}>
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

                                                      <div className={`icon-style ${SelectWorkJob.includes('스태프') ? 'active' : ''}`} style={{position: "relative", left: "140px", top: "170px"}}>
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

                                                      <div className={`icon-style ${SelectWorkJob.includes('생산') ? 'active' : ''}`} style={{position: "relative", left: "220px", top: "170px"}}>
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

                                                      <div className={`icon-style ${SelectWorkJob.includes('미디어') ? 'active' : ''}`} style={{position: "relative", left: "300px", top: "170px"}}>
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

                                                      <div className={`icon-style ${SelectWorkJob.includes('고객 상담') ? 'active' : ''}`} style={{position: "relative", left: "380px", top: "170px"}}>
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






                                  </div>
                                )}

                                {/* 내 활동 */}
                                {showActivity && (
                                  <div>
                                    <label className="content-label-style-profile-s" style={{zIndex: 1, marginLeft: "985px", marginTop: "30px", fontSize: "15px"}}>공개 유무</label>
                                  
                                    {/* 내 뱃지 */}
                                    <div>
                                      <div>
                                          <label className="content-label-style-profile" style={{zIndex: 1}}>내 뱃지</label>
                                          <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isBadgeActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={badgeToggleSwitch}
                                          value={isBadgeActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>
                                      </div>
                                      <button type='button' className="badge1-button-style" disabled style={{marginTop: "30px", border: "4px solid #bfd1fce2", backgroundColor: "#bfd1fce2"}}>슈퍼 칼답러</button>

                                      <button type='button' className="badge1-button-style" disabled style={{border: "4px solid #f9cdccdb", backgroundColor: "#f9cdccdb"}}>슈퍼 성실러</button>

                                      <button type='button' className="badge1-button-style" disabled style={{border: "4px solid #fdffa5ef", backgroundColor: "#fdffa5ef"}}>슈퍼 친절러</button>

                                      <button type='button' className="badge1-button-style" disabled style={{border: "4px solid #caf5c3e2", backgroundColor: "#caf5c3e2"}}>슈퍼 일잘러</button>

                                      <button type='button' className="badge1-button-style" disabled style={{border: "4px solid #e3bcfea9", backgroundColor: "#e3bcfea9"}}>슈퍼 단정러</button>

                                      <button type='button' className="badge1-button-style" disabled style={{border: "4px solid #ffc67166", backgroundColor: "#ffc67166"}}>슈퍼 대처러</button>

                                      <button type='button' className="badge1-button-style" disabled style={{border: "4px solid #8ae0e39d", backgroundColor: "#8ae0e39d"}}>슈퍼 꼼꼼러</button>

                                      <button type='button' className="badge1-button-style" disabled style={{border: "4px solid #ffa5e49f", backgroundColor: "#ffa5e49f"}}>슈퍼 긍정러</button>
                                      
                                    </div>

                                    {/* 내 소개글 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "80px"}}>내 소개글</label>
                                      <input type='text' name='introduce' placeholder={myIntroduce} style={{width:"600px", height: "40px", marginTop: "10px", marginLeft: "-8px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isIntroduceActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={introduceToggleSwitch}
                                          value={isIntroduceActive}
                                          style={{marginTop: "-25px", marginLeft: "1000px"}}
                                        />
                                      </span>
                                      
                                    </div>

                                    {/* 내 스크랩 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "80px"}}>내 스크랩</label>
                                        <button type='button' className="select-button-style" style={{marginLeft: "-10px"}}>보러가기</button>
                                    </div>


                                    {/* 내 땜빵이력 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "80px"}}>내 땜빵이력</label>
                                        <button type='button' className="select-button-style" style={{marginLeft: "-25px"}}>보러가기</button>
                                    </div>
                                

                                  </div> 
                                )}


                              </span>
                            </div>
                      </span>
                    </div>
              </div>
            </div>
          </div>
        </div>
    );
    };

  export default Damnprofile;