import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../assets/css/damnrankBoard.css";
import rank from "../assets/img/damnRank.png";
import man from "../assets/img/damnRank-man-icon.png";
import woman from "../assets/img/damnRank-woman-icon.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Moment from 'react-moment';
import {useInterval} from "use-interval";

const DamnrankBoard = () => {

  const [nowTime,setNowTime]=useState(Date.now())

    useInterval(()=>{
        setNowTime(Date.now())
    },1000)

  const [selectedItem, setSelectedItem] = useState(null);

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

  const [show, setShow] = useState(false);   //모달창

  const handleClose = () => {
    setShow(false);   //모달창 닫기
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
            console.log(res.data);

            const _inputData = res.data.map((rowData) => ({
              userid: rowData.userId,
              id: rowData.id,
              name: rowData.name,
              score: rowData.score,
              gender: rowData.gender,
              age: rowData.birth,
              career: 15,
              badge: "적극 응답",
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
        setShow(true)
        axios
            .get(`http://localhost:3000/damnrank/${userid}/detail`, {
              headers: {
                Authorization: "Bearer " + sessionToken
              }
            })
            .then((response) => {
                // console.log(response.data);
                console.log("디테일 완료");
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
  };     //모달창 켜기

  function replaceWorkJob(workJob) {
    const replaceWorkJob = workJob.replaceAll("|", ", ");
    return replaceWorkJob;
  }

  return (
    <div>
        <div className="custom-modal-content-rank11">
          <img src={rank} width="35" alt="rank" style={{marginTop: '-10px'}} />
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
                                <div>
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
                                            </div>
                                          </div>
                                        ))}
                                        </div>
                                    </Modal.Body>

                                  </div>
                                ) : (
                                  <div> </div>
                                )}
                                <Modal.Footer>
                                    <Button className="footer-style" varient="primary">
                                        채팅하기
                                    </Button>
                                    <Button className="footer-style" varient="primary">
                                        공고 전달하기
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                </div>
            
          </div>

          
        ))}
    </div>
  );
};

export default DamnrankBoard;