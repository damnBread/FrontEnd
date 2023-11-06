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


function Chatting() {

    const [showChat, setShowChat] = useState(false);
    const handleShowChat = () =>{setShowChat(true)};
    const handleCloseChat = () => {setShowChat(false)};


    const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
    const [chat, setChat] = useState(''); // 입력되는 채팅
    const client = useRef({});

    const [appliance_id, setAppliance_id] = useState(0);  // 지원자 id
    const [publisher_id, setPublisher_id] = useState(0);  // 의뢰인 id

    const sessionToken = sessionStorage.getItem('token');

    const [chatData, setChatData] = useState([{         // 채팅방 리스트
            room_id: 0,
            post: 0,
            user_appliance: 0,
            user_publisher: 0
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
          destination: '/pub/chat/' + appliance_id + "/" + publisher_id,
          body: JSON.stringify({
            chat: chat,
            publisher_id: publisher_id,
            appliance_id: appliance_id
          }),
        });
    
        setChat('');
      };
    
      const subscribe = () => {
        client.current.subscribe('/sub/chat/' + appliance_id + "/" + publisher_id, (body) => {
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
                console.log("re: ", response.data);
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
                        room_id: 0,
                        post: 0,
                        user_appliance: 0,
                        user_publisher: 0
                      }))
          
                      setChatData(_inputData);
                }
            })
            .catch((error) => {
                console.log("er: ", error);
            })
      }
        

    return (
        <div className="chatting-style">
            <Fab onClick={handleShowChat} size="large" color="warning">
                <img src={FABicon} width="30px"/>
            </Fab>

            <Modal dialogClassName="modal-chatting-style" show={showChat} onHide={handleCloseChat}>
                {(
                    <div className="custom-chatting-content">
                        <Modal.Body>
                            <div>
                                <label className="chatting-label-style"><b>메세지</b></label>
                                
                                <label className="chatting-label-style1" onClick={handleCloseChat}><b>닫기</b></label>

                                <label className="chatting-label-style1" style={{marginRight: "20px"}} onClick={handleCloseChat}><b>새 채팅</b></label> 

                                {/* 채팅 목록 */}
                                {(
                                    <div style={{overflowY: "auto", marginRight: "10px"}}>
                                    {chatData.map(rowData => (
                                      <div  key={rowData.room_id}
                                      className="chatting-content-box">
                                        <div style={{marginLeft: "25px", marginTop: "20px"}}>
                                          <b>{rowData.post}</b>
                                          
                                        </div>

                                      </div>
                                    ))}
                                  </div>

                                  
                                  
                                )}


                                {/* 채팅 메세지 보내는 창 */}
                                {/* <div>
                                    <div>{chatList}</div>
                                        <form onSubmit={(event) => handleSubmit(event, chat)}>
                                            <div>
                                            <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
                                            </div>
                                            <input type={'submit'} value={'의견 보내기'} />
                                        </form>
                                    </div>*/}

                                </div>
                        </Modal.Body>

                    </div>
                    )}
                    {/* <Modal.Footer>
                        <Button className="footer-style" varient="primary">
                            전달하기
                        </Button>
                    </Modal.Footer> */}
                </Modal>

        </div>

    );
}

export default Chatting;