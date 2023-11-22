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
import { Switch } from 'react-native';
import Chatting from "../components/chatting";

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

    const [nicknameDisabled, setNicknameDisabled] = useState(false);
    const [emailDisabled, setEmailDisabled] = useState(false);
    const [phoneDisabled, setPhoneDisabled] = useState(false);
    const [introduceDisabled, setIntroduceDisabled] = useState(false);

    const [inputNicknameProfile, setInputNicknameProfile] = useState(null)
    const handleInputNickName = (e) => {
      setInputNicknameProfile(e.target.value);
    };
    const [inputEmailProfile, setInputEmailProfile] = useState(null)
    const handleInputEmail = (e) => {
      setInputEmailProfile(e.target.value);
    };
    const [inputPhoneProfile, setInputPhoneProfile] = useState(null)
    const handleInputPhone = (e) => {
      setInputPhoneProfile(e.target.value);
    };
    const [inputIntroduceProfile, setInputIntroduceProfile] = useState(null)
    const handleInputIntroduce = (e) => {
      setInputIntroduceProfile(e.target.value);
    };


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

    const [showApply, setShowApply] = useState(false); //지원자 보기 모달창
    const [showApplyDetail, setShowApplyDetail] = useState(false); //지원자 보기 세부 모달창
    const [showReview, setShowReview] = useState(false); //리뷰 남기기 모달창

    const [badgeStates, setBadgeStates] = useState("00000000");  //뱃지 설정
    let [badge1, setBadge1] = useState(false);
    let [badge2, setBadge2] = useState(false);
    let [badge3, setBadge3] = useState(false);
    let [badge4, setBadge4] = useState(false);
    let [badge5, setBadge5] = useState(false);
    let [badge6, setBadge6] = useState(false);
    let [badge7, setBadge7] = useState(false);
    let [badge8, setBadge8] = useState(false);


    const [showWorkArea, setShowWorkArea] = useState(false);   //모달창
    const [showWorkJob, setShowWorkJob] = useState(false);   //모달창

    // 지원자 보기
    const [applyData, setApplyData] = useState([{
      userid: 0,
      id: "",
      name: "",
      gender: "남",
      age: 0,
      career: 0,
      address: "",
      introduce: "",
      hopeJob: ""
    }])

    //내가 지원한 땜빵
    const [applyDamn, setApplyDamn] = useState([{
      damnpostId: "",
      damnPublisher: "",
      damnTitle: "",
      damnCreated: "",
      damnStart: "",
      damnEnd: "",
      damnBranch: "",
      damnPay: ""
    }])

    // 내가 의뢰한 땜빵
    const [requestDamn, setRequestDamn] = useState([{
      damnpostId: "",
      damnPublisher: "",
      damnTitle: "",
      damnCreated: "",
      damnStart: "",
      damnEnd: "",
      damnBranch: "",
      damnPay: "",
      damnMatchedUser: ""
    }])

    const [postId, setPostId] = useState(null);
    const [damnPostId, setDamnPostId] = useState(null);

    let [matchUser, setMatchUser] = useState("");

    const [selectedApply, setSelectedApply] = useState(null);

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
   
    const handleClose = () => {
        setShow(false);           //모달창 닫기
    }
    const handleCloseApply = () => {  //지원자 보기 모달창
        setShowApply(false);
    }
    const handleCloseApplyDetail = () => {  //지원자 보기 세부 모달창
      setShowApplyDetail(false);
    }
    const handleCloseReview = () => {   //리뷰 남기기 모달창
        setBadgeStates('00000000');
        setShowReview(false);
    }
    const handleCloseWorkArea = () => {
        setShowWorkArea(false);   //모달창 닫기
    }
    const handleCloseWorkJob = () => {
        setShowWorkJob(false);    //모달창 닫기
    }

    const handleShow = () =>{ setShow(true)};     //모달창 켜기
    const handleShowApply = () => {setShowApply(true)};  //지원자 보기 모달창 켜기
    const handleShowApplyDetail = () => {setShowApplyDetail(true)};  //지원자 보기 세부 모달창 켜기
    const handleShowReview = (postID, userID) => {    //리뷰 남기기 모달창 켜기
      setShowReview(true)
      setPostId(postID);
      setMatchUser(userID);
    };  
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
  applyDamnbread();
  requestDamnbread();
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
                console.log("거주지 patch 완료");
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
      setSelectWorkJob([]);
    };    

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
                setMyPublic(toggleIsPublic);
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


    const firstPage = () => {
      axios
            .get(`http://localhost:3000/mypage/setting`, {
              headers: {
                Authorization: "Bearer " + sessionToken
              }
            })
            .then((response) => {
              console.log("reps: ", response.data);
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
                setMyCareer(response.data.careerCnt);
                
                //땜빵이력, 스크랩 아직 ... 모르겟엉

                //공개여부 fetch
                const isPublicData = response.data.isPublic.split("|");
                if (isPublicData[0] === "true") {
                  setNoShowIsActive(true);
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
                
                const badgeData = response.data.badge;
                if(badgeData[0] === "1") {
                  setBadge1(true);
                } if(badgeData[1] === "1") {
                  setBadge2(true);
                } if(badgeData[2] === "1") {
                  setBadge3(true);
                } if(badgeData[3] === "1") {
                  setBadge4(true);
                } if(badgeData[4] === "1") {
                  setBadge5(true);
                } if(badgeData[5] === "1") {
                  setBadge6(true);
                } if(badgeData[6] === "1") {
                  setBadge7(true);
                } if(badgeData[7] === "1") {
                  setBadge8(true);
                }
            })
            .catch((error)=>{
              if (error.response.status === 400) {
                Swal.fire({
                  icon: "warning",
                  title: "경고",
                  text: "로그인 또는 회원가입이 필요한 서비스입니다. 로그인 또는 회원가입을 해주세요.",
                  showCancelButton: false,
                  confirmButtonText: "확인",
                  width: 800,
                  height: 100,
              }).then((res) => {
                  if (res.isConfirmed) {
                      history.push('/Login'); 
                      window.scrollTo(0, 0);  
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

        function onClickMyScrab() {
          document.location.href = "/myScrab";
        }

        function onClickMyHistory() {
          document.location.href = "/myHistory";
        }


        //변경 함수
        const handleClickNickname = () => {
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "닉네임을 변경하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            width: 800,
            height: 100,
          }).then((res) => {
              if (res.isConfirmed) {
                setNicknameDisabled(true);
              }
          });
        }

        function handleClickNicknameSave(nickname) {
          axios
            .patch(`http://localhost:3000/mypage/setting`, {
              nickname: nickname
            },
            {headers: {
              Authorization: "Bearer " + sessionToken
            }})
            .then((response) => {
                console.log("닉네임 변경 patch 완료")
                setMyNickname(nickname)
                Swal.fire({
                  icon: "success",
                  title: "성공",
                  text: "닉네임이 변경되었습니다.",
                  showCancelButton: false,
                  confirmButtonText: "확인",
                  width: 800,
                  height: 100,
                }).then((res) => {});
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

        const handleClickEmail = () => {
          console.log("emem")
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "이메일을 변경하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            width: 800,
            height: 100,
        }).then((res) => {
            if (res.isConfirmed) {
              setEmailDisabled(true);
              
            }
        });
        }

        function handleClickEmailSave(email) {
          axios
            .patch(`http://localhost:3000/mypage/setting`, {
              email: email
            },
            {headers: {
              Authorization: "Bearer " + sessionToken
            }})
            .then((response) => {
                console.log("이메일 변경 patch 완료")
                setMyEmail(email)
                Swal.fire({
                  icon: "success",
                  title: "성공",
                  text: "이메일이 변경되었습니다.",
                  showCancelButton: false,
                  confirmButtonText: "확인",
                  width: 800,
                  height: 100,
                }).then((res) => {});
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

        const handleClickPhone = () => {
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "전화번호을 변경하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            width: 800,
            height: 100,
        }).then((res) => {
            if (res.isConfirmed) {
              setPhoneDisabled(true);
            }
        });
        }
        
        function handleClickPhoneSave(phone) {
          axios
            .patch(`http://localhost:3000/mypage/setting`, {
              phone: phone
            },
            {headers: {
              Authorization: "Bearer " + sessionToken
            }})
            .then((response) => {
                console.log("전화번호 변경 patch 완료")
                setMyPhoneNumber(phone)
                Swal.fire({
                  icon: "success",
                  title: "성공",
                  text: "전화번호가 변경되었습니다.",
                  showCancelButton: false,
                  confirmButtonText: "확인",
                  width: 800,
                  height: 100,
                }).then((res) => {});
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

        const handleClickIntroduce = () => {
          console.log("tinr")
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "소개글을 변경하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            width: 800,
            height: 100,
        }).then((res) => {
            if (res.isConfirmed) {
              setIntroduceDisabled(true);
            }
        });
        }

        function handleClickIntroduceSave(introduce) {
          axios
            .patch(`http://localhost:3000/mypage/setting`, {
              introduce: introduce
            },
            { headers: {
              Authorization: "Bearer " + sessionToken
            }})
            .then((response) => {
                console.log("내 소개글 변경 patch 완료")
                setMyIntroduce(introduce)
                Swal.fire({
                  icon: "success",
                  title: "성공",
                  text: "소개글이 변경되었습니다.",
                  showCancelButton: false,
                  confirmButtonText: "확인",
                  width: 800,
                  height: 100,
                }).then((res) => {});
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


        //내가 지원한 땜빵 GET
        const applyDamnbread = () => {
              axios
                .get(`http://localhost:3000/mypage/applylist`, {
                  headers: {
                    Authorization: "Bearer " + sessionToken
                  }
                })
                .then((response) => {
                  console.log("applyDamn: ", response.data);
                  const _applyInputData = response.data.map((rowData) => ({
                    damnpostId: rowData.postId,
                    damnPublisher: rowData.publisher,
                    damnTitle: rowData.title,
                    damnCreated: rowData.createdDate,
                    damnStart: timeConversion(rowData.workStart),
                    damnEnd: timeConversion(rowData.workEnd),
                    damnBranch: rowData.branchName,
                    damnPay: rowData.hourPay
                  })
                  )
                  setApplyDamn(_applyInputData);
                    
                })
                .catch((error)=>{
                  // if (error.response.status === 400) {
                  //   Swal.fire({
                  //     icon: "warning",
                  //     title: "경고",
                  //     text: "내가 지원한 땜빵이 없습니다.",
                  //     showCancelButton: true,
                  //     confirmButtonText: "확인",
                  //     cancelButtonText: "취소",
                  //     width: 800,
                  //     height: 100,
                  // }).then((res) => {
                  // });
                  // }
                })
          }       


        //내가 의뢰한 땜빵 GET
        const requestDamnbread = () => {
            axios
                .get(`http://localhost:3000/mypage/requestlist`, {
                  headers: {
                    Authorization: "Bearer " + sessionToken
                  }
                })
                .then((response) => {
                  console.log("requestDamn: ", response.data);
                  const _inputData = response.data.map((rowData) => ({
                    damnpostId: rowData.postId,
                    damnPublisher: rowData.publisher,
                    damnTitle: rowData.title,
                    damnCreated: rowData.createdDate,
                    damnStart: timeConversion(rowData.workStart),
                    damnBranch: rowData.branchName,
                    damnPay: rowData.hourPay,
                    damnMatchedUser: rowData.matched_user
                  })
                  )
                  setRequestDamn(_inputData);
                })
                .catch((error)=>{
                  // if (error.response.status === 400) {
                  //   Swal.fire({
                  //     icon: "warning",
                  //     title: "경고",
                  //     text: "내가 의뢰한 땜빵이 없습니다.",
                  //     showCancelButton: true,
                  //     confirmButtonText: "확인",
                  //     cancelButtonText: "취소",
                  //     width: 800,
                  //     height: 100,
                  // }).then((res) => {
                  // });
                  // }
                })
              }       
              
              function timeConversion(time) {
                const timecv = time.split('T');
                const timecv1 = timecv[1].split('.');
                const timecv2 = timecv1[0].split(":");
                const time1 = timecv[0] + " " + timecv2[0] + ":" + timecv2[1];
                console.log("tiem1:: ", time1)
                return time1;
              }

              //지원자 보기 이벤트 발생 시
              function profileApplyFirst(postid, matched_user) {
                axios
                    .get(`http://localhost:3000/mypage/requestlist/${postid}/appliance`, {
                      headers: {
                        Authorization: "Bearer " + sessionToken
                      }
                    })
                .then(async response => {
                    console.log("RR: ", response.data);
                    console.log("지원자 보기 끝 !");
                    handleShowApply();
                    setDamnPostId(postid);
                    setMatchUser(matched_user);

                    const _inputData = response.data.map((applyData) => ({
                      userid: applyData.userId,
                      id: applyData.id,
                      name: applyData.name,
                      gender: applyData.gender,
                      age: applyData.birth,
                      career: applyData.careerCnt,
                      address: applyData.home,
                      introduce: applyData.introduce,
                      hopeJob: applyData.hopeJob
                      //땜빵 이력 추가해야됨
                    }))
        
                    setApplyData(_inputData);
                    
                })
                .catch((error) => {
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
                              history.push('/Login'); 
                              window.scrollTo(0, 0);  
                          }
                      });
                    }
                });
            };

            function getGender(gender) {
              switch(gender) {
                case false:
                  return "여";
                case true:
                  return "남";
                default:
                  return "남";
              }
            }

            function getName(name) {
              const changedName = name.replaceAll(name[1], "O");
              return changedName;
            }

            const birthToAge = (myBirth) => {
              const mybirth = myBirth.toString().substring(0, 10);
              const mybirth_year = mybirth.substring(0, 4); //2023
              const mybirth_month = mybirth.substring(5, 7);  //02
              const mybirth_day = mybirth.substring(8);  //08
              const today = new Date();
              let formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
              let age = today.getFullYear() - mybirth_year;
              if (today.getMonth() + 1 < 10) {
                formattedDate = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`;
                age = today.getFullYear() - mybirth_year;
              } else {
                formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                age = today.getFullYear() - mybirth_year;
              }
              return age;
          }

          function selectApply(user_id) {
            setSelectedApply(user_id);
            console.log("USER: ", user_id)
         }
         

         //지원자 매칭 확정하기
         function applyMatching(user_id) {
          console.log("POST: ", damnPostId)
          axios
          .post(`http://localhost:3000/mypage/requestlist/${damnPostId}/${user_id}/match`, {},
          {
            headers: {
              Authorization: "Bearer " + sessionToken
            },
          })
            .then(async response => {
                console.log(response);
                console.log("매칭 확정하기 끝 !");
                if (response.status === 201) {
                  Swal.fire({
                    icon: "success",
                    title: "매칭 성공",
                    text: "지원자 매칭이 확정되었습니다.",
                    showCancelButton: false,
                    confirmButtonText: "확인",
                    width: 800,
                    height: 100,
                    }).then((res) => {
                  });
                } else if (response.status === 202) {
                  Swal.fire({
                    icon: "success",
                    title: "매칭 변경 성공",
                    text: "매칭된 지원자가 변경되었습니다.",
                    showCancelButton: false,
                    confirmButtonText: "확인",
                    width: 800,
                    height: 100,
                    }).then((res) => {
                  });
                }
                setMatchUser(user_id);
                console.log("matchUser: ", user_id)
            })
            .catch((error) => {
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

              if (error.response.status === 400) {
                Swal.fire({
                  icon: "warning",
                  title: "경고",
                  text: "지원자를 매칭할 수 없습니다. 다시 시도해주세요.",
                  showCancelButton: false,
                  confirmButtonText: "확인",
                  width: 800,
                  height: 100,
              }).then((res) => {
              });
              }
            });

         }
        

            //리뷰 남기기 이벤트 발생 시
            //리뷰 남기기 test 필요
            function profileReview() {
              console.log("REVIEW: ", matchUser)
              if (matchUser === null) {
                Swal.fire({
                  icon: "warning",
                  title: "매칭된 지원자 없음",
                  text: "지원자를 먼저 확정해주세요.",
                  showCancelButton: false,
                  confirmButtonText: "확인",
                  width: 800,
                  height: 100,
                  }).then((res) => {
                });
              } else {
                  axios
                      .post(`http://localhost:3000/mypage/requestlist/${postId}/review`, {
                        badge: badgeStates },
                        { headers: {
                          Authorization: "Bearer " + sessionToken
                        }})
                  .then(async response => {
                      console.log(response);
                      console.log("리뷰 남기기 끝 !")
                      Swal.fire({
                        icon: "success",
                        title: "지원자 리뷰",
                        text: "지원자에게 리뷰를 남겼습니다.",
                        showCancelButton: false,
                        confirmButtonText: "확인",
                        width: 800,
                        height: 100,
                        }).then((res) => {
                      });
                  })
                  .catch((error) => {
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
                      if (error.response.status === 500) {
                          Swal.fire({
                            icon: "warning",
                            title: "경고",
                            text: "지원자를 먼저 선택해주세요.",
                            showCancelButton: true,
                            confirmButtonText: "확인",
                            cancelButtonText: "취소",
                            width: 800,
                            height: 100,
                        }).then((res) => {
                            if (res.isConfirmed) {
                                
                            }
                        });
                      }
                  });
            }
          };
        
          function handleClickBadge(badgeNum) {
            if (badgeNum >= 1 && badgeNum <= 8) {
              setBadgeStates((prevStates) => {
                const newState = prevStates.split('');
                newState[badgeNum - 1] = newState[badgeNum - 1] === "0" ? "1" : "0";
                return newState.join('');
              });
              console.log(badgeStates);
            }
          }

          function onClickDamnList(post_id) {
            document.location.href = `/damnlist/${post_id}`;
            window.scrollTo(0, 0);
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
                                    <label className="content-label-style-profile-s" style={{zIndex: 1, marginLeft: "905px", marginTop: "30px", fontSize: "15px"}}>공개 유무</label>
                                  

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
                                          style={{marginTop: "-20px", marginLeft: "920px", marginRight: "50px"}}
                                        />
                                      </span>
                                    </div>

                                  {/* 닉네임 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>닉네임</label>     
                                      <input type='text' name='nick' placeholder={myNickname} value={inputNicknameProfile} onChange={handleInputNickName} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "15px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} disabled={nicknameDisabled ? false:true }/>
                                      <button type='button' className="select-button-style" onClick={ () => handleClickNickname() } style={{marginLeft: "30px"}}>변경</button>
                                      <button type='button' className="select-button-style" onClick={() => handleClickNicknameSave(inputNicknameProfile)} style={{marginLeft: "25px"}}>저장</button>
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isNicknameActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={nicknameToggleSwitch}
                                          value={isNicknameActive}
                                          style={{marginTop: "-25px", marginLeft: "920px"}}
                                        />
                                      </span>
                                    </div>

                                  {/* 이메일 */}
                                    <div>
                                        <label className="content-label-style-profile1" style={{zIndex: 1}}>이메일</label>     
                                        <input type='text' name='email' placeholder={myEmail} value={inputEmailProfile} onChange={handleInputEmail} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "15px", fontSize: "18px", 
                                          borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} disabled={emailDisabled ? false:true }/>
                                        <button type='button' className="select-button-style" onClick={() => handleClickEmail()} style={{marginLeft: "30px"}}>변경</button>
                                        <button type='button' className="select-button-style" onClick={() => handleClickEmailSave(inputEmailProfile)} style={{marginLeft: "25px"}}>저장</button>
                                        <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isEmailActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={emailToggleSwitch}
                                          value={isEmailActive}
                                          style={{marginTop: "-25px", marginLeft: "920px"}}
                                        />
                                      </span>
                                      </div>

                                    {/* 전화번호 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>전화번호</label>     
                                      <input type='text' name='phone' placeholder={myPhoneNumber} value={inputPhoneProfile} onChange={handleInputPhone} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "-5px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} disabled={phoneDisabled ? false:true }/>
                                      <button type='button' className="select-button-style" onClick={() => handleClickPhone()} style={{marginLeft: "30px"}}>변경</button>
                                      <button type='button' className="select-button-style" onClick={() => handleClickPhoneSave(inputPhoneProfile)} style={{marginLeft: "25px"}}>저장</button>
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isPhoneActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={phoneToggleSwitch}
                                          value={isPhoneActive}
                                          style={{marginTop: "-25px", marginLeft: "920px"}}
                                        />
                                      </span>
                                    </div>

                                    {/* 거주지 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>거주지</label>  
                                      <label style={{marginTop: "10px", marginLeft: "20px", fontSize: "16px", color: "#888888"}}>{myLocation}</label>
                                      <button type='button' className="select-button-style" onClick={handleShow} style={{marginLeft: "30px"}}>변경</button>   
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isLocationActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={locationToggleSwitch}
                                          value={isLocationActive}
                                          style={{marginTop: "-25px", marginLeft: "920px"}}
                                        />
                                      </span>

                                      <Modal dialogClassName="custom-modal-content" style={{marginTop: "80px"}} show={show} onHide={handleClose}>
                                        <Modal.Header>
                                            <Modal.Title><h5>거주지 변경</h5></Modal.Title>
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
                                      <button type='button' className="select-button-style" style={{marginLeft: "-36px"}} onClick={handleShowWorkArea}>변경</button>   
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isHopeLocationActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={hopeLocationToggleSwitch}
                                          value={isHopeLocationActive}
                                          style={{marginTop: "-25px", marginLeft: "920px"}}
                                        />
                                      </span>

                                      <div>
                                      <label style={{marginTop: "20px", marginLeft: "240px", fontSize: "16px", color: "#888888", marginRight: "130px"}}>{replaceWorkJob(myHopeLocation)}</label>
                                      </div>

                                      <Modal dialogClassName="custom-modal-content" style={{marginTop: "80px"}} show={showWorkArea} onHide={handleCloseWorkArea}>
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
                                      <button type='button' className="select-button-style" style={{marginLeft: "-23px"}} onClick={handleShowWorkJob}>변경</button>   
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isHopeJobActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={hopeJobToggleSwitch}
                                          value={isHopeJobActive}
                                          style={{marginTop: "-25px", marginLeft: "920px"}}
                                        />
                                      </span>

                                      <div>
                                      <label style={{marginTop: "20px", marginLeft: "240px", fontSize: "16px", color: "#888888"}}>{replaceWorkJob(myHopeJob)}</label>
                                      </div>

                                      <Modal dialogClassName="job-box" style={{marginTop: "80px"}} show={showWorkJob} onHide={handleCloseWorkJob}>
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
                                    <label className="content-label-style-profile-s" style={{zIndex: 1, marginLeft: "905px", marginTop: "30px", fontSize: "15px"}}>공개 유무</label>
                                  
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
                                          style={{marginTop: "-25px", marginLeft: "920px"}}
                                        />
                                      </span>
                                      </div>
                                      <button type='button' className="badge1-button-style" disabled={badge1 ? false : true} style={{marginTop: "30px", border: "4px solid #FED4C8", backgroundColor: "#FED4C8"}}>슈퍼 칼답러</button>

                                      <button type='button' className="badge1-button-style" disabled={badge2 ? false : true} style={{border: "4px solid #FAEDC0", backgroundColor: "#FAEDC0"}}>슈퍼 성실러</button>

                                      <button type='button' className="badge1-button-style" disabled={badge3 ? false : true} style={{border: "4px solid #C8EBFA", backgroundColor: "#C8EBFA"}}>슈퍼 친절러</button>

                                      <button type='button' className="badge1-button-style" disabled={badge4 ? false : true} style={{border: "4px solid #D4B8E6", backgroundColor: "#D4B8E6"}}>슈퍼 일잘러</button>

                                      <button type='button' className="badge1-button-style" disabled={badge5 ? false : true} style={{border: "4px solid #FFD6A3", backgroundColor: "#FFD6A3"}}>슈퍼 단정러</button>

                                      <button type='button' className="badge1-button-style" disabled={badge6 ? false : true} style={{border: "4px solid #C2E8BE", backgroundColor: "#C2E8BE"}}>슈퍼 대처러</button>

                                      <button type='button' className="badge1-button-style" disabled={badge7 ? false : true} style={{border: "4px solid #B4B6DB", backgroundColor: "#B4B6DB"}}>슈퍼 꼼꼼러</button>

                                      <button type='button' className="badge1-button-style" disabled={badge8 ? false : true} style={{border: "4px solid #F0C8F5", backgroundColor: "#F0C8F5"}}>슈퍼 긍정러</button>
                                      
                                    </div>

                                    {/* 내 소개글 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "80px"}}>내 소개글</label>
                                      <input type='text' name='introduce' placeholder={myIntroduce} value={inputIntroduceProfile} onChange={handleInputIntroduce} style={{width:"430px", height: "40px", marginTop: "10px", marginLeft: "-8px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} disabled={introduceDisabled ? false:true } />
                                      <button type='button' className="select-button-style" onClick={() => handleClickIntroduce()} style={{marginLeft: "30px"}}>변경</button> 
                                      <button type='button' className="select-button-style" onClick={() => handleClickIntroduceSave(inputIntroduceProfile) } style={{marginLeft: "25px"}}>저장</button>
                                      
                                      <span>
                                        <Switch
                                          trackColor={{false: '#767577', true: '#81b0ff'}}
                                          thumbColor={isIntroduceActive ? '#f5dd4b' : '#f4f3f4'}
                                          onValueChange={introduceToggleSwitch}
                                          value={isIntroduceActive}
                                          style={{marginTop: "-25px", marginLeft: "920px", marginRight: "50px"}}
                                        />
                                      </span>
                                      
                                    </div>

                                    {/* 내 스크랩 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "80px"}}>내 스크랩</label>
                                        <button type='button' className="select-button-style" onClick={onClickMyScrab} style={{marginLeft: "-10px"}}>보기</button>
                                    </div>


                                    {/* 내 땜빵이력 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "80px"}}>내 땜빵이력</label>
                                        <button type='button' className="select-button-style" onClick={onClickMyHistory} style={{marginLeft: "-25px"}}>보기</button>
                                    </div>
                                

                                  </div> 
                                )}


                                {/* onClick={() => onClickDamnList(rowData.damnpostId)} */}
                                {/* 내가 지원한 땜빵 */}
                                {showDamnApply && (
                                    <div style={{overflowY: "auto", maxHeight: "750px", maxWidth: "1500px", marginRight: "10px"}}>
                                    {applyDamn.map(rowData => (
                                      <div  key={rowData.damnPublisher}
                                      className="requestdamn-box">
                                        <div style={{marginLeft: "25px", marginTop: "20px"}}>
                                          <b>{rowData.damnTitle}</b>
                                          <span style={{float: "right", marginRight: "15px"}}>
                                          {(rowData.damnCreated)}
                                            </span>
                                        </div>

                                        <div>
                                          <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px"}}>근무일시</label>
                                          {(rowData.damnStart)}
                                        </div>
                                          <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px", marginRight: "105px"}}>근무지</label>
                                            {rowData.damnBranch}
                                        <div>
                                          <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px", marginRight: "120px"}}>시급</label>
                                              {rowData.damnPay}
                                        </div>
                                        

                                        {/* 진행중, 매칭완료, 근무완료, 매칭종료 */}
                                        <div>
                                          
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                )}


                                {/* 내가 의뢰한 땜빵 */}
                                {showDamnRequest && (
                                  <div style={{overflowY: "auto", maxHeight: "750px", maxWidth: "1500px", marginRight: "10px"}}>
                                    {requestDamn.map(rowData => (
                                        <div key={rowData.damnPublisher} className="requestdamn-box">
                                          <div onClick={() => onClickDamnList(rowData.damnpostId)} style={{marginLeft: "25px", marginTop: "20px"}}>
                                            <b>{rowData.damnTitle}</b>
                                            <span style={{float: "right", marginRight: "15px"}}>
                                            {(rowData.damnCreated)}
                                              </span>
                                          </div>

                                          <div onClick={() => onClickDamnList(rowData.damnpostId)}>
                                            <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px"}}>근무일시</label>
                                            {(rowData.damnStart)}
                                          </div>
                                            <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px", marginRight: "105px"}}>근무지</label>
                                              {rowData.damnBranch}
                                          <div onClick={() => onClickDamnList(rowData.damnpostId)}>
                                            <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px", marginRight: "120px"}}>시급</label>
                                                {rowData.damnPay}
                                          </div>
                                          

                                          {/* 진행중, 매칭완료, 근무완료, 매칭종료 */}
                                          
                                          <div>
                                            <button type='button' onClick={() => profileApplyFirst(rowData.damnpostId, rowData.damnMatchedUser)} className="requestdamn-button">지원자 보기</button>
                                            <button type='button' onClick={() => handleShowReview(rowData.damnpostId, rowData.damnMatchedUser)} className="requestdamn-button">리뷰 남기기</button>
                                            <button type='button' className="requestdamn-button">수정/삭제하기</button>
                                          </div>
                                      </div>
                                    ))}

                                    {/* 지원자 보기 모달창 */}
                                      <Modal dialogClassName="modal-whole-rank" show={showApply} onHide={handleCloseApply}>
                                          {(
                                              <div className="apply-whole-box">
                                                  <Modal.Body>
                                                      <div className="scrollable-item">
                                                      {applyData.map(rowData => (
                                                    <div key={rowData.userid}
                                                      onClick={() => selectApply(rowData.userid)}
                                                      className={`apply-item-box ${selectedApply === rowData.userid ? 'selected' : ''} ${matchUser === rowData.userid ? 'selected' : ''}`}>
                                                          <div className="apply-item-carrer">
                                                            <b>경력 {rowData.career}회</b>
                                                          </div>

                                                          <div>
                                                            <span>
                                                              <img src={getGenderImage(rowData.gender)} className="apply-item-gender" id="성별" width="70" alt="gender"/>
                                                                <span className="apply-item-name">
                                                                <b>{getName(rowData.name)}</b>
                                                                  
                                                                  <span className="apply-item-age">
                                                                    {getGender(rowData.gender)} {"/ "+ birthToAge(rowData.age) + "세"}
                                                                  </span>
                                                                </span>

                                                                <span className="apply-item-address">
                                                                  {rowData.address}
                                                                </span>
                                                              </span>
                                                            </div>
                                                        </div>
                                                      ))}
                                                      </div>

                                                      <div className="footer-button1">
                                                        <button onClick={() => handleShowApplyDetail()} className="footer-style footer-button-profile">
                                                          프로필 보기
                                                        </button>
                                                        <button onClick={() => applyMatching(selectedApply)} className="footer-style footer-button-matching">
                                                          매칭 확정하기
                                                        </button>
                                                      </div>
                                                      
                                                  </Modal.Body>

                                                </div>
                                              )}
                                          </Modal>

                                          {/* 지원자보기 세부 */}
                                          <Modal dialogClassName="modal-whole-rank" show={showApplyDetail} onHide={handleCloseApplyDetail}>
                                            {selectedApply ? (
                                              <div className="custom-rank-content">
                                                  <Modal.Body>
                                                      <div className="scrollable-container">
                                                      {applyData
                                                        .filter((item) => (item.userid) === (selectedApply))
                                                        .map(rowData => (
                                                          <div key={rowData.id}>
                                                              <div>
                                                                <span className="label-style111" style={{marginLeft: "30px"}}>
                                                                  <label className="label-style111" style={{zIndex: 1, fontSize: "22px", marginLeft: "10px", marginTop: "10px", marginBottom: "20px"}}>
                                                                  <b>땜빵 경력 {rowData.career}회</b>  </label>           
                                                                </span>
                                                            </div>

                                                            <div>
                                                              <span>
                                                                  <img src={getGenderImage(rowData.gender)} className="gender-image" id="성별" width="120" alt="gender"/>
                                                                  
                                                                    <span className="name-style" style={{fontSize: "25px", marginLeft: "50px"}}>
                                                                      <b>{getName(rowData.name)}</b>

                                                                      <span className="title-style" style={{fontSize: "18px", marginTop: "15px", marginLeft: "2px"}}>
                                                                        {rowData.title}
                                                                      </span>
                                                                      
                                                                    </span>

                                                                      <span>
                                                                        <span className="gender-age" style={{fontSize: "17px", marginLeft: "65px"}}>
                                                                          {getGender(rowData.gender)} {"/ "+ birthToAge(rowData.age) + "세"}
                                                                        </span>
                                                                        
                                                                
                                                                      </span>
                                                                        <div style={{marginTop: "30px", marginLeft: "40px"}}>
                                                                          <label><b>거주 지역</b></label>
                                                                        </div>
                                                                        <div>
                                                                          <div className="selectedItemAddress-style">{rowData.address}</div>

                                                                        </div>

                                                                        <div style={{marginTop: "40px", marginLeft: "40px"}}>
                                                                          <label><b>희망 업/직종</b></label>
                                                                        </div>
                                                                        <div>
                                                                          <div className="selectedItemAddress-style">{replaceWorkJob(rowData.hopeJob)}</div>
                                                                        </div>
                                                                    </span>

                                                                    <div>
                                                                        {/* 땜빵 이력 */}

                                                                    </div>
                                                          </div>
                                                        </div>
                                                      ))}
                                                      </div>
                                                  </Modal.Body>
                                                </div>
                                              ) : (
                                                <div> </div>
                                              )}
                                          </Modal>



                                          {/* 리뷰 남기기 모달창 */}
                                      <Modal dialogClassName="modal-whole-review" style={{marginTop: "70px"}} show={showReview} onHide={handleCloseReview}>
                                          {(
                                              <div className="apply-whole-box">
                                                  <Modal.Body>
                                                    
                                                      <div>
                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(1)} style={{marginTop: "10px", 
                                                        border: `4px solid ${badgeStates[0] === "1" ? "#FED4C8" : "#FED4C880"}`, color: `${badgeStates[0] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[0] === "1" ? "#FED4C8" : "#FED4C880"}`}}>슈퍼 칼답러</button>

                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(2)} 
                                                        style={{border: `4px solid ${badgeStates[1] === "1" ? "#FAEDC0" : "#FAEDC080"}`, color: `${badgeStates[1] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[1] === "1" ? "#FAEDC0" : "#FAEDC080"}`}}>슈퍼 성실러</button>

                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(3)}
                                                        style={{border: `4px solid ${badgeStates[2] === "1" ? "#C8EBFA" : "#C8EBFA80"}`, color: `${badgeStates[2] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[2] === "1" ? "#C8EBFA" : "#C8EBFA80"}`}}>슈퍼 친절러</button>

                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(4)}
                                                        style={{border: `4px solid ${badgeStates[3] === "1" ? "#D4B8E6" : "#D4B8E680"}`, color: `${badgeStates[3] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[3] === "1" ? "#D4B8E6" : "#D4B8E680"}`}}>슈퍼 일잘러</button>

                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(5)}
                                                        style={{border: `4px solid ${badgeStates[4] === "1" ? "#FFD6A3" : "#FFD6A380"}`, color: `${badgeStates[4] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[4] === "1" ? "#FFD6A3" : "#FFD6A380"}`}}>슈퍼 단정러</button>

                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(6)}
                                                        style={{border: `4px solid ${badgeStates[5] === "1" ? "#C2E8BE" : "#C2E8BE80"}`, color: `${badgeStates[5] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[5] === "1" ? "#C2E8BE" : "#C2E8BE80"}`}}>슈퍼 대처러</button>

                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(7)}
                                                        style={{border: `4px solid ${badgeStates[6] === "1" ? "#B4B6DB" : "#B4B6DB80"}`, color: `${badgeStates[6] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[6] === "1" ? "#B4B6DB" : "#B4B6DB80"}`}}>슈퍼 꼼꼼러</button>

                                                        <button type='button' className="badge2-button-style" onClick={() => handleClickBadge(8)}
                                                        style={{marginBottom: "40px", border: `4px solid ${badgeStates[7] === "1" ? "#F0C8F5" : "#F0C8F580"}`, color: `${badgeStates[7] === "1" ? "black" : "#9D9D9D"}`,
                                                        backgroundColor: `${badgeStates[7] === "1" ? "#F0C8F5" : "#F0C8F580"}`}}>슈퍼 긍정러</button>

                                                      </div>

                                                      <div className="footer-button1">
                                                        <button className="footer-style footer-button-save" onClick={() => profileReview()}>
                                                          저장하기
                                                        </button>
                                                        <button className="footer-style footer-button-report">
                                                          신고하기
                                                        </button>
                                                      </div>
                                                      
                                                  </Modal.Body>

                                                </div>
                                              )}
                                                  
                                          </Modal>

                                  </div>
                                )}
                              </span>
                            </div>
                      </span>
                    </div>
              </div>
            </div>
          </div>
          <Chatting />
        </div>
    );
    };

  export default Damnprofile;