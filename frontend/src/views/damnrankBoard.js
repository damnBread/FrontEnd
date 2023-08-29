import React, { useState } from "react";
import "../assets/css/damnrankBoard.css";
import rank from "../assets/img/damnRank.png";
import man from "../assets/img/damnRank-man-icon.png";
import woman from "../assets/img/damnRank-woman-icon.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DamnrankBoard = () => {
    // 더미
    const rankBoardData = [
      { id: 1, name: "장O호", gender: "여", age: 23, career: "1년 3개월", badge: "적극 응답", title: "적응이 빠른 훌륭한 인재입니다.", workjob: '서빙', address: "경기도 양주시"},
      { id: 2, name: "남O빈", gender: "여", age: 23, career: "2년 9개월", badge: "약속 철저", title: "지각을 해본 적 없는 인재입니다.", workjob: '카페', address: "서울시 은평구"},
      { id: 3, name: "손O산", gender: "남", age: 25, career: "1년 8개월", badge: "따뜻한 인재", title: "적응이 빠른 훌륭한 인재입니다.", workjob: '판매', address: "서울시 노원구"},
      { id: 4, name: "오O아", gender: "여", age: 23, career: "2년 5개월", badge: "적극 응답", title: "지각을 해본 적 없는 인재입니다.", workjob: '서빙, 카페', address: "서울시 노원구"}
    ];

    const [show, setShow] = useState(false);   //모달창

    const handleClose = () => {
      setShow(false);   //모달창 닫기
  }

  const handleShow = () =>{ setShow(true)};     //모달창 켜기

    const itemsPerPage = 10; // Number of items to display per page
    const totalPages = Math.ceil(rankBoardData.length / itemsPerPage); // Calculate total pages
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected + 1);
    };

    const getCurrentPageItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return rankBoardData.slice(startIndex, startIndex + itemsPerPage);
    };

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
        case '여':
          return woman;
        case '남':
          return man;
        default:

      }
    }

  return (
    <div>
        <div className="custom-modal-content-rank11">
          <img src={rank} width="35" alt="rank" style={{marginTop: '-10px'}}/>
          <label className="label-margin" style={{zIndex: 1}}><b>인재 랭킹</b></label>
        </div>

        {getCurrentPageItems().map((item) => (
          <div key={item.id} className="default-filter-rank11" onClick={handleShow}>
            <div>
                <span className="label-style111" style={{marginLeft: "30px"}}>
                  <label className="label-style111" style={{zIndex: 1}}><b>경력</b></label>
                  <b>{item.career}</b>             
                </span>
                <span className="badge-style" style={{ backgroundColor: getBadgeBackgroundColor(item.badge) }}>
                  {item.badge}
                </span>
            </div>

            <div>
              <span>
                  <img src={getGenderImage(item.gender)} className="gender-image" id="성별" width="70" alt="woman"/>
                  
                    <span className="name-style">
                      <b>{item.name}</b>

                      <Modal dialogClassName="modal-whole-rank" show={show} onHide={handleClose}>
                                <div>
                                    <Modal.Body>

                                        {/* 시/도 */}
                                        <div className="scrollable-container">
                                          {rankBoardData
                                            .filter((rankItem) => rankItem.id === item.id)
                                            .map((item, index) => (
                                              <div
                                                  key={index}
                                                  className={`custom-modal-box`}
                                              >
                                                  {item.id}
                                              </div>
                                          ))}
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


                      <span className="gender-age">
                          {item.gender} {"/ "+ item.age}
                        </span>
                    </span>

                    <span className="title-style">
                      <span>
                        <b>{item.title}</b>
                        <span className="workjob-style">
                          {item.workjob}
                        </span>
                      </span>
                      <span className="address-style">
                        <b>{item.address}</b>
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