import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'
import "../assets/css/damnrankBoard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DamnrankDetail = () => {
  
    const { userid } = useParams();

    const [userDetails, setUserDetails] = useState({});

    const [show, setShow] = useState(false);   //모달창

    const handleClose = () => {
      setShow(false);   //모달창 닫기
  }

  const handleShow = () =>{ 
    axios
        .get(`http://localhost:3000/damnrank/${userid}/detail`)
        .then((response) => {
            console.log(response.data);
            setUserDetails(response.data); // Set user details
            console.log("디테일");
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
        setShow(true)
  };     //모달창 켜기

//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3000/damnrank/${userid}/detail`);
//             console.log(response);
            
//         } catch (error) {
//             console.error('Error fetching post:', error);
//         }
//     };
//     fetchData();
// }, [userid]);
  

  return (

                      <Modal dialogClassName="modal-whole-rank" show={show} onHide={handleClose}>
                                <div>
                                  <Modal.Header>
                                      <strong>Username:</strong> {userDetails.username}
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