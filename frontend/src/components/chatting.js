import React from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as StompJs from '@stomp/stompjs';
import "../assets/css/Chatting.css";
import { Fab } from '@mui/material';
import FABicon from '../assets/img/chatting-icon.png';
import Modal from "react-bootstrap/Modal";

function Chatting() {

    const [showChat, setShowChat] = useState(false);
    const handleShow = () =>{setShowChat(true)};
    const handleClose = () => {setShowChat(false)};

    const { createProxyMiddleware } = require("http-proxy-middleware");

    const [chatList, setChatList] = useState([]); // 화면에 표시될 채팅 기록
    const { apply_id } = useParams(); // 채널을 구분하는 식별자를 URL 파라미터로 받는다.
    const [chat, setChat] = useState(''); // 입력되는 채팅
    const client = useRef({});

    module.exports = (app) => {
        app.use(
            "/ws",
            createProxyMiddleware({ target: "http://localhost:8787", ws: true })
        ); //
    };

        const connect = () => { // 연결할 때
          client.current = new StompJs.Client({
            brokerURL: 'ws://localhost:8787/ws',
            onConnect: () => {
              subscribe(); // 연결 성공 시 구독하는 로직 실행
            },
        });
          client.current.activate(); // 클라이언트 활성화
        };
        
        const disconnect = () => { // 연결이 끊겼을 때 
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
          
          return () => disconnect();
        }, []);



        const subscribe = () => {
            client.current.subscribe('/sub/chat/' + apply_id, (body) => {
              const json_body = JSON.parse(body.body);
              setChatList((_chat_list) => [
                ..._chat_list, json_body
              ]);
            });
          };

          const publish = (chat) => {
            if (!client.current.connected) return; // 연결되지 않았으면 메시지를 보내지 않는다. 
        
            client.current.publish({
              destination: '/pub/chat',
              body: JSON.stringify({
                applyId: apply_id,
                chat: chat,
              }), // 형식에 맞게 수정해서 보내야 함.
            });
        
            setChat('');
          };

        

    return (
        <div className="chatting-style">
            <Fab onClick={handleShow} size="large" color="warning">
                <img src={FABicon} width="30px"/>
            </Fab>

            <Modal dialogClassName="modal-chatting-style" show={showChat} onHide={handleClose}>
                {(
                    <div className="custom-chatting-content">
                        <Modal.Body>
                            <div>
                                <label className="chatting-label-style"><b>메세지</b></label>
                                <label className="chatting-label-style1" onClick={handleClose}><b>닫기</b></label>

                                {/* 채팅 목록 */}
                                <div>
                                    <div>{chatList}</div>
                                        <form onSubmit={(event) => handleSubmit(event, chat)}>
                                            <div>
                                            <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
                                            </div>
                                            <input type={'submit'} value={'의견 보내기'} />
                                        </form>
                                    </div>

                                </div>
                            {/* <div style={{overflowY: "auto", maxHeight: "740px", maxWidth: "1300px"}}>
                            {requestDamn.map(rowData => (
                        <div key={rowData.damnPublisher}
                            // onClick={() => selectDamn(rowData.damnpostId)}
                            // className={`requestdamn-box ${selectedDamn === rowData.damnpostId ? 'selected' : ''}`}
                            style={{width: "550px", height: "200px", marginTop: "10px", marginBottom: "25px"}}>
                                <div style={{marginLeft: "25px", marginTop: "20px"}}>
                                <b>{erowData.damnTitl}</b>
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
                            </div> */}
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