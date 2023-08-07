import React, { useState } from 'react';
import './Pagination.css';
import Pagination from 'react-js-pagination';
const Paging = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={50}
      pageRangeDisplayed={5}
      prevPageText="‹"
      nextPageText="›"
      onChange={handlePageChange}
    />
  );
};