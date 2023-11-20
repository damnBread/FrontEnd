import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom"; // Import Link and useHistory
import "../assets/css/Page1Header.css";

const Page1Header = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  //땜빵 리스트 가져오기(마감임박, 최신, 추천, 근처땜빵)
  //받아와야할것: damnBranch(rowData.branchName), damnLocation(rowData.location), damnPay(rowData.hourPay)

  const sessionToken = sessionStorage.getItem("token");

  useEffect(() => {
    fetchDamnList();
  }, []);

  const [damnData, setDamnData] = useState([
    //최신 data
    {
      damnpostId: "",
      damnBranch: "",
      damnLocation: "",
      damnPay: "",
    },
  ]);

  function fetchDamnList() {
    const page = 1;

    axios
      .get(`http://localhost:3000/damnlist`, {
        params: { page },
        headers: {
          Authorization: "Bearer " + sessionToken,
        },
      })
      .then((response) => {
        console.log("list: ", response.data);

        const _inputData = response.data.map((rowData) => ({
          damnpostId: rowData.postId,
          damnBranch: rowData.branchName,
          damnLocation: rowData.location,
          damnPay: rowData.hourPay,
        }));
        setDamnData(_inputData);
        console.log("damn: ", damnData);
      })
      .catch((error) => {
        //error handler
      });
  }

  return (
    <div className="damnhomeelement-whole">
      <div className="damnhome-recent">
        <p>안녕하세요</p>
      </div>
    </div>
  );
};

export default Page1Header;
