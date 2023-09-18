import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookies } from 'react-cookie';
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnstorywrite.css";
import "../assets/css/damnlistwrite.css";
import Footer from "../components/Footers/Footer";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import Button from "@mui/material/Button";
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import Modal from "react-modal";


const StyledSelect = styled.select`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
    margin: 10px;
`;

const initialGenderLimit = "성별무관"; 
const initialAgeLimit = "연령무관"; 
const initialCareerLimit = "경력무관";

const Damnlistwrite = () => {
    
    const [title, setTitle] = useState(""); //공고제목
    const [content, setContent] = useState(""); //공고 내용
    const [job, setJob] = useState(""); //업직종
    const [branchName, setBranchName] = useState(""); //지점명
    const [location, setLocation] = useState(""); //근무지 주소(지번)
    const [hourPay, setHourPay] = useState(""); //시급
    const [payMethod, setPayMethod] = useState("") //임금 지급 방법
    const [workStart, setWorkStart] = useState(new Date());
    const [workFinish, setWorkFinish] = useState(new Date());
    const [workPeriod, setWorkPeriod] = useState(1); //근무 기간(Date)
    const [deadline, setDeadline] = useState("");


    const [isChecked, setIsChecked] = useState(false); 
    const [isCancelled, setIsCancelled] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [isDaumPostcodeOpen, setIsDaumPostcodeOpen] = useState(false); // Daum 주소 검색 모달 열림 여부


    const [genderLimit, setGenderLimit] = useState(initialGenderLimit);
    const [ageLimit, setAgeLimit] = useState(initialAgeLimit);
    const [careerLimit, setCareerLimit] = useState(initialCareerLimit);

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

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleCountChangeMoney = (event) => {
        setHourPay(event.target.value);
    };

    const handleworkPeriod = (event) => {
        setWorkPeriod(event.target.value);
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleStartDateChange = (event) => {
        setWorkStart(event.target.value);
        if (event.target.value > workFinish) {
            setWorkFinish(event.target.value);
        }
      };
    
    const handleEndDateChange = (event) => {
        if (event.target.value >= workStart) {
            setWorkFinish(event.target.value);
        }
      };


      const handleModalOpen = () => { //경력, 나이, 성별 모달창, 왜 안열리냐
        console.log('Modal open button clicked');
        setModalOpen(true);
      };

      const handleModalClose = () => {
        setModalOpen(false);
      };
    
      const handleSelection = (gender, age, career) => {
        setGenderLimit(gender);
        setAgeLimit(age);
        setCareerLimit(career);
        handleModalClose();
      };


      const handleAddressChange = (e) => {
        setLocation(e.target.value);
      };
    
      const handleOpenDaumPostcode = () => {
        setIsDaumPostcodeOpen(true);
      };
    
      const handleComplete = (data) => {
        setLocation(data.address); // 선택한 주소를 상태에 저장
        setIsDaumPostcodeOpen(false); // 모달 닫기
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
                // const token = cookies.get('token');

                const sessionToken = sessionStorage.getItem('token');
                console.log("SSSSS: " + sessionToken);


                //이런식으로 post 해야함
                // const newJobData = {
                //     branchName: branchName,
                //     location: location,
                //     hourPay: parseInt(hourPay), // Convert to integer
                //     payMethod: payMethod, // Should be a Boolean (true/false)
                //     job: [job], // Convert to an array with a single element
                //     workStart: new Date(workStart), // 시작, 끝일 같음 / 하루만 일하기 때문
                //     workFinish: new Date(workFinish), // 
                //     workPeriod: parseInt(workPeriod), // 
                //     title: title,
                //     content: content,
                //     deadline: new Date(deadline), // Convert to a Date object
                //     genderLimit: genderLimit, // Should be a Boolean (true/false)
                //     ageLimit: {
                //       max: ageLimitMax, // Add age limit max
                //       min: ageLimitMin, // Add age limit min
                //     },
                //     careerLimit: parseInt(careerLimit), // Convert to integer
                //   };
                
                let newJobData = {
                    title: title,
                    content: content,
                    job: [job], //배열에 넣어서 보낼것
                    location: location, //값 넣기
                    hourPay: parseInt(hourPay),
                    payMethod: payMethod, //true, false
                    deadline: new Date(deadline), //값 넣기
                    workPeriod: workPeriod,
                    workStart: workStart, //시작, 끝시간을 Date로 보내야함, 바꿔야함
                    workFinish: workFinish,
                    genderLimit: genderLimit,
                    ageLimit: {
                        min: 20, // Set the selected minimum age
                        max: 30, // Set the selected maximum age
                    },
                    careerLimit: 0,
                };

                //추가해야할것
                //모집 마감일,
                //성별, 연령, 경력 형식 바꾸기


                console.log("click regist");
                console.log("title: ", title);
                console.log("content: ", content);
                console.log("token: ", sessionToken);
                
    
                const response = await axios.post(
                    'http://localhost:3000/damnlist/new',
                    newJobData, //배열에 넣어서 보냄

                    {
                        headers: {
                            Authorization: `Bearer ${sessionToken}`,
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
                        placeholder="업직종을 입력해주세요."
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


                <div className="damnlistlocation">
                    <p>위치정보</p>
                    <input
                        type="text"
                        className="location-input"
                        value={location}
                        onChange={handleAddressChange}
                    />
                    
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "brown",
                            color: "brown",
                            '&:hover': {
                                backgroundColor: "darkbrown",
                            },
                            marginLeft:"10px",
                            marginBottom:"20px"
                        }}
                        onClick={handleOpenDaumPostcode}
                    >
                        주소입력
                    </Button>
                    <Modal isOpen={isDaumPostcodeOpen} 
                        onRequestClose={() => setIsDaumPostcodeOpen(false)}
                        style={{
                            content: {
                              width: '50%', // 원하는 가로 크기로 설정
                              height: '50%', // 원하는 세로 크기로 설정
                              margin: 'auto', // 가운데 정렬
                            },
                          }}
                        >
                                    <button
                                        onClick={handleComplete}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            cursor: 'pointer',
                                        }}
                                        >
                                        X
                                        </button>
                        <DaumPostcode
                            onComplete={handleComplete}
                            autoClose
                        />
                    </Modal>
                </div>


                <div className="gray-line1"></div>

                <div className="damnlistworktime">
                    <p>시간급여</p>
                    <input
                            type="text"
                            className="count-input"
                            placeholder="숫자만 입력."
                            value={hourPay}
                            onChange={handleCountChangeMoney}
                        />
                    <p>원</p>
                    <label>
                        <input
                        type="checkbox"
                        checked={payMethod === true}
                        onChange={() => setPayMethod(true)}
                        />
                        의뢰인 직접 지급
                    </label>
                    <label>
                        <input
                        type="checkbox"
                        checked={payMethod === false}
                        onChange={() => setPayMethod(false)}
                        />
                        당일 현장 지급
                    </label>

                </div>

                <div className="gray-line1"></div>

                <div className="damnlistworktime">
                    <p>모집마감일</p>
                    <div className="damnlistworktime1">
                        <input
                                type="date"
                                id="deadline"
                                name="deadline"
                                value={deadline}
                                onChange={handleDeadlineChange}
                                style={{
                                    width: "130px",
                                    height: "40px",
                                    marginTop: "0px",
                                    borderColor: "#E7E6E6",
                                    fontSize: "15px",
                                    borderRadius: "10px",
                                    padding: ".5em",
                                }}
                            />
                    </div>
                </div>

                <div className="gray-line1"></div>

                <div className="damnstorytitle">
                    <p>근무기간(하루)</p>
                    <div className="damnlistcalander">
                        <p>날짜</p>
                        <input
                            type="date"
                            id="workPeriod"
                            name="workPeriod"
                            value={workPeriod}
                            onChange={handleworkPeriod}
                            style={{
                                width: "130px",
                                height: "40px",
                                marginTop: "0px",
                                borderColor: "#E7E6E6",
                                fontSize: "15px",
                                borderRadius: "10px",
                                padding: ".5em",
                            }}
                        />
                    </div>
                    <div className="damnlistworkstart">
                        <div className="start-end-time">
                            <div className="starttime">
                                <p>시작시간</p>
                                <input
                                    type="time"
                                    value={workStart}
                                    onChange={handleStartDateChange}
                                    style={{
                                        width: "130px",
                                        height: "40px",
                                        marginTop: "0px",
                                        borderColor: "#E7E6E6",
                                        fontSize: "15px",
                                        borderRadius: "10px",
                                        padding: ".5em",
                                    }}
                                />
                            </div>
                            <div className="endtime">
                                <p>끝시간</p>
                                <input
                                    type="time"
                                    value={workFinish}
                                    onChange={handleEndDateChange}
                                    style={{
                                        width: "130px",
                                        height: "40px",
                                        marginTop: "0px",
                                        borderColor: "#E7E6E6",
                                        fontSize: "15px",
                                        borderRadius: "10px",
                                        padding: ".5em",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="gray-line1"></div>

                <div className="damnlistage">
                    <p>성별, 연령, 학력</p>
                    <p className="damnlist-age-controller">
                        {genderLimit ? '남' : '여'},{' '}
                        {ageLimit.min !== null && ageLimit.max !== null
                        ? `min: ${ageLimit.min}, max: ${ageLimit.max}`
                        : '나이무관'},{' '}
                        {careerLimit === -1
                        ? '경력무관'
                        : careerLimit === 0
                        ? '신입'
                        : careerLimit === 1
                        ? '경력우대'
                        : ''}
                    </p>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "brown",
                            color: "brown",
                            '&:hover': {
                                backgroundColor: "darkbrown",
                            },
                            marginLeft:"10px",
                            marginBottom:"20px"
                        }}
                        onClick={handleModalOpen}
                    >
                        변경하기
                    </Button>
                </div>
                <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        maxHeight: '80vh',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                }}
                >
                    <h6>성별,연령,학력</h6>
                    <StyledSelect onChange={(e) => setGenderLimit(e.target.value)}>
                        <option value="성별무관">성별무관</option>
                        <option value="남성우대">남성우대</option>
                        <option value="여성우대">여성우대</option>
                    </StyledSelect>
                    <StyledSelect onChange={(e) => setAgeLimit(e.target.value)}>
                        <option value="연령무관">연령무관</option>
                        <option value="20대">20대</option>
                        <option value="30대">30대</option>
                    </StyledSelect>
                    <StyledSelect onChange={(e) => setCareerLimit(e.target.value)}>
                        <option value="경력무관">경력무관</option>
                        <option value="신입">신입</option>
                        <option value="경력우대">경력우대</option>

                    </StyledSelect>
                    <Button
                    variant="outlined"
                    sx={{
                        borderColor: "brown",
                        color: "brown",
                        '&:hover': {
                            backgroundColor: "darkbrown",
                        },
                        marginLeft:"10px",
                        marginBottom:"20px"
                    }} onClick={handleModalClose}>확인</Button>
                </Modal>
                

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