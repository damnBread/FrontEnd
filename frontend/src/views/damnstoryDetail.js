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
    textDecoration: 'none',
    color: 'black',
};

const DamnstoryDetail = () => {
    const { storyid } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/damnstory/${storyid}`);
                console.log(response);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [storyid]);


    const [comment, setComment] = useState("");

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        // Implement the logic to submit the comment
        console.log("Comment submitted:", comment);
        // Clear the comment input field
        setComment("");
    };

    return (
        <div className="damnstorydetailwhole">
            <Header />
            <div className="damnstorydetailcontainer">
                <div className="damnstorydetail">
                    {post && ( // Only render if post is not null
                        <div className="damnstorydetail1" style={sectionStyle}>
                            <div className="damnstorydetailtitle">{post.title}</div>
                            <div className="content-container">
                                <div className="left-content1">
                                    gabin | {post.createdDate}
                                </div>
                                <div className="right-content1">
                                    <div className="right-content-item">
                                        <img className="img1" src={damnstorycomment2} alt="Comment"/>
                                        <p>{post.comments}</p>
                                    </div>
                                    <div className="right-content-item">
                                        <img className="img2" src={damnstorysearchcount2} alt="Search Count"/>
                                        <p className="view-count">{post.viewCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="gray-line1"></div>

                            <div className="damnstorydetailcontent">{post.content}</div>

                            <div className="damnstorydetailcomment">
                                <img className="img1" src={damnstorycomment2} alt="Comment"/>
                                <p>{post.comments} 0개</p>
                            </div>

                            <div className="gray-line2"></div>

                            {/* 이 사이에 댓글창 추가하기 */}

                            <div className="comment-section">
                                <input
                                    type="text"
                                    placeholder="제목을 입력해 주세요."
                                    value={comment}
                                    onChange={handleCommentChange}
                                    className="comment-input"
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "brown",
                                        color: "white",
                                        '&:hover': {
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
