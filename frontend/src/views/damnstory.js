import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import "../assets/css/damnstory.css";
import damnstorycomment2 from "../assets/img/damnstorycomment2.png";
import damnstorysearchcount2 from "../assets/img/damnstorysearchcount2.png";
import Chatting from "../components/chatting";
import Footer from "../components/Footers/Footer";

const sectionStyle = {
  textDecoration: "none",
  color: "black",
};

const SectionData = [
  // Dummy data for announcements
  {
    title: "공지사항",
    postTitle: "비속어 사용을 금지합니다.",
    date: "2023-07-29",
    url: "https://example.com/notice",
  },
  {
    title: "공지사항",
    postTitle: "서로를 존중하는 표현 사용 부탁드립니다",
    date: "2023-08-01",
    url: "https://example.com/another-notice",
  },
];

const Damnstory = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:3000/damnstory", {
        params: {
          page: 1,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          console.log("S: ", posts);
        }
        // Check if response.data is not empty before updating state
        if (response.data && response.data.length > 0) {
          setPosts(response.data);
          console.log("Posts updated:", response.data);
        } else {
          console.log("No data found in the response.");
        }
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
  }

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const incrementCommentCount = (postId) => {
    // Find the post by postId and update the comment count
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const incrementViewCount = (postId) => {
    // Find the post by postId and update the view count
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          viewCount: post.viewCount + 1,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  if (posts === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="damnstorywhole">
      <Header />
      <div className="damnstory">
        <div className="header-container">
          <p>땜빵썰</p>
          <Button
            variant="outlined"
            sx={{ borderColor: "brown", color: "brown" }}
            component={Link}
            to="/damnstory/new"
          >
            글쓰기
          </Button>
        </div>

        <div className="damnstorycontainer">
          <div className="damnstorycount">총 n건</div>
          <div className="damnstorysearch">
            <input
              type="text"
              className="title-content-search"
              placeholder="제목+본문 검색"
            />
          </div>
        </div>

        <div className="brown-line1"></div>

        <div className="damnstoryannomain">
          {SectionData.map((section, index) => (
            <a key={index} href={section.url} style={sectionStyle}>
              <div className="damnstoryannowhole">
                <div
                  className="damnstoryanno"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="leftdamnstoryanno">
                    <p className="annotext" style={{ whiteSpace: "nowrap" }}>
                      {section.title}
                    </p>
                  </div>
                  <div
                    className="middamnstoryanno"
                    style={{ display: "flex", justifyContent: "left", flex: 1 }}
                  >
                    <p
                      className="annotext"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {section.postTitle}
                    </p>
                  </div>
                  <div className="rightdamnstoryanno">
                    <p className="annotext">{section.date}</p>
                  </div>
                </div>
                <div className="gray-line1"></div>
              </div>
            </a>
          ))}
        </div>

        <div className="damnstoryboard">
          {posts.map((post) => (
            <a
              key={post.id}
              href={`/damnstory/${post.id}`}
              style={sectionStyle}
              onClick={() => {
                incrementViewCount(post.id);
              }}
            >
              <div className="damnstoryboardtitle">{post.title}</div>
              <div className="damnstoryboardcontent">{post.content}</div>
              <div className="damnstoryboardnickname">
                <div className="left-content">
                  {post.writer} | {post.createdDate}
                </div>
                <div className="right-content">
                  <img className="img1" src={damnstorycomment2} />
                  <p>{post.comments ? post.comments : 0}</p>
                  <img className="img2" src={damnstorysearchcount2} />
                  <p>{post.viewCount}</p>
                </div>
              </div>
              <div className="gray-line1"></div>
            </a>
          ))}
        </div>

        <div>
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                style={{ cursor: "pointer" }}
              ></a>
            </li>
          </ul>
        </div>
      </div>

      <Chatting />
      <Footer />
    </div>
  );
};

export default Damnstory;
