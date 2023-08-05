import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import "../assets/css/damnstory.css";
import "../components/Footers/Footer";
import Footer from "../components/Footers/Footer";
import damnstorycomment2 from "../assets/img/damnstorycomment2.png";
import damnstorysearchcount2 from "../assets/img/damnstorysearchcount2.png";  

const SectionDataWrite = [ //게시물 더미
    {
        id: 1,
        title: '비오니까 일자리도 없다',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가..',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 1, //댓글 count는 댓글 테이블, 게시물 테이블에서 나머지 가져옴
        seecount: 10
    },

    {
        id: 2,
        title: '이번시간에는 퍼싸아ㅏㅏㅏ드',
        post: '막창 먹고싶다 아니야 그냥 다 먹고싶은거같아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ헤헿',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 7,
        seecount: 90 
    },
    {
        id: 3,
        title: '비오니까 일자리도 없다 ㅡㅇ아아아아 너무 더워',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가가가 가능하나나나나나나',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 6,
        seecount: 90
    },
    {
        id: 4,
        title: '비오니까 일자리도 없다 ㅡㅇ아아아아 너무 더워',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가가가 가능하나나나나나나',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 1,
        seecount: 90
    },
    {
        id: 5,
        title: 'hahaha',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가..',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 1,
        seecount: 90 
    },

    {
        id: 6,
        title: 'pacacacadededed',
        post: '막창 먹고싶다 아니야 그냥 다 먹고싶은거같아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ헤헿',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 3,
        seecount: 90
    },
    {
        id: 7,
        title: '깔깔 일자리도 없다 ㅡㅇ아아아아 너무 더워',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가가가 가능하나나나나나나',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 4,
        seecount: 90
    },
    {
        id: 8,
        title: '비오니까 일자리도 없다 ㅡㅇ아아아아 너무 더워',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가가가 가능하나나나나나나',
        nickname: '전 메디니언', 
        time: '2분전',
        url: '',
        commentcount: 2,
        seecount: 90
    }
];

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
    const [currentPage, setCurrentPage] = useState(1);
    const [clickCount, setClickCount] = useState(0);
    const postsPerPage = 4;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = SectionDataWrite.slice(indexOfFirstPost, indexOfLastPost);

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
                      component={Link} // Use Link from react-router-dom
                      to="/damnstory/register"
                      >글쓰기</Button>
                </div>

                <div className="damnstorycontainer">
                    <div className="damnstorycount">총 n건</div>
                    <div className="damnstorysearch">
                        <input type="text" placeholder="제목+본문 검색" />
                        {/* 작성일, 제목검색 추가하기 */}
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
                                        <p className="annotext">{section.date}</p>
                                    </div>
                                </div>
                                <div className="gray-line1"></div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="damnstoryboard">
                    {currentPosts.map((section, index) => (
                        <a key={index} href={`/${section.url}${section.id}&sortType=CREATED_DATE`} style={sectionStyle}>
                            <div className="damnstoryboardtitle">{section.title}</div>
                            <div className="damnstoryboardcontent">{section.post}</div>
                            <div className="damnstoryboardnickname">

                                <div className="left-content">
                                    {section.nickname} | {section.time}
                                </div>
                                <div className="right-content">
                                    <img className="img1" src={damnstorycomment2}/>
                                    <p>{section.commentcount}</p>
                                    <img className="img2" src={damnstorysearchcount2}/>
                                    <p>{section.seecount}</p>
                                </div>
                            </div>



                            <div className="gray-line1"></div>
                        </a>
                    ))}
                </div>

                <div>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(SectionDataWrite.length / postsPerPage) }).map((_, index) => (
                            <li key={index} className="page-item">
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={() => paginate(index + 1)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Damnstory;