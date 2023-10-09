import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnlistDetail.css";
import "../components/Footers/Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const sectionStyle = {
  textDecoration: "none",
  color: "black",
};

const formatDate = (dateString) => {
  //날짜 분리하기
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toISOString().split("T")[0];
  return formattedDate;
};

const DamnlistDetail = () => {
  const sessionToken = sessionStorage.getItem('token');
  const userId = sessionStorage.getItem('idNum');

  const [activeApplyBtn, setActiveApplyBtn] = useState(true);
  const [activeChattingBtn, setActiveChattingBtn] = useState(true);

  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const handleChatClick = () => {
    //채팅하기 클릭시
    console.log("chat");
  }

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
        if (res.isConfirmed) {  //확인을 클릭할 경우 -> axios
          axios
          .post(`http://localhost:3000/damnlist/${postid}/apply`, {
            postNum : postid
          },
          {headers: {
            Authorization: "Bearer " + sessionToken
          }})
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
          .catch((error)=>{
            if(error.response.status === 400) {  //올바르지 않은 게시물 정보
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
            if(error.response.status === 401) {  //헤더 인증 
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
            if(error.response.status === 409) {  //이미 지원한 경우
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
          })
      }
    });
  }


  useEffect(() => {
    axios
      .get(`http://localhost:3000/damnlist/${postid}`)
      .then((response) => {
        console.log("data1", response.data);
        const formattedDeadline = formatDate(response.data.deadline); //날짜 변환
        response.data.deadline = formattedDeadline;

        const formattedcreatedDate = formatDate(response.data.createdDate);
        response.data.createdDate = formattedcreatedDate;
        setPost(response.data);

        console.log("pub: ", response.data.publisher)
        console.log("userId: ", userId)

        console.log("pub1: ", typeof(response.data.publisher).toString());
        console.log("userId1: ", typeof(userId))
        console.log("SS: ", response.data.publisher.toString() === userId)
        if (response.data.publisher.toString() === userId) {
            setActiveApplyBtn(false);
            setActiveChattingBtn(false);
        } else {
            setActiveApplyBtn(true);
            setActiveChattingBtn(true);
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
        {setPost && (
          <div key={setPost.damnPublisher} className="damnitem">
            <div className="damnlistdetailcontainer">
              <div className="damndetailcreate">{post.createdDate}</div>

              <div className="damnitem-box1">
                <div className="damndetaildeadline">
                  마감일: {post.deadline}
                </div>
                <div className="damndetailtitle">{post.title}</div>
                <div className="damndetailbranch">{post.branchName}</div>
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
