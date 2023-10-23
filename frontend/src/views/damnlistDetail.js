import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnlistDetail.css";
import "../components/Footers/Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import damnlistworkdate from "../assets/img/damnlistworkdate.png";
import damnlistworkmoney from "../assets/img/damnlistworkmoney.png";
import damnlistworkperiod from "../assets/img/damnlistworkperiod.png";
import damnlistworktime from "../assets/img/damnlistworktime.png";
import damnlistscrap from "../assets/img/damnlistscrap.png";
import damnlistscrapclick from "../assets/img/damnlistscrapclick.png";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const getCoordinatesFromAddress = async (address) => {
  const apiKey = "AIzaSyBSAd6eYUYY8l9LV9eY8FXiJXAPU6zPDCk";
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  if (response.data.results.length > 0) {
    const location = response.data.results[0].geometry.location;
    return location;
  } else {
    return null;
  }
};

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleDateString().split("T")[0];
  return formattedDate;
};

const DamnlistDetail = () => {
  const sessionToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("idNum");

  const [activeApplyBtn, setActiveApplyBtn] = useState(true);
  const [activeChattingBtn, setActiveChattingBtn] = useState(true);

  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const [scrapimageSrc, scrapsetImageSrc] = useState(damnlistscrap);
  const [scrapisClicked, scrapsetIsClicked] = useState(false); // 클릭 여부를 state로 관리

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const scarphandleClick = () => {
    if (scrapisClicked) {
      scrapsetImageSrc(damnlistscrap);
      scrapsetIsClicked(false);
      console.log("false");
    } else {
      scrapsetImageSrc(damnlistscrapclick);
      scrapsetIsClicked(true);
      console.log("true");
    }
    scrapsetIsClicked(!scrapisClicked); // Toggle the clicked state
  };

  const handleChatClick = () => {
    console.log("chat");
  };

  const handleSupplyClick = () => {
    //지원하기 클릭시
    Swal.fire({
      icon: "warning",
      title: "땜빵 지원",
      text: "지원하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      width: 800,
      height: 100,
    }).then((res) => {
      if (res.isConfirmed) {
        //확인을 클릭할 경우 -> axios
        axios
          .post(
            `http://localhost:3000/damnlist/${postid}/apply`,
            {
              postNum: postid,
            },
            {
              headers: {
                Authorization: "Bearer " + sessionToken,
              },
            }
          )
          .then((response) => {
            console.log("지원하기 완료");
            Swal.fire({
              icon: "success",
              title: "땜빵 지원",
              text: "지원이 완료되었습니다. 마이페이지에서 확인할 수 있습니다.",
              showCancelButton: false,
              confirmButtonText: "확인",
              width: 800,
              height: 100,
            }).then((res) => {});
          })
          .catch((error) => {
            if (error.response.status === 400) {
              //올바르지 않은 게시물 정보
              Swal.fire({
                icon: "warning",
                title: "경고",
                text: "올바르지 않은 게시물입니다. 다시 확인해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
              }).then((res) => {});
            }
            if (error.response.status === 401) {
              //헤더 인증
              Swal.fire({
                icon: "warning",
                title: "경고",
                text: "로그인이 필요한 서비스입니다. 로그인 해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
              }).then((res) => {});
            }
            if (error.response.status === 409) {
              //이미 지원한 경우
              Swal.fire({
                icon: "warning",
                title: "경고",
                text: "이미 지원한 공고입니다. 마이페이지에서 확인해보세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
              }).then((res) => {});
            }
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/damnlist/${postid}`)
      .then((response) => {
        if (response.data) {
          console.log("1111", response.data);
          const formattedDeadline = formatDate(response.data.deadline);
          response.data.deadline = formattedDeadline;

          const formattedCreatedDate = formatDate(response.data.createdDate);
          response.data.createdDate = formattedCreatedDate;

          const formattedWorkStart = formatDate(response.data.workStart);
          const formattedWorkEnd = formatDate(response.data.workEnd);
          response.data.workStart = formattedWorkStart.date;
          response.data.workEnd = `${formattedWorkStart.time}~${formattedWorkEnd.time}`;

          getCoordinatesFromAddress(response.data.location)
            .then((coordinates) => {
              if (coordinates) {
                setLocation(coordinates);
              } else {
                console.error("Error geocoding the address");
              }
            })
            .catch((error) => {
              console.error("Error fetching coordinates:", error);
            });

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
                  <span>마감일: {post.deadline.date}</span>
                  <div className="damndeatailscrap">
                    <img
                      src={scrapimageSrc}
                      width="47"
                      height="47"
                      alt="Work Scrap"
                      onClick={scarphandleClick}
                    />
                  </div>
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
                  >
                    {/* kakaomap */}
                    <Map
                      center={location}
                      style={{
                        width: "1000px",
                        height: "500px",
                        borderRadius: "10px",
                      }}
                      level={3}
                    >
                      <MapMarker position={location}>{post.location}</MapMarker>
                    </Map>
                  </div>
                </div>
              </div>
            </div>
            <div className="damndetailbutton">
              <div className="damndetailbuttonsuply">
                <Button
                  variant="outlined"
                  sx={{ borderColor: "brown", color: "brown" }}
                  onClick={handleSupplyClick}
                  disabled={activeApplyBtn ? false : true}
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
                  disabled={activeChattingBtn ? false : true}
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
