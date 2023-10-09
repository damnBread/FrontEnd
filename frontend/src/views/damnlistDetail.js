import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnlistDetail.css";
import "../components/Footers/Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import damnlistworkdate from "../assets/img/damnlistworkdate.png";
import damnlistworkmoney from "../assets/img/damnlistworkmoney.png";
import damnlistworkperiod from "../assets/img/damnlistworkperiod.png";
import damnlistworktime from "../assets/img/damnlistworktime.png";

const sectionStyle = {
  textDecoration: "none",
  color: "black",
};

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toISOString().split("T")[0];
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

const DamnlistDetail = () => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const handleChatClick = () => {
    console.log("chat");
  };

  const handleSupplyClick = () => {
    console.log("지원하기!");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/damnlist/${postid}`)
      .then((response) => {
        // // Initialize KakaoMap
        // const initKakaoMap = () => {
        //   window.kakao.maps.load(() => {
        //     const container = document.getElementById("worklocationkakaomap");
        //     container.style.width = "1000px";
        //     container.style.height = "400px";
        //     const options = {
        //       center: new window.kakao.maps.LatLng(post.location),
        //       level: 3,
        //     };
        //     const map = new window.kakao.maps.Map(container, options);
        //     const markerPosition = new window.kakao.maps.LatLng(post.location);
        //     const marker = new window.kakao.maps.Marker({
        //       position: markerPosition,
        //     });
        //     marker.setMap(map);
        //   });
        // };

        // initKakaoMap();
        if (response.data) {
          const formattedDeadline = formatDate(response.data.deadline);
          response.data.deadline = formattedDeadline;

          const formattedCreatedDate = formatDate(response.data.createdDate);
          response.data.createdDate = formattedCreatedDate;

          const formattedWorkStart = formatDate(response.data.workStart);
          const formattedWorkEnd = formatDate(response.data.workEnd);
          response.data.workStart = formattedWorkStart.date;
          response.data.workEnd = `${formattedWorkStart.time}~${formattedWorkEnd.time}`;

          setPost(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        console.log("Server error response:", error.response.data);
      });
  }, [postid]);

  if (post === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="damnlistdetailwhole">
      <Header />
      <div className="damnlistcontainer">
        {post && (
          <div key={post.damnPublisher} className="damnitem">
            <div className="damnlistdetailcontainer">
              <div className="damndetailcreate">{post.createdDate.date}</div>

              <div className="damnitem-box1">
                <div className="damndetaildeadline">
                  마감일: {post.deadline.date}
                </div>
                <div className="damndetailtitle">{post.title}</div>
                <div className="damndetailbranch">{post.branchName}</div>
                <div className="damndetailwork">
                  <div className="damndetailworkdate">
                    <img
                      src={damnlistworkdate}
                      width="47"
                      height="47"
                      alt="Work Date"
                    />
                    <p className="workdate">근무일</p>
                    <p className="workdate1">{post.workStart}</p>
                  </div>
                  <div className="damndetailworkperiod">
                    <img
                      src={damnlistworkperiod}
                      width="47"
                      height="45"
                      alt="Work Period"
                    />
                    <p className="workperiod">근무기간</p>
                    <p className="workperiod1">하루</p>
                  </div>
                  <div className="damndetailworktime">
                    <img
                      src={damnlistworktime}
                      width="47"
                      height="43"
                      alt="Work Time"
                    />
                    <p className="worktime1">근무시간</p>
                    <p className="worktime2">{post.workEnd}</p>
                  </div>
                  <div className="damndetailworkmoney">
                    <img
                      src={damnlistworkmoney}
                      width="50"
                      height="47"
                      alt="Work Money"
                    />
                    <p className="workmoney1">시급</p>
                    <p className="workmoney2">{post.hourPay}</p>
                  </div>
                </div>
              </div>

              <div className="damnitem-box2">
                <div className="damndetailcondition">
                  <p className="workcondition">모집조건</p>
                </div>
                <div className="damndetailcondition1">
                  <p className="damndetaildeadline">
                    모집 마감:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.deadline.date}
                  </p>
                  <p className="damndetailstudent">
                    학력:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;무관
                  </p>
                </div>
                <div className="damndetailcondition2">
                  <p className="damndetaildeadline">
                    모집 인원:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.recruitNumber}
                  </p>
                  <p className="damndetailstudent">
                    연령:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;무관
                  </p>
                </div>
                <div className="damndetailcondition3">
                  <p className="damndetaildeadline">
                    성별:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.genderLimit ? "남성우대" : "여성우대"}
                  </p>
                  <p className="damndetailstudent">
                    우대사항:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {post.additionalLimit}
                  </p>
                </div>
              </div>
              <div className="damnitem-box3">
                <div className="damndetaillocation">
                  <p className="worklocation">근무지역</p>
                </div>
                <div className="damndetaillocation1">
                  <p className="worklocation1">{post.location}</p>
                  <div
                    className="worklocationkakaomap"
                    id="worklocationkakaomap"
                  ></div>
                </div>
              </div>
            </div>
            <div className="damndetailbutton">
              <div className="damndetailbuttonsuply">
                <Button
                  variant="outlined"
                  sx={{ borderColor: "brown", color: "brown" }}
                  onClick={handleSupplyClick}
                >
                  지원하기
                </Button>
              </div>
              <div className="damndetailbuttonchat">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "brown",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkbrown",
                    },
                  }}
                  onClick={handleChatClick}
                >
                  채팅하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DamnlistDetail;
