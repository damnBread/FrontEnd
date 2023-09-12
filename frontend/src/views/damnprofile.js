import React, { useEffect, useState } from "react";
import axios from "axios";
import man from "../assets/img/damnRank-man-icon.png";
import woman from "../assets/img/damnRank-woman-icon.png";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
import "../assets/css/damnprofile.css";
import Footer from "../components/Footers/Footer";

const Damnprofile = () => {
    
    const sessionToken = sessionStorage.getItem('token');

    function token() {
      console.log("SSSSS: " + sessionToken);
    }

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
  

    return (
      <div className="damnprofilewhole">
        <Header />
        <div className="damnprofile">
            <div className="whole-box" onClick={token()}>

                <div>
                    <div>
                      <span>
                          <img src={getGenderImage(myGender)} className="gender-image-profile" id="성별" width="120" alt="gender"/>
                            
                            <span className="name-style-profile">
                              {myName}
                                <span className="label-style-profile" style={{fontSize: "20px"}}>
                                  <label className="label-style-profile" style={{zIndex: 1, marginLeft: "5px", marginTop: "5px"}}>땜빵 경력</label>     
                                  <label className="label-style-profile1" style={{zIndex: 1, marginLeft: "5px", marginTop: "5px"}}><b>{myCareer} </b></label>회    
                                </span>
                            </span>

                            {/* <span className="title-style">
                              <span>
                                <b>{myIntroduce}</b>
                                <span className="workjob-style">
                                  {replaceWorkJob(myHopeJob)}
                                </span>
                              </span>
                              <span className="address-style">
                                <b>{myLocation}</b>
                              </span>
                            </span> */}
                        
                      </span>
                    </div>
              </div>
            </div>
          </div>
        </div>
      
    );
    };

  export default Damnprofile;