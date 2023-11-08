import React from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/Chatting.css";
import { Fab } from '@mui/material';
import FABicon from '../assets/img/chatting-icon.png';
import Modal from "react-bootstrap/Modal";
import * as StompJs from '@stomp/stompjs';
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import send from "../assets/img/send.png"


function Chatting() {

    const [showChat, setShowChat] = useState(false);
    const handleShowChat = () =>{setShowChat(true)};
    const handleCloseChat = () => {setShowChat(false)};

    const [showChatRoom, setShowChatRoom] = useState(false);
    const handleShowChatRoom = () => {setShowChatRoom(true); getChatMessage();};
    const handleCloseChatRoom = () => {setShowChatRoom(false)};

    const [roomId, setRoomId] = useState(0);


    const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
    const [chat, setChat] = useState(''); // 입력되는 채팅
    const client = useRef({});

    const [appliance_id, setAppliance_id] = useState(0);  // 지원자 id
    const [publisher_id, setPublisher_id] = useState(0);  // 의뢰인 id

    const sessionToken = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem("idNum");

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

    const connect = () => {
        client.current = new StompJs.Client({
          brokerURL: 'ws://localhost:8080/ws',
          onConnect: () => {
            console.log('success');
            subscribe();
          },
        //   connectHeaders: { // 이 부분 새로 추가
        //     Authorization: "Bearer " + sessionToken,
        //   },
        });
        client.current.activate();
      };

      const publish = (chat) => {
        if (!client.current.connected) return;
    
        client.current.publish({
          destination: '/pub/chat',
          body: JSON.stringify({
            chat: chat,
            sender: publisher_id,
            receiver: appliance_id
          }),
        });
    
        // setChat('');
      };
    
      const subscribe = () => {
        client.current.subscribe('/sub/chat/' + userId, (body) => {
          const json_body = JSON.parse(body.body);
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
    
      const handleSubmit = (event, chat) => { // 보내기 버튼 눌렀을 때 publish
        event.preventDefault();
    
        publish(chat);
      };
      
      useEffect(() => {
        connect();
        getChatList();
    
        return () => disconnect();
      }, []);

      function getChatList() {
        axios
            .get(`http://localhost:3000/chatlist`, {
              headers: {
                Authorization: "Bearer " + sessionToken
              }
            })
            .then((response) => {
                if (response.data.size === 0) {
                    Swal.fire({
                        icon: "warning",
                        title: "경고",
                        text: "아직 채팅방이 없습니다. 채팅을 시작해주세요.",
                        showCancelButton: true,
                        confirmButtonText: "확인",
                        cancelButtonText: "취소",
                        width: 800,
                        height: 100,
                    }).then((res) => {
                    });
                } else {
                    console.log("rere: ", response.data);
                    const _inputData = response.data.map((setData) => ({
                        id: setData.id,
                        user_appliance_id: setData.user_appliance_id,
                        user_publisher_id: setData.user_publisher_id
                      }))
          
                      setChatData(_inputData);
                }
            })
            .catch((error) => {
                console.log("er: ", error);
            })
      }
        
      function selectId(user_publisher_id) {
        // console.log("userID:: ", typeof(userId))  // -> String
        // console.log("userPub:: ", typeof(user_publisher_id))  // -> number
        if (user_publisher_id.toString() === userId) {  // 나 -> 게시자
            return true;
        } else {                             // 나 -> 지원자
            return false;
        }
      }

      function selectRoomId(room_id, publisher_id, appliance_id) {
        console.log("room_id:: ", room_id);
        console.log("pub:: ", publisher_id);
        console.log("appl:: ", appliance_id);
        setRoomId(room_id);
        setPublisher_id(publisher_id);
        setAppliance_id(appliance_id);
      }


      function getChatMessage() {
        axios
        .get(`http://localhost:3000/chatlist/enter`,{
          params: {
            roomId: roomId
          }
        } ,{
          headers: {
            Authorization: "Bearer " + sessionToken
          }
        })
        .then((response) => {
            console.log("message: ", response.data);
            const _inputData = response.data.map((mdata) => ({
                chatId: mdata.chatId,
                chatRoomId: mdata.chatRoomId,
                content: mdata.content,
                date: mdata.date,
                read: mdata.read,
                receiver: mdata.receiver,
                sender: mdata.sender
            }))

            setMessageData(_inputData);
            
        })
        .catch((error) => {
            console.log("message error: ", error);
        })
      }

      function getMessage(receiver) {
        console.log("usreID:: ", (userId));
        console.log("message Re:: ", (receiver));
        if (receiver.toString() === userId) {
          return true;
        } else {
          return false;
        }

      }


    return (
        <div className="chatting-style">
            <Fab onClick={handleShowChat} size="large" color="warning">
                <img src={FABicon} width="30px"/>
            </Fab>

            {/* 채팅 목록 모달창 */}
            <Modal dialogClassName="modal-chatting-style" show={showChat} onHide={handleCloseChat}>
                {(
                    <div className="custom-chatting-content">
                        <Modal.Body>
                            <div>
                                <label className="chatting-label-style"><b>메세지</b></label>
                                
                                <label className="chatting-label-style1" onClick={handleCloseChat}><b>닫기</b></label>

                                <label className="chatting-label-style1" style={{marginRight: "20px"}}><b>새 채팅</b></label> 

                                <div>
                                
                                {(
                                        <div style={{overflowY: "auto", marginRight: "10px"}}>
                                        {chatData.map(rowData => (
                                        <div key={rowData.id}
                                            onClick={() => {
                                              handleShowChatRoom();
                                              selectRoomId(rowData.id, rowData.user_publisher_id, rowData.user_appliance_id);
                                            }}
                                            className="chatting-content-box">
                                              <div style={{marginLeft: "25px", marginTop: "20px"}}>
                                                  <b>{selectId(rowData.user_publisher_id) === true ? rowData.user_appliance_id : rowData.user_publisher_id}</b>
                                              
                                              </div>

                                            </div>
                                            ))}
                                        </div>

                                        )}
                                    </div>
                                </div>
                        </Modal.Body>
                    </div>
                    )}
                </Modal>

                {/* 채팅방 모달창 */}
                <Modal dialogClassName="modal-whole-rank1" show={showChatRoom} onHide={handleCloseChatRoom}>
                                            {(
                                    <div className="custom-rank-content" style={{overflowY: "auto"}}>
                                        <Modal.Body>
                                             <div style={{overflowY: "auto", maxHeight: "740px", maxWidth: "1300px"}}>
                                                  {/* <b>{selectMessageId(rowData.receiver) === true ? rowData.sender : rowData.sender}</b> */}
                                              </div>
                                              <hr />
                                        
                                            {/* 채팅 메세지 */}
                                            {(
                                                <div style={{overflowY: "auto", marginRight: "10px"}}>
                                                {messageData.map(rowData => (
                                                  <div key={rowData.chatId}
                                                 className={`message-box ${getMessage(rowData.receiver) === true ? "left-message" : "right-message"}`}>
                                                    <div>
                                                        {rowData.content}
                                                    </div>

                                                    </div>
                                                    ))}
                                                </div>

                                                
                                                
                                          )}


                                            {/* 채팅 메세지 textField */}
                                            <div className="chatting-textField">
                                                <TextField label="채팅" value={chat} multiline rows={1} variant="outlined" style = {{width: 570}} onChange={handleChange}/>

                                                <button onClick={handleSubmit} className="footer-style footer-button-chatting" varient="primary">
                                                    <img src={send} id="send" width="30" alt="send"/>
                                                </button>
                                            </div>
                                            
                                        </Modal.Body>

                                        </div>
                                    )}
                                        
                                </Modal>

        </div>

    );
}

export default Chatting;