import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnlistDetail.css";
import "../components/Footers/Footer";
import { useParams } from "react-router-dom";

const DamnlistDetail = () => {
  const { postNum } = useParams();

  useEffect(() => {}, []);

  const [damnlistDetailData, setDamnlistDetailData] = useState({
    damnpostId: "",
    damnPublisher: "",
    damnTitle: "",
    damnCreated: "",
    damnStart: "",
    damnEnd: "",
    damnBranch: "",
  });

  function fetchDamnListDetail() {
    const page = 1;

    axios
      .get(`http://localhost:3000/damnlist`)  //detail id 추가하기
  }

  return (
    <div className="damnlistdetailwhole">
      <Header />
      <div className="damnlistdetail">
        <h1>Post Details</h1>
        <p>Post Number: {postNum}</p>
      </div>
    </div>
  );
};

export default DamnlistDetail;
