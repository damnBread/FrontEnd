import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnstoryDetail.css";
import damnstorycomment2 from "../assets/img/damnstorycomment2.png";
import damnstorysearchcount2 from "../assets/img/damnstorysearchcount2.png";
import Button from "@mui/material/Button";
import Chatting from "../components/chatting";

const sectionStyle = {
  textDecoration: "none",
  color: "black",
};

const DamnstoryDetail = ({ user }) => {
  const { storyid } = useParams();
  const [post, setPost] = useState(null);
  const [commentList, setCommentList] = useState([]); // Initialize commentList as an empty array
  const [currentComment, setCurrentComment] = useState(""); // Initialize currentComment as an empty string

  const sessionToken = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/damnstory/${storyid}`
        );
        console.log(response);
        setPost(response.data);

        // Fetch comments for the post
        const commentsResponse = await axios.get(
          `http://localhost:3000/damnstory/${storyid}/comment`
        );

        if (Array.isArray(commentsResponse.data)) {
          setCommentList(commentsResponse.data);
          console.log("Comments:", commentsResponse.data);
        } else {
          console.error(
            "Comments data is not an array:",
            commentsResponse.data
          );
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, [storyid, user]);

  const handleCommentChange = (event) => {
    setCurrentComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const commentData = {
        content: currentComment,
        createdAt: new Date().toLocaleString(),
      };

      const currentURL = window.location.href;
      const commentEndpoint = `${currentURL}/comment`;

      const response = await axios.post(commentEndpoint, commentData, {
        headers: {
          Authorization: "Bearer " + sessionToken,
        },
      });

      alert("댓글이 등록되었습니다.");
      console.log("Comment submitted:", response.data);
      console.log("commentData", commentData);

      // Update the comments list with the new comment
      setCommentList([...commentList, commentData]);

      // Clear the current comment input
      setCurrentComment("");
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
                  {post.writer} | {post.createDate}
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

              <div className="comment-recycler">
                {commentList.map((commentItem, index) => (
                  <div key={index} className="comment-item">
                    <div className="comment-content">
                      <p>{commentItem.content}</p>
                    </div>
                    <div className="comment-writer">
                      <p>{commentItem.writer}</p>
                      <p>{commentItem.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="comment-section">
                <input
                  type="text"
                  placeholder="댓글을 입력해 주세요."
                  value={currentComment}
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
