import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from 'react-cookie';
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import "../assets/css/damnstory.css";
import "../components/Footers/Footer";
import Footer from "../components/Footers/Footer";
import damnstorycomment2 from "../assets/img/damnstorycomment2.png";
import damnstorysearchcount2 from "../assets/img/damnstorysearchcount2.png";  


const SectionData = [ //공지사항 더미
    {
        title: '공지사항',
        postTitle: '게시물 제목입니다다ㅏㅏㅏ',
        date: '2023-07-29',
        url: 'https://example.com/notice',
      },
      {
        title: '공지사항',
        postTitle: '다른 게시물 제목입니다다ㅏㅏㅏ',
        date: '2023-08-01',
        url: 'https://example.com/another-notice',
      },
];

const sectionStyle = {
    textDecoration: 'none',
    color: 'black',
};

const Damnstory = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/damnstory', {
                    params: {
                      page: 1 // Change this value to the appropriate page number
                    }
                  }) // Replace with the actual endpoint for fetching posts
                console.log(response);
                setPosts(response.data); // Assuming the response contains an array of posts
                console.log(setPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [clickCount, setClickCount] = useState(0);
    const postsPerPage = 4;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const incrementClickCount = () => {
        setClickCount(prevClickCount => prevClickCount + 1);
      };

    return (
        <div className="damnstorywhole">
            <Header />
            <div className="damnstory">
                <div className="header-container">
                    <p>땜빵썰</p>
                    <Button variant="outlined"
                      sx={{ borderColor: "brown",
                      color: "brown",
                     }} 
                      component={Link} //Use Link from react-router-dom
                      to="/damnstory/new"
                      >글쓰기</Button>
                </div>

                <div className="damnstorycontainer">
                    <div className="damnstorycount">총 n건</div>
                    <div className="damnstorysearch">
                        <input type="text" className="title-content-search" placeholder="제목+본문 검색" />
                    </div>
                </div>

                <div className="brown-line1"></div>

                <div className="damnstoryannomain">
                    {SectionData.map((section, index) => (
                        <a key={index} href={section.url} style={sectionStyle}>
                            <div className="damnstoryannowhole">
                                <div className="damnstoryanno" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="leftdamnstoryanno">
                                        <p className="annotext" style={{ whiteSpace: 'nowrap' }}>{section.title}</p>
                                    </div>
                                    <div className="middamnstoryanno" style={{ display: 'flex', justifyContent: 'left', flex: 1 }}>
                                        <p className="annotext" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{section.postTitle}</p>
                                    </div>
                                    <div className="rightdamnstoryanno">
                                        <p className="annotext">{section.createdDate}</p>
                                    </div>
                                </div>
                                <div className="gray-line1"></div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="damnstoryboard">
                    {posts.map(post => (
                        <a key={post.id} href={`/damnstory/${post.id}`} style={sectionStyle}>
                            <div className="damnstoryboardtitle">{post.title}</div>
                            <div className="damnstoryboardcontent">{post.content}</div>
                            <div className="damnstoryboardnickname">

                                <div className="left-content">
                                    {post.nickname} | {post.createdDate}
                                </div>
                                <div className="right-content">
                                    <img className="img1" src={damnstorycomment2}/>
                                    <p>{post.comments}</p>
                                    <img className="imag2" src={damnstorysearchcount2}/>
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
                                    style={{ cursor: 'pointer' }}
                                >
                                </a>
                            </li>

                    </ul>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Damnstory;