import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnstoryDetail.css";
import "../components/Footers/Footer";
import damnstorycomment2 from "../assets/img/damnstorycomment2.png";
import damnstorysearchcount2 from "../assets/img/damnstorysearchcount2.png";
import Button from "@mui/material/Button";

const sectionStyle = {
  textDecoration: "none",
  color: "black",
};

const DamnstoryDetail = ({ user }) => {
  const { storyid } = useParams();
  const [post, setPost] = useState(null);
  const [writerName, setWriterName] = useState("");

  const sessionToken = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/damnstory/${storyid}`
        );
        console.log(response);
        setPost(response.data);

        let writerResponse;

        if (response.data.writer) {
          const writerId = response.data.writer;
          console.log("Writer", writerId);

          writerResponse = await axios.get(
            `http://localhost:3000/user/${writerId}`
          );
          if (writerResponse.status === 200) {
            setWriterName(writerResponse.data.nickname);
            console.log("nickname", writerResponse.data.nickname);
          } else if (writerResponse.status === 404) {
            console.log("User not found");
            // Handle the case where the user is not found
          } else {
            console.error("Error fetching user:", writerResponse.status);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, [storyid, user]);

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const commentData = {
        content: comment,
        Date: new Date().toISOString(),
      };

      const currentURL = window.location.href; //현재의 url을 의미
      const commentEndpoint = `${currentURL}/comment`;

      console.log("1124", commentData);

      const response = await axios.post(commentEndpoint, commentData, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      alert("댓글이 등록되었습니다.");
      console.log("Comment submitted:", response.data);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="damnstorydetailwhole">
      <Header />
      <div className="damnstorydetailcontainer">
        <div className="damnstorydetail">
          {post && (
            <div className="damnstorydetail1" style={sectionStyle}>
              <div className="damnstorydetailtitle">{post.title}</div>
              <div className="content-container">
                <div className="left-content1">
                  {post.writerName} | {post.createDate}
                </div>
                <div className="right-content1">
                  <div className="right-content-item">
                    <img
                      className="img1"
                      src={damnstorycomment2}
                      alt="Comment"
                    />
                    <p>{post.comments}</p>
                  </div>
                  <div className="right-content-item">
                    <img
                      className="img2"
                      src={damnstorysearchcount2}
                      alt="Search Count"
                    />
                    <p className="view-count">{post.viewCount}</p>
                  </div>
                </div>
              </div>
              <div className="gray-line1"></div>

              <div className="damnstorydetailcontent">{post.content}</div>

              <div className="damnstorydetailcomment">
                <img className="img1" src={damnstorycomment2} alt="Comment" />
                <p>{post.comments} 0개</p>
              </div>

              <div className="gray-line2"></div>

              {/* 이 사이에 댓글창 추가하기 */}
              <div className="comment-recycler">
                <div className="commentlist">
                  {Array.isArray(comment) &&
                    comment.map((comment, index) => (
                      <div key={index} className="comment-item">
                        <p>{comment.content}</p>
                        <p>{comment.Date}</p>
                      </div>
                    ))}
                  <div className="gray-line2"></div>
                </div>
              </div>

              <div className="comment-section">
                <input
                  type="text"
                  placeholder="댓글을 입력해 주세요."
                  value={comment}
                  onChange={handleCommentChange}
                  className="comment-input"
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "brown",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "darkbrown",
                    },
                  }}
                  onClick={handleCommentSubmit}
                >
                  등록
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DamnstoryDetail;
