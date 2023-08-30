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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';




const Damnlistwrite = () => {

    const [title, setTitle] = useState(""); //공고제목
    const [content, setContent] = useState(""); //공고 내용
    const [job, setJob] = useState(""); //업직종
    const [branchName, setBranchName] = useState(""); //지점명
    const [location, setLocation] = useState(""); //근무지 주소(지번)
    const [hourPay, setHourPay] = useState(""); //시급
    const [payMethod, setPayMethod] = useState("") //임금 지급 방법
    const [workStart, setWorkStart] = useState("");
    const [workFinish, setWorkFinish] = useState("");
    const [workPeriod, setWorkPeriod] = useState(""); //근무 기간(Date)
    const [deadline, setDeadline] = useState("");

    //추천 추가하기
    const [count, setCount] = useState(""); //모집명수
    const [isChecked, setIsChecked] = useState(false); 
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

    const handleJobChange = (event) => {
        setJob(event.target.value);
    };

    const handleCancelClick = () => {
        const result = window.confirm('글 작성을 취소하시겠습니까?\n작성된 내용은 저장되지 않습니다');
        if (result) {
            window.location.href = '/damnlist';
        } else {
            setIsCancelled(true);
        }
    };

    const handlechoosebutton = () => {
        console.log(`추가된 업직종: ${title}`);
    };

    const handleCountChange = (event) => {
        setCount(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleStartDateChange = (date) => {
        setWorkStart(date);
      };
    
      const handleEndDateChange = (date) => {
        setWorkFinish(date);
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
                const cookies = new Cookies();
                const token = cookies.get('token');
                
                if (workStart && workFinish) {
                    const oneDay = 24 * 60 * 60 * 1000; // 1일의 밀리초
                    const startDate = new Date(workStart);
                    const endDate = new Date(workFinish);
                    const daysDiff = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
                    setWorkPeriod(daysDiff);
                }

                const newJobData = {
                    branchName: branchName, // Get the value from state
                    location: location, // Get the value from state
                    // Add other fields as needed
                    title: title,
                    content: content,
                    publisher: "gabinTest4", // Replace with actual publisher ID
                    hourPay: hourPay,
                    payMethod: payMethod,
                    workPeriod: workPeriod,
                    deadline: deadline,
                    count: count,
                };


                console.log("click regist");
                console.log("title: ", title);
                console.log("content: ", content);
                console.log("token: ", token);
                
    
                const response = await axios.post(
                    'http://localhost:3000/damnlist/new',
                    newJobData, //배열에 넣어서 보냄

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                console.log(response);
                console.log("title: ", response.data.title);
    
                if (response.status === 201) {
                    const newJobId = response.data; // This should be the new post's ID
                    sessionStorage.setItem("title", title);
                    sessionStorage.setItem("content", content);
                    alert('글이 작성되었습니다.');
    
                    // Redirect to the main page or wherever you need
                    window.location.href = '/damnlist';
                }  else {
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
                <div className="damnstorytitle">
                    <p>내용</p>
                    <input
                        type="text"
                        className="content-input"
                        placeholder="내용을 입력하세요."
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <div className="gray-line1"></div>
                <div className="damnlistrecommend">
                    <p>업직종</p>
                    <input
                        type="text"
                        className="title-input"
                        placeholder="업직종을 선택해주세요."
                        value={job}
                        onChange={handleJobChange}
                    />
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "brown",
                      color: "brown",
                    }}
                  >
                    선택
                  </Button>
                </div>
                <div className="damnlistjobbrand">
                    <p className="job-title-recommend">
                    입력한 제목을 바탕으로 <span>업직종</span>을 추천드립니다</p>

                    <p className="job-title-recommend2">
                    입력한 제목을 바탕으로 <span>브랜드</span>을 추천드립니다</p>
                </div>
                <div className="gray-line1"></div>

                <div className="damnlistworkperiod">
                    <p>근무기간</p>
                    <div className="damnlistcalander">

                    </div>
                </div>

                <div className="gray-line1"></div>

                <div className="damnlistworktime">
                    <p>모집인원</p>
                    <input
                            type="text"
                            className="count-input1"
                            placeholder="숫자만 입력."
                            value={count}
                            onChange={handleCountChange}
                        />
                    <p>명</p>
                    <label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        친구와 함께 근무 가능
                    </label>
                </div>
                <div className="gray-line1"></div>
                <div className="damnlistage">
                    <p>성별, 연령, 학력</p>
                    <p className="damnlist-age-controller">성별무관, 연령무관, 학력무관</p>
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
            <Footer/>
            
        </div>
    );
};

export default Damnlistwrite;