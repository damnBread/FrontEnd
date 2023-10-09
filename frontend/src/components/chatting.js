import React from "react";
import { useState } from "react";
import "../assets/css/Chatting.css";
import { Fab } from '@mui/material';
import FABicon from '../assets/img/chatting-icon.png';
import Modal from "react-bootstrap/Modal";

function Chatting() {

    const [showChat, setShowChat] = useState(false);

    const handleShow = () =>{ setShowChat(true) };

    const handleClose = () => { setShowChat(false) }

    function onClickChatting() {
        console.log("CLICK FAB");
        
    }

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