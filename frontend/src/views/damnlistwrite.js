import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from "axios";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import { styled } from '@mui/system';
import "../assets/css/damnstorywrite.css";
import "../assets/css/damnlistwrite.css";
import Footer from "../components/Footers/Footer";




const Damnlistwrite = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


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
            window.location.href = '/damnlist';
        } else {
            // setIsCancelled(true);
        }
    };


    return (
        <div className="damnstorywritewhole">
            <Header />
            <div className="header">
                <p className="write">구인구직 작성</p>
                <div className="black-line1"></div>
                <div className="damnstorytitle">
                    <p>공고제목</p>
                        <input
                            type="text"
                            className="title-input1"
                            placeholder="공고 제목을 입력해 주세요."
                            value={title}
                            onChange={handleTitleChange}
                        />
                </div>
                <div className="gray-line1"></div>
                <div className="damnlistrecommend">
                    <p>업직종</p>
                    <input
                        type="text"
                        className="title-input"
                        placeholder="업직종을 선택해주세요."
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
            </div>
            
        </div>
    );
};

export default Damnlistwrite;