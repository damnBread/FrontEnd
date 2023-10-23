import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom"; // Import Link and useHistory
import "../assets/css/damnlistBoard.css";
import "@fontsource/inter";
import ReactPaginate from "react-paginate";

const sectionStyle = {
  textDecoration: "none",
  color: "black",
};

const DamnlistBoard = () => {
  const history = useHistory(); // Create history object for navigation
  const sessionToken = sessionStorage.getItem('token');

  useEffect(() => {
    fetchDamnList();
  }, []);

  const [damnData, setDamnData] = useState([
    {
      damnpostId: "",
      damnPublisher: "",
      damnTitle: "",
      damnCreated: "",
      damnStart: "",
      damnEnd: "",
      damnBranch: "",
      damnPay: "",
    },
  ]);

  function fetchDamnList() {
    const page = 1;

    axios
      .get(`http://localhost:3000/damnlist`, {
        params: { page },
        headers: {
          Authorization: "Bearer " + sessionToken
        }}
      )
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
          damnPay: rowData.hourPay,
        }));

        setDamnData(_inputData);
        console.log("damn: ", damnData);
      })
      .catch((error) => {
        // Handle errors here
      });
  }

  const timeConversion = (time) => {
    if (typeof time !== "string") {
      return "Invalid input";
    }

    const timecv = time.split("T");
    if (timecv.length !== 2) {
      return "Invalid input";
    }

    const timecv1 = timecv[1].split(".");
    if (timecv1.length !== 2) {
      return "Invalid input";
    }

    const timecv2 = timecv1[0].split(":");

    const time1 = timecv[0] + " " + timecv2[0] + ":" + timecv2[1];
    return time1;
  };

  return (
    <div className="boardlist">
      <div>
        {damnData.map((rowData) => (
          <div key={rowData.damnPublisher} className="damnitem-box">
            <Link
              to={`/damnlist/${rowData.damnpostId}`}
              className="custom-link"
            >
              <div style={{ marginLeft: "25px", marginTop: "20px" }}>
                <b>{rowData.damnTitle}</b>
                <span style={{ float: "right", marginRight: "50px" }}>
                  {timeConversion(rowData.damnCreated)}
                </span>
              </div>
              <div>
                <label
                  className="content-label-style-profile"
                  style={{
                    zIndex: 1,
                    marginTop: "40px",
                    marginLeft: "40px",
                    fontSize: "15px",
                  }}
                >
                  근무날짜
                </label>
                {timeConversion(rowData.damnStart)} ~{" "}
                {timeConversion(rowData.damnEnd)}
              </div>
              <label
                className="content-label-style-profile"
                style={{
                  zIndex: 1,
                  marginTop: "15px",
                  marginLeft: "40px",
                  fontSize: "15px",
                  marginRight: "105px",
                }}
              >
                근무지
              </label>
              {rowData.damnBranch}
              <div>
                <label
                  className="content-label-style-profile"
                  style={{
                    zIndex: 1,
                    marginTop: "15px",
                    marginLeft: "40px",
                    fontSize: "15px",
                    marginRight: "120px",
                  }}
                >
                  시급
                </label>
                {rowData.damnPay}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DamnlistBoard;
