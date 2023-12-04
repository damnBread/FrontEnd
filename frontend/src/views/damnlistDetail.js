import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnlistDetail.css";
import "../components/Footers/Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import damnlistworkdate from "../assets/img/damnlistworkdate.png";
import damnlistworkmoney from "../assets/img/damnlistworkmoney.png";
import damnlistworkperiod from "../assets/img/damnlistworkperiod.png";
import damnlistworktime from "../assets/img/damnlistworktime.png";
import damnlistscrap from "../assets/img/damnlistscrap.png";
import damnlistscrapclick from "../assets/img/damnlistscrapclick.png";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import * as StompJs from '@stomp/stompjs';
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import send from "../assets/img/send.png"
import Chatting from "../components/chatting";

const getCoordinatesFromAddress = async (address) => {
  const apiKey = "AIzaSyBSAd6eYUYY8l9LV9eY8FXiJXAPU6zPDCk";
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  if (response.data.results.length > 0) {
    const location = response.data.results[0].geometry.location;
    return location;
  } else {
    return null;
  }
};

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);

  // 원하는 날짜 형식 설정
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("ko-KR", dateOptions);

  // 원하는 시간 형식 설정
  const timeOptions = { hour: "numeric", minute: "numeric" };
  const formattedTime = dateObject.toLocaleTimeString("ko-KR", timeOptions);

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

const DamnlistDetail = () => {
  const sessionToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("idNum");

  const [activeApplyBtn, setActiveApplyBtn] = useState(true);
  const [activeChattingBtn, setActiveChattingBtn] = useState(true);

  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const [scrapimageSrc, scrapsetImageSrc] = useState(damnlistscrap);
  const [scrapisClicked, scrapsetIsClicked] = useState(false); // 클릭 여부를 state로 관리

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const [showChat, setShowChat] = useState(false);  //채팅 시작 모달창

  const scarphandleClick = () => {
    if (scrapisClicked) {
      scrapsetImageSrc(damnlistscrap);
      scrapsetIsClicked(false);
      console.log("false");
    } else {
      scrapsetImageSrc(damnlistscrapclick);
      scrapsetIsClicked(true);
      console.log("true");
    }
    scrapsetIsClicked(!scrapisClicked); // Toggle the clicked state
  };

  const handleSupplyClick = () => {
    //지원하기 클릭시
    Swal.fire({
      icon: "warning",
      title: "땜빵 지원",
      text: "지원하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      width: 800, 
      height: 100,
    }).then((res) => {
      if (res.isConfirmed) {
        //확인을 클릭할 경우 -> axios
        axios
          .post(
            `http://localhost:3000/damnlist/${postid}/apply`,
            {
              postNum: postid,
            },
            {
              headers: {
                Authorization: "Bearer " + sessionToken,
              },
            }
          )
          .then((response) => {
            console.log("지원하기 완료");
            Swal.fire({
              icon: "success",
              title: "땜빵 지원",
              text: "지원이 완료되었습니다. 마이페이지에서 확인할 수 있습니다.",
              showCancelButton: false,
              confirmButtonText: "확인",
              width: 800,
              height: 100,
            }).then((res) => {});
          })
          .catch((error) => {
            if (error.response.status === 400) {
              //올바르지 않은 게시물 정보
              Swal.fire({
                icon: "warning",
                title: "경고",
                text: "올바르지 않은 게시물입니다. 다시 확인해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
              }).then((res) => {});
            }
            if (error.response.status === 401) {
              //헤더 인증
              Swal.fire({
                icon: "warning",
                title: "경고",
                text: "로그인이 필요한 서비스입니다. 로그인 해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
              }).then((res) => {});
            }
            if (error.response.status === 409) {
              //이미 지원한 경우
              Swal.fire({
                icon: "warning",
                title: "경고",
                text: "이미 지원한 공고입니다. 마이페이지에서 확인해보세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
              }).then((res) => {});
            }
          });
      }
    });
  };

  const [appliance_id, setAppliance_id] = useState(0);

  const [publisher_id, setPublisher_id] = useState(0);

  const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
  let [chat, setChat] = useState('');         // 입력되는 채팅
  const client = useRef({});

  const handleChatClose = () => {
    setShowChat(false);   //채팅 시작 모달창 닫기
  }

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws',
      onConnect: () => {
        console.log('success');  // 얘는 맨 처음에만 연결
        subscribe();  // 구독 ..
      },
      connectHeaders: { // 이 부분 새로 추가
        Authorization: "Bearer " + sessionToken,
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: '/pub/chat',
      body: JSON.stringify({
        chat: chat,
        sender: appliance_id,
        receiver: publisher_id
      }),
    });

    setChat('');
  };

  const subscribe = () => {
    console.log("my id is, for subscribe" , userId)
    client.current.subscribe('/sub/chat/' + userId, (body) => {
      const json_body = JSON.parse(body.body);
      console.log("messgae recieved :: " + json_body["chat"] + " - from :: "+ json_body["sender"]);
      setChatList((_chat_list) => [
        ..._chat_list, json_body
      ]);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => { // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event) => { // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();

    if (chat === "") {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "메세지를 입력해주세요.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
    }).then((res) => {
    });
    } else {
      publish(chat);  // 채팅 보내기 누르면 실행
    }

    console.log("chta:: ", chat);

    console.log("app:: ", appliance_id);
    console.log("pub:: ", publisher_id);

    // axios
    // .post(`http://localhost:3000/damnlist/chat`, {
    //   user_appliance: appliance_id,
    //   user_publisher: publisher_id
    // },
    // {
    //   headers: {
    //     Authorization: "Bearer " + sessionToken
    //   },
    // })
    //   .then(async response => {
    //       console.log(response);
    //       console.log("채팅 보내기 끝 !");
          
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log("1", error.response.data);
    //       console.log("2", error.response.status);
    //       console.log("3", error.response.headers);
    //     } else if (error.request) {
    //       console.log("4", error.request);
    //     } else {
    //       console.log('Error', error.message);
    //     }
    //     console.log("5", error.config);
    //   })
  };
  
  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  function startChat() {
    setShowChat(true);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/damnlist/${postid}`)
      .then((response) => {
        if (response.data) {
          console.log("1111", response.data);
          const formattedDeadline = formatDate(response.data.deadline);
          response.data.deadline = formattedDeadline;

          const formattedCreatedDate = formatDate(response.data.createdDate);
          response.data.createdDate = formattedCreatedDate;

          const formattedWorkStart = formatDate(response.data.workStart);
          const formattedWorkEnd = formatDate(response.data.workEnd);
          response.data.workStart = formattedWorkStart.date;
          response.data.workEnd = `${formattedWorkStart.time}~${formattedWorkEnd.time}`;

          getCoordinatesFromAddress(response.data.location)
            .then((coordinates) => {
              if (coordinates) {
                setLocation(coordinates);
              } else {
                console.error("Error geocoding the address");
              }
            })
            .catch((error) => {
              console.error("Error fetching coordinates:", error);
            });

          setPost(response.data);
          setPublisher_id(response.data.publisher);
          setAppliance_id(userId);
          
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        console.log("Server error response:", error.response.data);
      });
  }, [postid]);

  if (post === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="damnlistdetailwhole">
      <Header />
      <div className="damnlistcontainer">
        {post && (
          <div key={post.damnPublisher} className="damnitem">
            <div className="damnlistdetailcontainer">
              <div className="damndetailcreate">{post.createdDate.date}</div>

              <div className="damnitem-box1">
                <div className="damndetaildeadline">
                  <span>마감일: {post.deadline.date}</span>
                  <div className="damndeatailscrap">
                    <img
                      src={scrapimageSrc}
                      width="47"
                      height="47"
                      alt="Work Scrap"
                      onClick={scarphandleClick}
                    />
                  </div>
                </div>
                <div className="damndetailtitle">{post.title}</div>
                <div className="damndetailbranch">{post.branchName}</div>
                <div className="damndetailwork">
                  <div className="damndetailworkdate">
                    <img
                      src={damnlistworkdate}
                      width="47"
                      height="47"
                      alt="Work Date"
                    />
                    <p className="workdate">근무일</p>
                    <p className="workdate1">{post.workStart}</p>
                  </div>
                  <div className="damndetailworkperiod">
                    <img
                      src={damnlistworkperiod}
                      width="47"
                      height="45"
                      alt="Work Period"
                    />
                    <p className="workperiod">근무기간</p>
                    <p className="workperiod1">하루</p>
                  </div>
                  <div className="damndetailworktime">
                    <img
                      src={damnlistworktime}
                      width="47"
                      height="43"
                      alt="Work Time"
                    />
                    <p className="worktime1">근무시간</p>
                    <p className="worktime2">{post.workEnd}</p>
                  </div>
                  <div className="damndetailworkmoney">
                    <img
                      src={damnlistworkmoney}
                      width="50"
                      height="47"
                      alt="Work Money"
                    />
                    <p className="workmoney1">시급</p>
                    <p className="workmoney2">{post.hourPay}</p>
                  </div>
                </div>
              </div>

              <div className="damnitem-box2">
                <div className="damndetailcondition">
                  <p className="workcondition">모집조건</p>
                </div>
                <div className="damndetailcondition1">
                  <p className="damndetaildeadline">
                    모집 마감:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.deadline.date}
                  </p>
                  <p className="damndetailstudent">
                    학력:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;무관
                  </p>
                </div>
                <div className="damndetailcondition2">
                  <p className="damndetaildeadline">
                    모집 인원:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.recruitNumber}
                  </p>
                  <p className="damndetailstudent">
                    연령:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;무관
                  </p>
                </div>
                <div className="damndetailcondition3">
                  <p className="damndetaildeadline">
                    성별:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.genderLimit ? "남성우대" : "여성우대"}
                  </p>
                  <p className="damndetailstudent">
                    우대사항:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.additionalLimit}
                  </p>
                </div>
              </div>
              <div className="damnitem-box3">
                <div className="damndetaillocation">
                  <p className="worklocation">근무지역</p>
                </div>
                <div className="damndetaillocation1">
                  <p className="worklocation1">{post.location}</p>
                  <div
                    className="worklocationkakaomap"
                    id="worklocationkakaomap"
                  >
                    {/* kakaomap */}
                    <Map
                      center={location}
                      style={{
                        width: "1000px",
                        height: "500px",
                        borderRadius: "10px",
                      }}
                      level={3}
                    >
                      <MapMarker position={location}>{post.location}</MapMarker>
                    </Map>
                  </div>
                </div>
              </div>
            </div>
            <div className="damndetailbutton">
              <div className="damndetailbuttonsuply">
                <Button
                  variant="outlined"
                  sx={{ borderColor: "brown", color: "brown" }}
                  onClick={handleSupplyClick}
                  disabled={activeApplyBtn ? false : true}
                >
                  지원하기
                </Button>
              </div>
              <div className="damndetailbuttonchat">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "brown",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkbrown",
                    },
                  }}
                  onClick={() => startChat()}
                  disabled={activeChattingBtn ? false : true}
                >
                  채팅하기
                </Button>
              </div>
            </div>

            {/* 채팅 모달창 */}
            <Modal dialogClassName="modal-whole-rank1" show={showChat} onHide={handleChatClose}>
              {(
                  <div className="custom-rank-content" style={{overflowY: "auto"}}>
                      <Modal.Body>
                          <div style={{overflowY: "auto", maxHeight: "740px", maxWidth: "1300px"}}>
                            <b>{appliance_id}</b>
                          </div>
                          <hr />


                          {/* 채팅 메세지 */}
                          <div className="chatting-message">


                          </div>


                          {/* 채팅 메세지 textField */}
                          <div className="chatting-textField">
                            <TextField label="채팅" value={chat} multiline rows={1} variant="outlined" style = {{width: 570}} onChange={handleChange}/>

                            <button onClick={handleSubmit} className="footer-style footer-button-chatting1" varient="primary">
                                <img src={send} id="send" width="30" alt="send"/>
                            </button>
                          </div>
                          
                      </Modal.Body>

                    </div>
                  )}
                      
              </Modal>

          </div>
        )}
        <Chatting />
      </div>
    </div>
  );
};

export default DamnlistDetail;