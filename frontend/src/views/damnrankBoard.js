import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import damnrankDetail from "./damnrankDetail";
import "../assets/css/damnrankBoard.css";
import rank from "../assets/img/damnRank.png";
import man from "../assets/img/damnRank-man-icon.png";
import woman from "../assets/img/damnRank-woman-icon.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DamnrankBoard = () => {

  const [inputData, setInputData] = useState([{
    id: 0,
    name: "",
    score: 0,
    gender: "",
    age: 0,
    badge: "",
    title: "",
    workJob: "",
    address: ""
  }])


  let id = 0;
  let name = "";
  let score = 0;
  let gender = false;
  let age = 0;
  let career = 0;
  let badge = "";
  let title = "";
  let workJob = "";
  let address = "";

  let itemArray = [];
  let itemArrayDetail = [];

    const [show, setShow] = useState(false);   //모달창

    const handleClose = () => {
      setShow(false);   //모달창 닫기
  }

  const handleShow = () =>{ setShow(true)};     //모달창 켜기

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

    const sessionToken = sessionStorage.getItem('token');
    fetchDamnRank()

    function token() {
      console.log("toekeneotken: " + sessionToken);
    }

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
      token()
    
      axios
        .get(`http://localhost:3000/damnrank`, { 
          params: { page }
        })
        .then((res) => {
            console.log(res.data);

            const _inputData = res.data.map((rowData) => ({
              id: rowData.userId,
              name: rowData.name,
              score: rowData.score,
              gender: rowData.gender,
              age: 20,
              badge: "적극 응답",
              title: "적극 응답 @@@",
              workJob: rowData.hopeJob,
              address: rowData.home
            })
            )
            setInputData(_inputData);
            // console.log("***1: ", inputData);

            console.log("인재정보 데이터 받아오기 끝 !");   //적용해야됨
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

  function onClickItem() {
    document.location.href = `/damnrank/${id}/detail`;
  }

    

  return (
    <div>
        <div className="custom-modal-content-rank11">
          <img src={rank} width="35" alt="rank" style={{marginTop: '-10px'}}/>
          <label className="label-margin" style={{zIndex: 1}}><b>인재 랭킹</b></label>
        </div>

        {inputData.map(rowData => (
          <div key={rowData.userId} className="default-filter-rank11">
            <div>
                <span className="label-style111" style={{marginLeft: "30px"}}>
                  <label className="label-style111" style={{zIndex: 1}}><b>경력</b></label>
                  <b>{rowData.career}</b>             
                </span>
                <span className="badge-style" style={{ backgroundColor: getBadgeBackgroundColor(rowData.badge) }}>
                  {rowData.badge}
                </span>
            </div>

            <div>
              <span>
                  <img src={getGenderImage(rowData.gender)} className="gender-image" id="성별" width="70" alt="gender"/>
                  
                    <span className="name-style">
                      <b>{rowData.name}</b>
                      
                      <span className="gender-age">
                          {rowData.gender} {"/ "+ rowData.age}
                        </span>
                    </span>

                    <span className="title-style">
                      <span>
                        <b>{rowData.title}</b>
                        <span className="workjob-style">
                          {rowData.workJob}
                        </span>
                      </span>
                      <span className="address-style">
                        <b>{rowData.address}</b>
                      </span>
                    </span>
                
              </span>
              
            </div>
            
            

          </div>
        ))}
    </div>
  );
};

export default DamnrankBoard;