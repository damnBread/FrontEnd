import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import "../assets/css/damnrankBoard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DamnrankDetail = () => {
  
    const userid = useParams();

    const [show, setShow] = useState(false);   //모달창

    const handleClose = () => {
      setShow(false);   //모달창 닫기
  }

  const handleShow = () =>{ setShow(true)};     //모달창 켜기

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/damnrank/${userid}/detail`);
            console.log(response);
            
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };
    fetchData();
}, [userid]);
  

  return (

                      <Modal dialogClassName="modal-whole-rank" show={show} onHide={handleClose}>
                                <div>
                                  <Modal.Header>
                                    {/* <div className="scrollable-container">
                                          {rankBoardData
                                            .map((item, index) => (
                                              <div
                                                  key={index}
                                                  className={`custom-modal-box`}
                                              >
                                                  {item.userid}
                                              </div>
                                          ))}
                                        </div> */}
                                  </Modal.Header>
                                    <Modal.Body>

                                        {/* 시/도 */}
                                        <div className="scrollable-container">
                                          {/* {rankBoardData
                                             .map((item, index) => (
                                              <div
                                                  key={index}
                                                  className={`custom-modal-box`}
                                              >
                                                  {item.career}
                                              </div>
                                          ))} */}
                                        </div>
                                    </Modal.Body>

                                  </div>
                                <Modal.Footer>
                                    <Button className="footer-style" varient="primary">
                                        채팅하기
                                    </Button>
                                    <Button className="footer-style" varient="primary">
                                        공고 전달하기
                                    </Button>
                                </Modal.Footer>
                            </Modal>

  );
};

export default DamnrankDetail;