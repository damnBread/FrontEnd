import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from "axios";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
import "../assets/css/damnstorywrite.css";
import Footer from "../components/Footers/Footer";

const DamnStoryWrite = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isCancelled, setIsCancelled] = useState(false);

    const handleTitleChange = (event) => {
        const maxLength = 30;
        const inputValue = event.target.value;

        if (inputValue.length <= maxLength) {
            setTitle(inputValue);
        }
    };

    const handleContentChange = (event) => {
        const maxLength = 2000;
        const inputValue = event.target.value;

        if (inputValue.length <= maxLength) {
            setContent(inputValue);
        }
    };

    const handleCancelClick = () => {
        const result = window.confirm('글 작성을 취소하시겠습니까?\n작성된 내용은 저장되지 않습니다');
        if (result) {
            window.location.href = '/damnstory';
        } else {
            setIsCancelled(true);
        }
    };


    const handleRegisterClick = async () => {

        if (!title || !content) {
            alert('제목과 내용을 작성해주세요.');
        }
        else if(!title) {
            alert('제목을 입력해주세요.');
        }
        else if(!content) {
            alert('내용을 입력해주세요');
        }
        else {
            try {
                
                // const cookies = new Cookies();
                // const token = cookies.get('token'); // Get token from cookies

                const sessionToken = sessionStorage.getItem('token');
                console.log("SSSSS: " + sessionToken);

                console.log("click regist");
                console.log("title: ", title);
                console.log("content: ", content);
                
    
                const response = await axios.post(
                    'http://localhost:3000/damnstory/new',
                    {
                        title: title,
                        content: content,
                        // writerId: writerId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionToken}`,
                        },
                    }
                );
    
                console.log(response);
                console.log("title: ", response.data.title);
    
                if (response.status === 200) {
                    sessionStorage.setItem("title", title);
                    sessionStorage.setItem("content", content);
                    alert('글이 작성되었습니다.'); //작성 성공, db잘들어감. get으로 가져와야함

                    window.location.href = '/damnstory'; // Redirect to the main page
                } else {
                    alert('글 작성 중 오류1가 발생했습니다.');
                }
            } catch (error) {
                console.error('Error creating post:', error);
                alert('글 작성 중 오류2가 발생했습니다.');
            }
        }
        
    };
    


    return (
        <div className="damnstorywritewhole">
            <Header />
            <div className="header">
                <p className="write">땜빵썰 작성</p>
                <div className="black-line1"></div>
                <div className="damnstorytitle">
                    <p>제목</p>
                    <input
                        type="text"
                        className="title-input"
                        placeholder="제목을 입력해 주세요."
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="gray-line1"></div>

                <div className="damnstorycontent">
                    <p>내용</p>
                    <input
                        type="text"
                        className="content-input"
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <div className="gray-line1"></div>

                <div className="cancel-regist">
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "brown",
                            color: "brown",
                            '&:hover': {
                                backgroundColor: "darkbrown",
                            },
                        }}
                        onClick={handleCancelClick}
                    >
                        취소
                    </Button>

                    <span className="button-spacing"></span>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "brown",
                            color: "white",
                            '&:hover': {
                                backgroundColor: "darkbrown",
                            },
                        }}
                        onClick={handleRegisterClick}
                    >
                        등록
                    </Button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DamnStoryWrite;
