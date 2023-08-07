import React, { useState, useEffect } from 'react';
import Footer from "../components/Footers/Footer";
import { Link } from 'react-router-dom';
import '../assets/css/damnlistBoard.css';
import '@fontsource/inter';
import ReactPaginate from 'react-paginate'; 

const DamnlistBoard = () => {
  // 더미
  const boardData = [
    { id: 1, title: '컴포즈커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 1', price: 10000 },
    { id: 2, title: '메가커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 2', price: 12000 },
    { id: 3, title: '이디아커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 2', price: 12000 },
    { id: 4, title: '이디아커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 2', price: 12000 },
    { id: 5, title: '이디아커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 2', price: 12000 },
    { id: 6, title: '커피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 2', price: 12000 },
    { id: 7, title: '코피 평일마감 하루 경력자 구합니다. ', createdAt: '2023/07/16 18:00 ~ 2023/07/16 22:00', time: '2023/07/15 18:00', workplace: 'Workplace 2', price: 12000 },
  ];

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

  return (
    <div className="boardlist">

      {getCurrentPageItems().map((item) => (
        <div
          key={item.id}
          className={`rectangle rounded-rectangle rounded-rectangle${item.id}`}
          style={{ marginTop: '40px' }}
        > 

          <Link to={`/damnlistdetails/${item.id}`} className="link-no-underline">
            <p className="title" style={{ fontFamily: 'Inter', fontWeight: 'bold'}}>
              {item.title}
            </p>
          </Link>

          <p className="time" style={{ fontFamily: 'Inter', fontWeight: 'bold', float: 'right'}}>
              {item.time}
            </p>

          <p className="worktime" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
            근무시간&nbsp;
            <span style={{ marginLeft: '60px' }}>{item.createdAt}</span>
          </p>

          <p className="workplace" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
            근무장소&nbsp;
            <span style={{ marginLeft: '60px' }}>{item.workplace}</span>
          </p>
          <p className="workprice" style={{ fontFamily: 'Inter', fontWeight: 'bold' }}>
            시급&nbsp;
            <span style={{ marginLeft: '60px' }}>{item.price}</span>
          </p>
        </div>
      ))}


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