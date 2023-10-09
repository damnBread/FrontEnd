import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Headers/Header";
import DamnlistBoard from "./damnlistBoard";
import makeAnimated from "react-select/animated";
import Button from "@mui/material/Button";
import "../assets/css/damnlist.css";
import Chatting from "../components/chatting";

const sectionStyle = {
  textDecoration: "none",
  color: "black",
};

const Damnlist = () => {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/damnlist", {
        params: {
          page: 1,
        },
      })
      .then((response) => {
        console.log("response: ", response);
        if (response.status === 204) {
          console.log("S: ", jobPostings);
        }

        // setJobPostings(response.data);
        // console.log(response);
        // console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("1", error.response.data);
          console.log("2", error.response.status);
          console.log("3", error.response.headers);
        } else if (error.request) {
          console.log("4", error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log("5", error.config);
      });

  }, []);

  return (
    <div className="damnlistwhole">
      <Header />
      <div className="damnlist-container">
        <div className="damnlist">
          <div className="content-wrapper">
            <p>땜빵구해요</p>
          </div>
        </div>

        <div className="damnlistcount">
          <p>총 6건</p>
          <div className="damnlistwrite">
            <Button
              variant="outlined"
              sx={{
                borderColor: "brown",
                color: "brown",
              }}
              component={Link}
              to="/damnlist/new"
            >
              구직구하기
            </Button>
          </div>
        </div>

        <div className="brown-line1"></div>
        <DamnlistBoard/>

        <Chatting />
      </div>
    </div>
  );
};

export default Damnlist;
