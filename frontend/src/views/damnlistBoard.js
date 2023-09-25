import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/Footers/Footer";
import { Link } from 'react-router-dom';
import '../assets/css/damnlistBoard.css';
import '@fontsource/inter';
import ReactPaginate from 'react-paginate'; 

const DamnlistBoard = () => {

  useEffect(() => {
    fetchDamnList();
}, []);

const [damnData, setDamnData] = useState([{
  damnpostId: "",
  damnPublisher: "",
  damnTitle: "",
  damnCreated: "",
  damnStart: "",
  damnEnd: "",
  damnBranch: "",
  damnPay: ""
}])

  // 더미
  const boardData = [
    { id: 1, title: '컴포즈커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/15 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: '컴포즈 공릉점', price: 10000 },
    { id: 2, title: '메가커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/08/15 18:00 ~ 2023/08/15 22:00', time: '2023/08/15 18:00', workplace: '메가커피 노원역점', price: 12000 },
    { id: 3, title: '이디아커피 주말 오픈구합니다.(경력무관) ', createdAt: '2023/08/13 07:00 ~ 2023/08/13 12:00', time: '2023/08/13 07:00', workplace: '이디아커피 하계점', price: 10000 },
    { id: 4, title: '새마을식당 하루땜빵. ', createdAt: '2023/08/12 12:00 ~ 2023/08/12 22:00', time: '2023/08/11 15:00', workplace: '새마을식당 노원점', price: 15000 },
    { id: 5, title: '이디아커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/08/11 16:00 ~ 2023/08/11 23:00', time: '2023/07/15 18:00', workplace: 'ABC마트 홍대점', price: 12000 },
    { id: 6, title: 'ABC마트 홍대점 하루 땜빵 구해요. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 2', price: 12000 },
  ];

  function fetchDamnList() {
    const page = 1; 
  
    axios
      .get(`http://localhost:3000/damnlist`, { 
        params: { page }
      })
      .then((response) => {
          console.log("list: ", response.data);

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

          setDamnData(_inputData);
          console.log("damn: ", damnData)
          
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

  const itemsPerPage = 10; // Number of items to display per page
  const totalPages = Math.ceil(boardData.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return boardData.slice(startIndex, startIndex + itemsPerPage);
  };

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

  return (
    <div className="boardlist">

      <div>
            {damnData.map(rowData => (
              <div key={rowData.damnPublisher}
              className="damnitem-box">
                <div style={{marginLeft: "25px", marginTop: "20px"}}>
                  <b>{rowData.damnTitle}</b>
                  <span style={{float: "right", marginRight: "50px"}}>
                  {timeConversion(rowData.damnCreated)}
                    </span>
                </div>

                <div>
                  <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "40px", marginLeft: "40px", fontSize: "15px"}}>근무날짜</label>
                  {timeConversion(rowData.damnStart)} ~ {timeConversion(rowData.damnEnd)}
                </div>
                  <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px", marginRight: "105px"}}>근무지</label>
                    {rowData.damnBranch}
                <div>
                  <label className="content-label-style-profile" style={{zIndex: 1, marginTop: "15px", marginLeft: "40px", fontSize: "15px", marginRight: "120px"}}>시급</label>
                      {rowData.damnPay}
                </div>
                
              </div>
            ))}
            </div>


      {/* Pagination */}
      <div className="pagination">
        {/* "Previous" button */}
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}

        {/* "Next" button */}
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>


      <Footer/>

    </div>
  );
};

export default DamnlistBoard;