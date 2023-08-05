import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import "../assets/css/damnstorywrite.css";
import Footer from "../components/Footers/Footer";

const damnstorywrite = () => {
    return (
        <div className="damnstorywritewhole">
            <Header/>
            <div className="header">
                <p className="write">땜빵썰 작성</p>
                <div className="black-line1"></div>
                <div className="damnstorytitle">
                    <p>제목</p>
                    <input type="text" className="title-input" placeholder="제목을 입력해 주세요."/>
                </div>

            </div>
            
        </div>

    );
};

export default damnstorywrite;