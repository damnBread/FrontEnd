import React, { useEffect, useState } from "react";
import axios from "axios";
import man from "../assets/img/damnRank-man-icon.png";
import woman from "../assets/img/damnRank-woman-icon.png";
import Header from "../components/Headers/Header";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "../assets/css/damnprofile.css";
import Footer from "../components/Footers/Footer";
import styled from 'styled-components';

const ToggleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleButton = styled.div`
  width: 45px;
  height: 26px;
  border: 1px solid #84848469;
  background: #ccc;
  border-radius: 15px;
  position: relative;
`;

const Slider = styled.div`
  width: 26px;
  height: 26px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  border: 1px solid #84848469;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isNoShowActive }) => (isNoShowActive ? 'translateX(20px)' : 'translateX(1px)')};
`;


const Damnprofile = () => {
    
    const sessionToken = sessionStorage.getItem('token');

    const history = useHistory();

    //고정
    const [myCareer, setMyCareer] = useState("");                 //땜빵 경력

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
    const [myHopeJob, setMyHopeJob] = useState("");               //희망 업직종
    const [myHopeLocation, setMyHopeLocation] = useState("");     //희망 근무 지역


    //내 활동
    const [myScrab, setMyScrab] = useState("");                   //스크랩
    const [myDamnHistory, setMyDamnHistory] = useState("");       //땜빵 이력
    const [myBadge, setMyBadge] = useState("");                   //뱃지
    const [myIntroduce, setMyIntroduce] = useState("");           //내 소개글

  
    const [showInfo, setShowInfo] = useState(true);  //내 정보
    const [showActivity, setShowActivity] = useState(false);  //내 활동
    const [showDamnApply, setShowDamnApply] = useState(false);  //내가 지원한 땜빵
    const [showDamnRequest, setShowDamnRequest] = useState(false);  //내가 의뢰한 땜빵

    const [isNoShowActive, setNoShowAIsActive] = useState(false);
    const [isNicknameActive, setNicknameIsActive] = useState(false);
    const [isEmailActive, setEmailIsActive] = useState(false);
    const [isPhoneActive, setPhoneIsActive] = useState(false);
    const [isLocationActive, setLocationIsActive] = useState(false);
    const [isHopeJobActive, setHopeJobIsActive] = useState(false);
    const [isHopeLocationActive, setHopeLocationIsActive] = useState(false);

    const [isIntroduceActive, setIntroduceIsActive] = useState(false);
    const [isBadgeActive, setBadgeIsActive] = useState(false);

    

    const toggleButton = (info) => {
      if (info === "noShow") {
        setNoShowAIsActive(!isNoShowActive)
      } else if (info === "nickname") {
        setNicknameIsActive(!isNicknameActive)
      } else if (info === "email") {
        setEmailIsActive(!isEmailActive)
      } else if (info === "phone") {
        setPhoneIsActive(!isPhoneActive)
      } else if (info === "location") {
        setLocationIsActive(!isLocationActive)
      } else if (info === "hopeLocation") {
        setHopeLocationIsActive(!isHopeLocationActive)
      } else if (info === "hopeJob") {
        setHopeJobIsActive(!isHopeJobActive)
      } else if (info === "introduce") {
        setIntroduceIsActive(!isIntroduceActive)
      } else if (info === "badge") {
        setBadgeIsActive(!isBadgeActive)
      } else {
        console.log("cannot find info...")
      }
      console.log("ACTIVE: ", info);
    };

    useEffect(() => {
      firstPage();
    }, []);
    

    const firstPage = () => {
      axios
            .get(`http://localhost:3000/mypage/setting`, {
              headers: {
                Authorization: "Bearer " + sessionToken
              }
            })
            .then((response) => {
                console.log(response.data);

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

                setMyIntroduce(response.data.introduce);
                setMyBadge(response.data.badge);
                //땜빵이력, 스크랩 아직 ... 모르겟엉

                console.log("noshow: ", myNoShow);
                console.log("id: ", myId);
                console.log("name: ", myName);
                console.log("gender: ", myGender);
                console.log("nickname: ", myNickname);
                console.log("pw: ", myPassword);
                console.log("email: ", myEmail);
                console.log("phone: ", myPhoneNumber);
                console.log("location: ", myLocation);
                console.log("job: ", myHopeJob);
                console.log("hopeLocation: ", myHopeLocation);

                console.log("introduce: ", myIntroduce);
                console.log("badge: ", myBadge);


                console.log("마이페이지 첫 페이지 완료");
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
                  else{
                      //취소
                  }
              });
              }
            })
        }

        function getBadgeBackgroundColor(badgeValue) {
          switch (badgeValue) {
            case '적극 응답':
              return '#FFD0CE';
            case '따뜻한 인재':
              return '#FAFC80';
            default:
              return '#B5CBFF'; // Set a default background color if needed
          }
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
          console.log("내 정보");
        }

        const handleClickMyActivity = () => {
          setShowInfo(false); 
          setShowActivity(true); 
          setShowDamnApply(false);   
          setShowDamnRequest(false);       
          console.log("내 활동");
        }

        const handleClickDamnApply = () => {
          setShowInfo(false); 
          setShowActivity(false); 
          setShowDamnApply(true);   
          setShowDamnRequest(false);   
          console.log("내가 지원한");
        }

        const handleClickDamnRequest = () => {
          setShowInfo(false); 
          setShowActivity(false); 
          setShowDamnApply(false);   
          setShowDamnRequest(true);   
          console.log("내가 의뢰한");  
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
                                      <span className="blank">* 노쇼 횟수 5회 이상시, 자동으로 탈퇴처리가 되며, 땜빵 이용이 불가능합니다.</span>
                                      <span>
                                        <ToggleButtonWrapper onClick={() => toggleButton("noShow")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                          <ToggleButton>
                                            <Slider isNoShowActive={isNoShowActive} />
                                          </ToggleButton>
                                        </ToggleButtonWrapper>
                                      </span>
                                      
                                    </div>

                                  {/* 닉네임 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>닉네임</label>     
                                      <input type='text' name='nick' placeholder={myNickname} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "15px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                      <span>
                                        <ToggleButtonWrapper onClick={() => toggleButton("nickname")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                          <ToggleButton>
                                            <Slider isNicknameActive={isNicknameActive} />
                                          </ToggleButton>
                                        </ToggleButtonWrapper>
                                      </span>
                                    </div>

                                  {/* 이메일 */}
                                    <div>
                                        <label className="content-label-style-profile1" style={{zIndex: 1}}>이메일</label>     
                                        <input type='text' name='email' placeholder={myEmail} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "15px", fontSize: "18px", 
                                          borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                        <span>
                                          <ToggleButtonWrapper onClick={() => toggleButton("email")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                            <ToggleButton>
                                              <Slider isEmailActive={isEmailActive} />
                                            </ToggleButton>
                                          </ToggleButtonWrapper>
                                        </span>
                                      </div>

                                    {/* 전화번호 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>전화번호</label>     
                                      <input type='text' name='phone' placeholder={myPhoneNumber} style={{width:"350px", height: "40px", marginTop: "10px", marginLeft: "-5px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                      <span>
                                        <ToggleButtonWrapper onClick={() => toggleButton("phone")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                          <ToggleButton>
                                            <Slider isPhoneActive={isPhoneActive} />
                                          </ToggleButton>
                                        </ToggleButtonWrapper>
                                      </span>
                                    </div>

                                    {/* 거주지 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>거주지</label>  
                                      <button type='button' className="select-button-style">변경하기</button>   
                                      <label style={{marginTop: "10px", marginLeft: "40px", fontSize: "18px", color: "#888888"}}>{myLocation}</label>
                                      <span>
                                        <ToggleButtonWrapper onClick={() => toggleButton("location")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                          <ToggleButton>
                                            <Slider isLocationActive={isLocationActive} />
                                          </ToggleButton>
                                        </ToggleButtonWrapper>
                                      </span>
                                    </div>

                                    {/* 희망근무지역 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1}}>희망근무지역</label>  
                                      <button type='button' className="select-button-style" style={{marginLeft: "-36px"}}>변경하기</button>   
                                      <span>
                                        <ToggleButtonWrapper onClick={() => toggleButton("hopeLocation")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                          <ToggleButton>
                                            <Slider isHopeLocationActive={isHopeLocationActive} />
                                          </ToggleButton>
                                        </ToggleButtonWrapper>
                                      </span>

                                      <div>
                                      <label style={{marginTop: "20px", marginLeft: "240px", fontSize: "18px", color: "#888888"}}>{replaceWorkJob(myHopeLocation)}</label>
                                      </div>

                                    </div>

                                    {/* 희망 업직종 */}
                                    <div>
                                      <label className="content-label-style-profile1" style={{zIndex: 1, marginTop: "30px"}}>희망 업직종</label>  
                                      <button type='button' className="select-button-style" style={{marginLeft: "-23px"}}>변경하기</button>   
                                      <span>
                                        <ToggleButtonWrapper onClick={() => toggleButton("hopeJob")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                          <ToggleButton>
                                            <Slider isHopeJobActive={isHopeJobActive} />
                                          </ToggleButton>
                                        </ToggleButtonWrapper>
                                      </span>

                                      <div>
                                      <label style={{marginTop: "20px", marginLeft: "240px", fontSize: "18px", color: "#888888"}}>{replaceWorkJob(myHopeJob)}</label>
                                      </div>

                                    </div>






                                  </div>
                                )}

                                {/* 내 활동 */}
                                {showActivity && (
                                  <div>
                                    <label className="content-label-style-profile-s" style={{zIndex: 1, marginLeft: "985px", marginTop: "30px", fontSize: "15px"}}>공개 유무</label>
                                  

                                  {/* 내 소개글 */}
                                    <div>
                                      <label className="content-label-style-profile" style={{zIndex: 1}}>내 소개글</label>
                                      <input type='text' name='introduce' placeholder={myIntroduce} style={{width:"600px", height: "40px", marginTop: "10px", marginLeft: "-8px", fontSize: "18px", 
                                        borderColor: "#b0acac", borderRadius: "10px", padding: ".5em"}} />
                                      <span>
                                        <ToggleButtonWrapper onClick={() => toggleButton("introduce")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                          <ToggleButton>
                                            <Slider isIntroduceActive={isIntroduceActive} />
                                          </ToggleButton>
                                        </ToggleButtonWrapper>
                                      </span>
                                      
                                    </div>

                                    {/* 내 뱃지 */}
                                    <div>
                                      <div>
                                          <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "70px"}}>내 뱃지</label>
                                          <span>
                                            <ToggleButtonWrapper onClick={() => toggleButton("badge")} style={{marginLeft: "1000px", marginTop: "-30px"}}>
                                              <ToggleButton>
                                                <Slider isBadgeActive={isBadgeActive} />
                                              </ToggleButton>
                                            </ToggleButtonWrapper>
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