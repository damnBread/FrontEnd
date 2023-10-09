import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnlistDetail.css";
import "../components/Footers/Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

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
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  const handleChatClick = () => {
    //채팅하기 클릭시
    console.log("chat");
  }

  const handleSupplyClick = () => {
    //지원하기 클릭시
    console.log("지원하기!");
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
