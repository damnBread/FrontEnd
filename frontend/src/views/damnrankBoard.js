import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "../assets/css/damnrankBoard.css";
import rank from "../assets/img/damnRank.png";
import man from "../assets/img/damnRank-man-icon.png";
import woman from "../assets/img/damnRank-woman-icon.png";
import send from "../assets/img/send.png"
import Modal from "react-bootstrap/Modal";
import {useInterval} from "use-interval";
import Chatting from "../components/chatting.js";
import { TextField } from "@material-ui/core";
import * as StompJs from '@stomp/stompjs';

const DamnrankBoard = () => {

  const [nowTime,setNowTime]=useState(Date.now())

    useInterval(()=>{
        setNowTime(Date.now())
    },1000)

  const history = useHistory();

  const [selectedItem, setSelectedItem] = useState(null);
  
  const [selectedDamn, setSelectedDamn] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [inputData, setInputData] = useState([{
    userid: 0,
    id: "",
    name: "",
    score: 0,
    gender: "",
    age: 0,
    career: 0,
    badge: "",
    title: "",
    workJob: "",
    address: ""
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
    damnPay: ""
  }])

  const [chatData, setChatData] = useState([{         // 채팅방 리스트
    id: 0,
    user_appliance_id: 0,
    user_publisher_id: 0
}])

  const [messageData, setMessageData] = useState([{
    chatId: 0,
    chatRoomId: 0,
    content: "",
    date: "",
    read: false,
    receiver: 0,
    sender: 0
}])

const [chattingRoom, setChattingRoom] = useState(0);

  const [show, setShow] = useState(false);   //모달창

  const [showShare, setShowShare] = useState(false); //공고 전달하기 모달창

  const [showChat, setShowChat] = useState(false);  //채팅 시작 모달창

  const handleClose = () => {
    setShow(false);   //모달창 닫기
  }

  const handleShareClose = () => {
    setShowShare(false);   //공고 전달하기 모달창 닫기
  }

  const handleChatClose = () => {
    setShowChat(false);   //채팅 시작 모달창 닫기
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

    function getGender(gender) {
      switch(gender) {
        case false:
          return "여";
        case true:
          return "남";
        default:
          
      }
    }

    function getName(name) {
      const changedName = name.replaceAll(name[1], "O");
      return changedName;
    }

    const sessionToken = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('idNum');

    useEffect(() => {
      fetchDamnRank();
  }, []);

    // const itemsPerPage = 10; // Number of items to display per page
    // const totalPages = Math.ceil(itemArrayDetail.length / itemsPerPage); // Calculate total pages
    // const [currentPage, setCurrentPage] = useState(1);

    // const handlePageChange = (selectedPage) => {
    //   setCurrentPage(selectedPage.selected + 1);
    // };

    // const getCurrentPageItems = () => {
    //   const startIndex = (currentPage - 1) * itemsPerPage;
    //   return itemArrayDetail.slice(startIndex, startIndex + itemsPerPage);
    // };

    const page = 1; 

    function fetchDamnRank() {
      const page = 1; 
    
      axios
        .get(`http://localhost:3000/damnrank`, { 
          params: { page }
        })
        .then((res) => {
            console.log("Res: ", res.data);

            const _inputData = res.data.map((rowData) => ({
              userid: rowData.userId,
              id: rowData.id,
              name: rowData.name,
              score: rowData.score,
              gender: rowData.gender,
              age: rowData.birth,
              career: rowData.careerCnt,
              badge: rowData.badge,
              title: rowData.introduce,
              workJob: rowData.hopeJob,
              address: rowData.home
            })
            )

            setInputData(_inputData);
            
        })
        .catch((error) => {
          if (error.response) {
            console.log("1", error.response.data);
            console.log("2", error.response.status);
            console.log("3", error.response.headers);
          } else if (error.request) {
            console.log("4", error.request);
          } else {
            console.log('Error: ', error.message);
          }
          console.log("5", error.config);
        });
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

  const handleShow = (userid) =>{
      if (!show) {
        const selectedData = inputData.find((item) => item.id === userid);
        setSelectedItem(selectedData);

        if (selectedItem.userid === userId) {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
          setShow(true)
          axios
              .get(`http://localhost:3000/damnrank/${userid}/detail`, {
                headers: {
                  Authorization: "Bearer " + sessionToken
                }
              })
              .then((response) => {
                  console.log("SDS:: ",response.data);
                  console.log("디테일 완료"); 
                  setAppliance_id(response.data.userId);
                  setPublisher_id(userId);
                  console.log("상대방:: ", response.data.userId, " 나;; ", userId)

                
                    axios
                        .get(`http://localhost:3000/chatlist`, {
                          headers: {
                            Authorization: "Bearer " + sessionToken
                          }
                        })
                        .then((response) => {
                            console.log("rere rank: ", response.data);
                            const _inputData = response.data.map((setData) => ({
                                id: setData.id,
                                user_appliance_id: setData.user_appliance_id,
                                user_publisher_id: setData.user_publisher_id
                              }))
                          
                              setChatData(_inputData);

                              console.log("Publisher:: ", typeof(publisher_id), " Appliance:: ", typeof(appliance_id))

                              const matchingChat = chatData.find(item => item.user_publisher_id === parseInt(publisher_id, 10) && item.user_appliance_id === appliance_id);

                                if (matchingChat) {
                                    console.log('Found matching chat:', matchingChat);
                                    console.log("matching data:: ", matchingChat.id);
                                    setChattingRoom(matchingChat.id);
                                  } else {
                                    // No matching chat found
                                    console.log('No matching chat found');
                                  }
                              
                            
                        })
                        .catch((error) => {
                            console.log("er: ", error);
                        })
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
      }
  };     //모달창 켜기

  function replaceWorkJob(workJob) {
    const replaceWorkJob = workJob.replaceAll("|", ", ");
    return replaceWorkJob;
  }

   //내가 의뢰한 땜빵 GET
   function requestDamnbread() {
    if (!showShare) {
      setShowShare(true);
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
              damnStart: rowData.workStart,
              damnEnd: rowData.workEnd,
              damnBranch: rowData.branchName,
              damnPay: rowData.hourPay
            })
            )
            setRequestDamn(_inputData);
              
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
        }       

        
        const timeConversion = (time) => {
          if (typeof time !== 'string') {
            return 'Invalid input';
          }
        
          const timecv = time.split('T');
          if (timecv.length !== 2) {
            return 'Invalid input';
          }
        
          const timecv1 = timecv[1].split('.');
          if (timecv1.length !== 2) {
            return 'Invalid input';
          }

          const timecv2 = timecv1[0].split(':');
        
          const time1 = timecv[0] + ' ' +  timecv2[0] + ":" + timecv2[1];
          return time1;
        };

        function selectDamn(post_id) {
           setSelectedDamn(post_id);
           console.log("DD: ", selectedDamn);
        }

        const [appliance_id, setAppliance_id] = useState(0);  // 지원자

        const [publisher_id, setPublisher_id] = useState(0);  // 게시자
      
        const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
        let [chat, setChat] = useState('');         // 입력되는 채팅
        const client = useRef({});

        // 채팅
        function chatting() {
          setShowChat(true);
          getChatMessage(chattingRoom);
        }
      
        const connect = () => {
          client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
              console.log('success');  // 얘는 맨 처음에만 연결
              subscribe();  // 구독 ..
            },
            // connectHeaders: { // 이 부분 새로 추가
            //   Authorization: "Bearer " + sessionToken,
            // },
          });
          client.current.activate();
        };
      
        const publish = (chat) => {
          if (!client.current.connected) return;

          console.log("Chat:: ", chat, " sender:: ", appliance_id, " receiver:: ", publisher_id)
      
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
      
          publish(chat);  // 채팅 보내기 누르면 실행

        };
        
        useEffect(() => {
          connect();
      
          return () => disconnect();
        }, []);
      
        function getChatMessage(room_id) {
          axios
          .get(`http://localhost:3000/chatlist/enter`,{
            params: {
              roomId: room_id
            }
          } ,{
            headers: {
              Authorization: "Bearer " + sessionToken
            }
          })
          .then((response) => {
              console.log("message: ", response.data);
              const _inputData = response.data.map((mdata) => ({
                  chatId: mdata.chat,
                  chatRoomId: mdata.chatRoomId,
                  content: mdata.content,
                  date: dateToSimpleDate(mdata.date),
                  read: mdata.read,
                  receiver: mdata.receiver,
                  sender: mdata.sender
              }))
  
              _inputData.sort((a, b) => a.date.localeCompare(b.date));
            
              setMessageData(_inputData);
            
          })
          .catch((error) => {
              console.log("message error: ", error);
          })
        }
  
        function getMessage(receiver) {
          if (receiver.toString() === userId) {
            return true;
          } else {
            return false;
          }
        }
  
        function getMessageRead(read) {
          if(read === false) {
            return false;
          } else {
            return true;
          }
        }
  
         function dateToSimpleDate(date) {
            const simpleDate = (date||'').split("T");
            const simple1 = simpleDate[0];                // 2023-11-07
            const simple2 = simpleDate[1].split(".")[0];  // 05:34:10
            const simple3 = simple2.split(":")[0] + ":" + simple2.split(":")[1];
            const result = simple1 + " " + simple2; // 2023-11-07 05:34:12
            return result;
        }
      

        

  return (
    <div>
        <div className="custom-modal-content-rank11">
          <img src={rank} width="35" alt="rank" style={{marginTop: '-10px', marginLeft: "140px"}} />
          <label className="label-margin" style={{zIndex: 1}}><b>인재 랭킹</b></label>
        </div>

        {inputData.map(rowData => (
          <div key={rowData.userid}
             onClick={() => handleShow(rowData.id)}
             className="default-filter-rank11">
            <div>
                <span className="label-style111" style={{marginLeft: "30px"}}>
                  <label className="label-style111" style={{zIndex: 1, marginLeft: "15px"}}><b>땜빵 경력 {rowData.career}회</b></label>         
                </span>
                <span className="badge-style" style={{ backgroundColor: getBadgeBackgroundColor(rowData.badge) }}>
                  {rowData.badge}
                </span>
            </div>

            <div>
              <span>
                  <img src={getGenderImage(rowData.gender)} className="gender-image" id="성별" width="70" alt="gender"/>
                    <span className="name-style">
                      <b>{getName(rowData.name)}</b>
                      
                      <span className="gender-age">
                          {getGender(rowData.gender)} {"/ "+ birthToAge(rowData.age) + "세"}
                        </span>
                    </span>

                    <span className="title-style">
                      <span>
                        <b>{rowData.title}</b>
                        <span className="workjob-style">
                          {replaceWorkJob(rowData.workJob)}
                        </span>
                      </span>
                      <span className="address-style">
                        <b>{rowData.address}</b>
                      </span>
                    </span>
                
              </span>
              
              <Modal dialogClassName="modal-whole-rank" show={show} onHide={handleClose}>
                {selectedItem ? (
                                <div className="custom-rank-content">
                                    <Modal.Body>
                                        <div className="scrollable-container">
                                        {inputData
                                          .filter((item) => (item.id) === (selectedItem.id))
                                          .map(rowData => (
                                            <div key={selectedItem.id}>
                                                <div>
                                                  <span className="label-style111" style={{marginLeft: "30px"}}>
                                                    <label className="label-style111" style={{zIndex: 1, fontSize: "22px", marginLeft: "10px", marginTop: "10px", marginBottom: "20px"}}>
                                                    <b>땜빵 경력 {selectedItem.career}회</b>  </label>           
                                                  </span>
                                                  {/* <span className="badge-style" style={{ backgroundColor: getBadgeBackgroundColor(selectedItem.badge) }}>
                                                    {selectedItem.badge}
                                                  </span> */}
                                              </div>

                                              <div>
                                                <span>
                                                    <img src={getGenderImage(selectedItem.gender)} className="gender-image" id="성별" width="120" alt="gender"/>
                                                    
                                                      <span className="name-style" style={{fontSize: "25px", marginLeft: "50px"}}>
                                                        <b>{getName(selectedItem.name)}</b>

                                                        <span className="title-style" style={{fontSize: "18px", marginTop: "15px", marginLeft: "2px"}}>
                                                          {selectedItem.title}
                                                        </span>
                                                        
                                                      </span>

                                                        <span>
                                                          <span className="gender-age" style={{fontSize: "17px", marginLeft: "65px"}}>
                                                            {getGender(selectedItem.gender)} {"/ "+ birthToAge(rowData.age) + "세"}
                                                          </span>
                                                          
                                                  
                                                        </span>
                                                          <div style={{marginTop: "30px", marginLeft: "40px"}}>
                                                            <label><b>거주 지역</b></label>
                                                          </div>
                                                          <div>
                                                            <div className="selectedItemAddress-style">{selectedItem.address}</div>

                                                          </div>

                                                          <div style={{marginTop: "40px", marginLeft: "40px"}}>
                                                            <label><b>희망 업/직종</b></label>
                                                          </div>
                                                          <div>
                                                            <div className="selectedItemAddress-style">{replaceWorkJob(selectedItem.workJob)}</div>
                                                          </div>
                                                      </span>

                                                      <div>
                                                        {/* 땜빵 이력 자리 */}
                                                      </div>
                                            </div>
                                          </div>
                                        ))}
                                        </div>

                                        <div className="footer-button">
                                          <button className="footer-style footer-button-chatting" disabled={isButtonDisabled ? false : true} varient="primary" onClick={() => chatting()}>
                                              채팅하기
                                          </button>
                                          <button className="footer-style footer-button-share" disabled={isButtonDisabled ? false : true} varient="primary" onClick={() => requestDamnbread()}>
                                              공고 전달하기
                                          </button>
                                        </div>
                                        
                                    </Modal.Body>

                                  </div>
                                ) : (
                                  <div> </div>
                                )}

                                
                            </Modal>

                            {/* 채팅하기 */}
                            <Modal dialogClassName="modal-whole-rank1" show={showChat} onHide={handleChatClose}>
                              {(
                                  <div className="custom-rank-content" style={{overflowY: "auto"}}>
                                      <Modal.Body>
                                          <div style={{overflowY: "auto", maxHeight: "740px", maxWidth: "1300px"}}>
                                            <b>{appliance_id}</b>
                                          </div>
                                          <hr />


                                          {/* 채팅 메세지 */}
                                           {(
                                                <div className="chatting-message">
                                                {messageData.map(rowData => (
                                                  <div key={rowData.chatId}>
                                                      <div className={`message-box ${getMessage(rowData.receiver) === true ? "left-message" : "right-message"}`}>
                                                          <b>{rowData.content}</b>
                                                          
                                                      </div>
                                                      <span className={`chatting-date-style ${getMessage(rowData.receiver) === true ? "chatting-date-left" : "chatting-date-right"}`}>
                                                          {getMessage(rowData.receiver) === false ? (
                                                            <span className={`${getMessageRead(rowData.read) === false ? "chatting-read-style1" : "chatting-read-style"}`}>
                                                              {getMessageRead(rowData.read) === false ? 1 : ""}
                                                            </span>
                                                          ) : null}
                                                          {(rowData.date)}
                                                          {getMessage(rowData.receiver) === true ? (
                                                            <span className={`${getMessageRead(rowData.read) === false ? "chatting-read-style" : "chatting-read-style1"}`}>
                                                              {getMessageRead(rowData.read) === false ? 1 : ""}
                                                            </span>
                                                          ) : null}
                                                        </span>

                                                        
                                                    </div>
                                                    
                                                    ))}
                                                </div>

                                                
                                                
                                          )}



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
                            

                            {/* 공고 전달하기 */}
                            <Modal dialogClassName="modal-whole-rank1" show={showShare} onHide={handleShareClose}>
                            {(
                                <div className="custom-rank-content">
                                    <Modal.Body>
                                        <div style={{overflowY: "auto", maxHeight: "740px", maxWidth: "1300px"}}>
                                        {requestDamn.map(rowData => (
                                      <div key={rowData.damnpostId}
                                        onClick={() => selectDamn(rowData.damnpostId)}
                                        className={`requestdamn-box ${selectedDamn === rowData.damnpostId ? 'selected' : ''}`}
                                        style={{width: "550px", height: "200px", marginTop: "10px", marginBottom: "25px", backgroundColor: "#FFFFFF"}}>
                                            <div style={{marginLeft: "25px", marginTop: "20px"}}>
                                              <b>{rowData.damnTitle}</b>
                                            </div>

                                            <div>
                                              <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "20px", marginLeft: "40px", fontSize: "15px"}}>근무날짜</label>
                                              {timeConversion(rowData.damnStart)} ~ {timeConversion(rowData.damnEnd)}
                                            </div>
                                              <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "10px", marginLeft: "40px", fontSize: "15px", marginRight: "105px"}}>근무지</label>
                                                {rowData.damnBranch}
                                            <div>
                                              <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "10px", marginLeft: "40px", fontSize: "15px", marginRight: "120px"}}>시급</label>
                                                  {rowData.damnPay}
                                            </div>
                                          </div>
                                        ))}
                                        </div>

                                        <button className="footer-style footer-button-share1" varient="primary">
                                          공고 전달하기
                                        </button>
                                    </Modal.Body>

                                  </div>
                                )}
                                    
                            </Modal>
                </div>
            
          </div>

          
        ))}
        <Chatting/>
    </div>
  
  );
};

export default DamnrankBoard;