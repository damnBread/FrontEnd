import React, { useState, useEffect } from "react";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/SignUP.css";
import axios from "axios";
import Swal from "sweetalert2";
import 'moment/locale/ko';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

function SignUP() {
    const [InputID, setInputID] = useState("");         //로그인 입력창
    const [InputPW, setInputPW] = useState("");         //비밀번호 입력창
    const [InputPWCHK, setInputPWCHK] = useState("");         //비밀번호 확인 입력창
    const [InputNickName, setInputNickName] = useState("");         //닉네임 입력창
    const [InputName, setInputName] = useState("");         //이름 입력창
    const [InputPhoneNumber, setInputPhoneNumber] = useState("");   //전화번호 입력창
    const [InputBirth, setInputBirth] = useState(Date);   //생년월일 입력창
    const [InputGender, setInputGender] = useState(true);    //성별
    const [InputAddress, setInputAddress] = useState("");   //거주지 입력창
    const [InputEmail, setInputEmail] = useState("");       //이메일 입력창
    const [InputWorkArea, setInputWorkArea] = useState([,]);   //희망근무지역 입력창
    const [InputWorkJob, setInputWorkJob] = useState([]);   //희망업직종 입력창 

    const [usableId, setUsableId] = useState(false);  //아이디 중복확인  -> true여야 사용 가능
    const [usableNickname, setUsableNickname] = useState(false);  //닉네임 중복확인
    const [usableEmail, setUsableEmail] = useState(false);  //이메일 중복확인    (인증하기 X -> 중복확인)

    const [show, setShow] = useState(false);   //모달창

    const handleClose = () => setShow(false);   //모달창 닫기
    const handleShow = () => setShow(true);     //모달창 켜기

    const [select, setSelect] = useState(null);  //서울 등 선택
    const [citySelect, setCitySelect] = useState(null);  //서울 등 선택
    const [showCityItems, setShowCityItems] = useState(false);  //서울 안에 있는 강남구 등 선택

    const handleInputID = (e) => {
        setInputID(e.target.value);
    };

    const handleInputPW = (e) => {
        setInputPW(e.target.value);
    };

    const handleInputPWCHK = (e) => {
        setInputPWCHK(e.target.value);
    }

    const handleInputNickName = (e) => {
        setInputNickName(e.target.value);
    };

    const handleInputName = (e) => {
        setInputName(e.target.value);
    };

    const handleInputPhoneNumber = (e) => {
        setInputPhoneNumber(e.target.value);
    };

    const handleInputBirth = (e) => {
        setInputBirth(e.target.value);
    };

    const handleInputAddress = (e) => {
        setInputAddress(e.target.value);
    };

    const handleInputGender = (e) => {
        setInputGender(e.target.value);
        console.log(e.target.value);
    };

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };

    const handleInputWorkArea = (e) => {
        setInputWorkArea(e.target.value);
    };

    const handleInputWorkJob = (e) => {
        setInputWorkJob(e.target.value);
    };

    const items = [     //지역 선택 아이템
        { 
            type: 'Seoul',
            title: '서울',
        },
        {
            type: 'Gyeonggi',
            title: '경기',
        },
        {
            type: 'Incheon',
            title: '인천',
        },
        {
            type: 'Gangwon',
            title: '강원',
        },
        {
            type: 'Daejeon',
            title: '대전',
        },
        {
            type: 'Sejong',
            title: '세종',
        },
        {
            type: 'Chungnam',
            title: '충남'
        },
        {
            type: 'Chungbuk',
            title: '충북',
        },
        {
            type: 'Busan',
            title: '부산',
        },
        {
            type: 'Ulsan',
            title: '울산',
        },
        {
            type: 'Gyeongnam',
            title: '경남',
        },
        {
            type: 'Gyeongbuk',
            title: '경북',
        },
        {
            type: 'Daegu',
            title: '대구',
        },
        {
            type: 'Gwangju',
            title: '광주',
        },
        {
            type: 'Jeonnam',
            title: '전남',
        },
        {
            type: 'Jeonbuk',
            title: '전북',
        },
        {
            type: 'Jeju',
            title: '제주',
        }
      ];

      const items_city = [     //지역 선택 아이템
        { 
            type: 'Seoul',
            title: '강남구',
        },
        {
            type: 'Seoul',
            title: '강동구',
        },
        {
            type: 'Seoul',
            title: '강북구',
        },
        {
            type: 'Seoul',
            title: '강서구',
        },
        {
            type: 'Seoul',
            title: '관악구',
        },
        {
            type: 'Seoul',
            title: '광진구',
        },
        {
            type: 'Seoul',
            title: '구로구'
        },
        {
            type: 'Seoul',
            title: '금천구',
        },
        {
            type: 'Seoul',
            title: '노원구',
        },
        {
            type: 'Seoul',
            title: '도봉구',
        },
        {
            type: 'Seoul',
            title: '동대문구',
        },
        {
            type: 'Seoul',
            title: '동작구',
        },
        {
            type: 'Seoul',
            title: '마포구',
        },
        {
            type: 'Seoul',
            title: '서대문구',
        },
        {
            type: 'Seoul',
            title: '서초구',
        },
        {
            type: 'Seoul',
            title: '성동구',
        },
        {
            type: 'Seoul',
            title: '성북구',
        },
        {
            type: 'Seoul',
            title: '송파구',
        },
        {
            type: 'Seoul',
            title: '양천구',
        },
        {
            type: 'Seoul',
            title: '영등포구',
        },
        {
            type: 'Seoul',
            title: '용산구',
        },
        {
            type: 'Seoul',
            title: '은평구',
        },
        {
            type: 'Seoul',
            title: '종로구',
        },
        {
            type: 'Seoul',
            title: '중구',
        },
        {
            type: 'Seoul',
            title: '중랑구',
        },
        { 
            type: 'Gyeonggi',
            title: '가평군',
        },
        {
            type: 'Gyeonggi',
            title: '고양시 덕양구',
        },
        {
            type: 'Gyeonggi',
            title: '고양시 일산동구',
        },
        {
            type: 'Gyeonggi',
            title: '고양시 일산서구',
        },
        {
            type: 'Gyeonggi',
            title: '과천시',
        },
        {
            type: 'Gyeonggi',
            title: '광명시',
        },
        {
            type: 'Gyeonggi',
            title: '광주시',
        },
        {
            type: 'Gyeonggi',
            title: '구리시',
        },
        {
            type: 'Gyeonggi',
            title: '군포시'
        },
        {
            type: 'Gyeonggi',
            title: '김포시',
        },
        {
            type: 'Gyeonggi',
            title: '남양주시',
        },
        {
            type: 'Gyeonggi',
            title: '동두천시',
        },
        {
            type: 'Gyeonggi',
            title: '부천시',
        },
        {
            type: 'Gyeonggi',
            title: '성남시 분당구',
        },
        {
            type: 'Gyeonggi',
            title: '성남시 수정구',
        },
        {
            type: 'Gyeonggi',
            title: '성남시 중원구',
        },
        {
            type: 'Gyeonggi',
            title: '수원시 권선구',
        },
        {
            type: 'Gyeonggi',
            title: '수원시 영통구',
        },
        {
            type: 'Gyeonggi',
            title: '수원시 장안구',
        },
        {
            type: 'Gyeonggi',
            title: '수원시 팔달구',
        },
        {
            type: 'Gyeonggi',
            title: '시흥시',
        },
        {
            type: 'Gyeonggi',
            title: '안산시 단원구',
        },
        {
            type: 'Gyeonggi',
            title: '안산시 상록구',
        },
        {
            type: 'Gyeonggi',
            title: '안성시',
        },
        {
            type: 'Gyeonggi',
            title: '안양시 동안구',
        },
        {
            type: 'Gyeonggi',
            title: '안양시 만안구',
        },
        {
            type: 'Gyeonggi',
            title: '양주시',
        },
        {
            type: 'Gyeonggi',
            title: '양평군',
        },
        {
            type: 'Gyeonggi',
            title: '여주시',
        },
        {
            type: 'Gyeonggi',
            title: '연천군',
        },
        {
            type: 'Gyeonggi',
            title: '오산시',
        },
        {
            type: 'Gyeonggi',
            title: '용인시 기흥구',
        },
        {
            type: 'Gyeonggi',
            title: '용인시 수지구',
        },
        {
            type: 'Gyeonggi',
            title: '용인시 처인구',
        },
        {
            type: 'Gyeonggi',
            title: '의왕시',
        },
        {
            type: 'Gyeonggi',
            title: '의정부시',
        },
        {
            type: 'Gyeonggi',
            title: '이천시',
        },
        {
            type: 'Gyeonggi',
            title: '파주시',
        },
        {
            type: 'Gyeonggi',
            title: '평택시',
        },
        {
            type: 'Gyeonggi',
            title: '포천시',
        },
        {
            type: 'Gyeonggi',
            title: '하남시',
        },
        {
            type: 'Gyeonggi',
            title: '화성시',
        },
        {
            type: 'Incheon',
            title: '강화군',
        },
        { 
            type: 'Incheon',
            title: '계양구',
        },
        {
            type: 'Incheon',
            title: '남동구',
        },
        {
            type: 'Incheon',
            title: '동구',
        },
        {
            type: 'Incheon',
            title: '미추홀구',
        },
        {
            type: 'Incheon',
            title: '부평구',
        },
        {
            type: 'Incheon',
            title: '서구',
        },
        {
            type: 'Incheon',
            title: '연수구'
        },
        {
            type: 'Incheon',
            title: '옹진군'
        },
        {
            type: 'Incheon',
            title: '중구'
        },
        {
            type: 'Gangwon',
            title: '강릉시',
        },
        {
            type: 'Gangwon',
            title: '고성군',
        },
        {
            type: 'Gangwon',
            title: '동해시',
        },
        {
            type: 'Gangwon',
            title: '삼척시',
        },
        {
            type: 'Gangwon',
            title: '속초시',
        },
        {
            type: 'Gangwon',
            title: '양구군',
        },
        {
            type: 'Gangwon',
            title: '양양군',
        },
        {
            type: 'Gangwon',
            title: '영월군',
        },
        {
            type: 'Gangwon',
            title: '원주시',
        },
        {
            type: 'Gangwon',
            title: '인제군',
        },
        {
            type: 'Gangwon',
            title: '정선군',
        },
        {
            type: 'Gangwon',
            title: '철원군',
        },
        {
            type: 'Gangwon',
            title: '춘천시',
        },
        {
            type: 'Gangwon',
            title: '태백시'
        },
        {
            type: 'Gangwon',
            title: '평창군',
        },
        {
            type: 'Gangwon',
            title: '홍천군',
        },
        {
            type: 'Gangwon',
            title: '화천군',
        },
        {
            type: 'Gangwon',
            title: '횡성군',
        },
        { 
            type: 'Daejeon',
            title: '대덕구',
        },
        {
            type: 'Daejeon',
            title: '동구',
        },
        {
            type: 'Daejeon',
            title: '서구',
        },
        {
            type: 'Daejeon',
            title: '유성구',
        },
        {
            type: 'Daejeon',
            title: '중구',
        },
        { 
            type: 'Sejong',
            title: '금남면',
        },
        {
            type: 'Sejong',
            title: '세종시',
        },
        {
            type: 'Chungnam',
            title: '계룡시',
        },
        {
            type: 'Chungnam',
            title: '공주시',
        },
        {
            type: 'Chungnam',
            title: '금산군',
        },
        {
            type: 'Chungnam',
            title: '논산시',
        },
        {
            type: 'Chungnam',
            title: '당진시',
        },
        {
            type: 'Chungnam',
            title: '보령시',
        },
        {
            type: 'Chungnam',
            title: '부여군',
        },
        {
            type: 'Chungnam',
            title: '서산시',
        },
        {
            type: 'Chungnam',
            title: '서천군',
        },
        {
            type: 'Chungnam',
            title: '아산시',
        },
        {
            type: 'Chungnam',
            title: '예산군',
        },
        {
            type: 'Chungnam',
            title: '천안시 동남구',
        },
        {
            type: 'Chungnam',
            title: '천안시 서북구',
        },
        {
            type: 'Chungnam',
            title: '청양군',
        },
        {
            type: 'Chungnam',
            title: '태안군',
        },
        {
            type: 'Chungnam',
            title: '홍성군',
        },
        {
            type: 'Chungbuk',
            title: '괴산군',
        },
        {
            type: 'Chungbuk',
            title: '단양군',
        },
        {
            type: 'Chungbuk',
            title: '보은군',
        },
        {
            type: 'Chungbuk',
            title: '영동군',
        },
        {
            type: 'Chungbuk',
            title: '옥천군',
        },
        {
            type: 'Chungbuk',
            title: '음성군',
        },
        {
            type: 'Chungbuk',
            title: '제천시',
        },
        {
            type: 'Chungbuk',
            title: '증평군',
        },
        {
            type: 'Chungbuk',
            title: '진천군',
        },
        { 
            type: 'Chungbuk',
            title: '청주시 상당구',
        },
        { 
            type: 'Chungbuk',
            title: '청주시 서원구',
        },
        { 
            type: 'Chungbuk',
            title: '청주시 청원구',
        },
        { 
            type: 'Chungbuk',
            title: '청주시 흥덕구',
        },
        {
            type: 'Chungbuk',
            title: '충주시',
        },
        { 
            type: 'Busan',
            title: '강서구',
        },
        {
            type: 'Busan',
            title: '금정구',
        },
        {
            type: 'Busan',
            title: '기장군',
        },
        {
            type: 'Busan',
            title: '남구',
        },
        {
            type: 'Busan',
            title: '동구',
        },
        {
            type: 'Busan',
            title: '동래구',
        },
        {
            type: 'Busan',
            title: '부산진구',
        },
        {
            type: 'Busan',
            title: '북구',
        },
        {
            type: 'Busan',
            title: '사상구',
        },
        {
            type: 'Busan',
            title: '사하구',
        },
        {
            type: 'Busan',
            title: '서구',
        },
        {
            type: 'Busan',
            title: '수영구',
        },
        {
            type: 'Busan',
            title: '연제구',
        },
        {
            type: 'Busan',
            title: '영도구',
        },
        {
            type: 'Busan',
            title: '중구',
        },
        {
            type: 'Busan',
            title: '해운대구',
        },
        {
            type: 'Ulsan',
            title: '남구',
        },
        {
            type: 'Ulsan',
            title: '동구',
        },
        {
            type: 'Ulsan',
            title: '북구',
        },
        {
            type: 'Ulsan',
            title: '울주군',
        },
        {
            type: 'Ulsan',
            title: '중구',
        },
        {
            type: 'Gyeongnam',
            title: '거제시',
        },
        { 
            type: 'Gyeongnam',
            title: '거창군',
        },
        {
            type: 'Gyeongnam',
            title: '고성군',
        },
        {
            type: 'Gyeongnam',
            title: '김해시',
        },
        {
            type: 'Gyeongnam',
            title: '남해군',
        },
        {
            type: 'Gyeongnam',
            title: '밀양시',
        },
        {
            type: 'Gyeongnam',
            title: '사천시',
        },
        {
            type: 'Gyeongnam',
            title: '산청군',
        },
        {
            type: 'Gyeongnam',
            title: '양산시',
        },
        {
            type: 'Gyeongnam',
            title: '의령군',
        },
        {
            type: 'Gyeongnam',
            title: '진주시',
        },
        {
            type: 'Gyeongnam',
            title: '창녕군',
        },
        {
            type: 'Gyeongnam',
            title: '창원시 마산합포구',
        },
        {
            type: 'Gyeongnam',
            title: '창원시 마산회원구',
        },
        {
            type: 'Gyeongnam',
            title: '창원시 성산구',
        },
        {
            type: 'Gyeongnam',
            title: '창원시 의창구',
        },
        {
            type: 'Gyeongnam',
            title: '창원시 진해구',
        },
        {
            type: 'Gyeongnam',
            title: '통영시',
        },
        {
            type: 'Gyeongnam',
            title: '하동군',
        },
        {
            type: 'Gyeongnam',
            title: '함안군',
        },
        {
            type: 'Gyeongnam',
            title: '함양군',
        },
        {
            type: 'Gyeongnam',
            title: '합천군',
        },
        {
            type: 'Gyeongbuk',
            title: '경산시',
        },
        {
            type: 'Gyeongbuk',
            title: '경주시',
        },
        {
            type: 'Gyeongbuk',
            title: '고령군',
        },
        { 
            type: 'Gyeongbuk',
            title: '구미시',
        },
        {
            type: 'Gyeongbuk',
            title: '김천시',
        },
        {
            type: 'Gyeongbuk',
            title: '문경시',
        },            
        {
            type: 'Gyeongbuk',
            title: '봉화군',
        },
        {
            type: 'Gyeongbuk',
            title: '상주시',
        },
        {
            type: 'Gyeongbuk',
            title: '성주군',
        },
        {
            type: 'Gyeongbuk',
            title: '안동시',
        },
        {
            type: 'Gyeongbuk',
            title: '영덕군',
        },
        {
            type: 'Gyeongbuk',
            title: '영양군',
        },
        {
            type: 'Gyeongbuk',
            title: '영주시',
        },
        {
            type: 'Gyeongnam',
            title: '영천시',
        },
        {
            type: 'Gyeongbuk',
            title: '예천군',
        },
        {
            type: 'Gyeongbuk',
            title: '울릉군',
        },
        {
            type: 'Gyeongbuk',
            title: '울진군',
        },
        {
            type: 'Gyeongbuk',
            title: '의성군',
        },
        {
            type: 'Gyeongbuk',
            title: '청도군',
        },
        {
            type: 'Gyeongbuk',
            title: '청송군',
        },
        {
            type: 'Gyeongbuk',
            title: '칠곡군',
        },
        {
            type: 'Gyeongbuk',
            title: '포항시 남구',
        },
        {
            type: 'Gyeongbuk',
            title: '포항시 북구',
        },
        { 
            type: 'Daegu',
            title: '군위군',
        },
        { 
            type: 'Daegu',
            title: '남구',
        },
        {
            type: 'Daegu',
            title: '달서구',
        },
        {
            type: 'Daegu',
            title: '달성군',
        },
        {
            type: 'Daegu',
            title: '동구',
        },
        {
            type: 'Daegu',
            title: '북구',
        },
        {
            type: 'Daegu',
            title: '서구',
        },
        {
            type: 'Daegu',
            title: '수성구',
        },
        {
            type: 'Daegu',
            title: '중구',
        },
        { 
            type: 'Gwangju',
            title: '광산구',
        },
        {
            type: 'Gwangju',
            title: '남구',
        },
        {
            type: 'Gwangju',
            title: '동구',
        },
        {
            type: 'Gwangju',
            title: '북구',
        },
        {
            type: 'Gwangju',
            title: '서구',
        },
        {
            type: 'Jeonnam',
            title: '강진군',
        },
        { 
            type: 'Jeonnam',
            title: '고흥군',
        },
        {
            type: 'Jeonnam',
            title: '곡성군',
        },
        {
            type: 'Jeonnam',
            title: '광양시',
        },
        {
            type: 'Jeonnam',
            title: '구례군',
        },
        {
            type: 'Jeonnam',
            title: '나주시',
        },
        {
            type: 'Jeonnam',
            title: '담양군',
        },
        {
            type: 'Jeonnam',
            title: '목포시',
        },
        {
            type: 'Jeonnam',
            title: '무안군',
        },
        {
            type: 'Jeonnam',
            title: '보성군',
        },
        {
            type: 'Jeonnam',
            title: '순천시',
        },
        {
            type: 'Jeonnam',
            title: '신안군',
        },
        {
            type: 'Jeonnam',
            title: '여수시',
        },
        {
            type: 'Jeonnam',
            title: '영광군',
        },
        {
            type: 'Jeonnam',
            title: '영암군',
        },
        {
            type: 'Jeonnam',
            title: '완도군',
        },
        {
            type: 'Jeonnam',
            title: '장성군',
        },
        {
            type: 'Jeonnam',
            title: '장흥군',
        },
        {
            type: 'Jeonnam',
            title: '진도군',
        },
        {
            type: 'Jeonnam',
            title: '함평군',
        },
        {
            type: 'Jeonnam',
            title: '해남군',
        },
        {
            type: 'Jeonnam',
            title: '화순군',
        },
        {
            type: 'Jeonbuk',
            title: '고창군',
        },
        { 
            type: 'Jeonbuk',
            title: '군산시',
        },
        {
            type: 'Jeonbuk',
            title: '김제시',
        },
        {
            type: 'Jeonbuk',
            title: '남원시',
        },
        {
            type: 'Jeonbuk',
            title: '무주군',
        },
        {
            type: 'Jeonbuk',
            title: '부안군',
        },
        { 
            type: 'Jeonbuk',
            title: '순창군',
        },
        {
            type: 'Jeonbuk',
            title: '완주군',
        },
        {
            type: 'Jeonbuk',
            title: '익산시',
        },
        {
            type: 'Jeonbuk',
            title: '임실군',
        },
        {
            type: 'Jeonbuk',
            title: '장수군',
        },
        {
            type: 'Jeonbuk',
            title: '임실군',
        },
        {
            type: 'Jeonbuk',
            title: '전주시 덕진구',
        },
        {
            type: 'Jeonbuk',
            title: '전주시 완산구',
        },
        {
            type: 'Jeonbuk',
            title: '정읍시',
        },
        {
            type: 'Jeonbuk',
            title: '진안군',
        },
        { 
            type: 'Jeju',
            title: '서귀포시',
        },
        {
            type: 'Jeju',
            title: '제주시',
        }
    ];

    const items_dong = [     //지역 선택 아이템
        { 
            type: '강남구',
            title: '대치동',
        }
    ];


      const handleClick = (type) => {
        setSelect(type);
        switch(type) {
            case 'Seoul':
                console.log(type);
                setShowCityItems(true);
            case 'Gyeonggi':
                console.log(type);
                setShowCityItems(true);
            case 'Incheon':
                console.log(type);
                setShowCityItems(true);
            case 'Gangwon':
                console.log(type);
                setShowCityItems(true);
            case 'Daejeon':
                console.log(type);
                setShowCityItems(true);
            case 'Sejong':
                console.log(type);
                setShowCityItems(true);
            case 'Chungnam':
                console.log(type);
                setShowCityItems(true);
            case 'Chungbuk':
                console.log(type);
                setShowCityItems(true);
            case 'Busan':
                console.log(type);
                setShowCityItems(true);
            case 'Ulsan':
                console.log(type);
                setShowCityItems(true);
            case 'Gyeongnam':
                console.log(type);
                setShowCityItems(true);
            case 'Gyeongbuk':
                console.log(type);
                setShowCityItems(true);
            case 'Daegu':
                console.log(type);
                setShowCityItems(true);
            case 'Gwangju':
                console.log(type);
                setShowCityItems(true);
            case 'Jeonnam':
                console.log(type);
                setShowCityItems(true);
            case 'Jeonbuk':
                console.log(type);
                setShowCityItems(true);
            case 'Jeju':
                console.log(type);
                setShowCityItems(true);
            default:
                console.log("====");
        }
        };

        const CityhandleClick = (city_type) => {
            setCitySelect(city_type);
            console.log('Clicked City Item:', city_type);             
        }

    const idValidation = () => {   // 아이디 중복 확인
          axios
            .post('/signup/verify/id', decodeURIComponent(InputID), {
                responseType: 'text/plain', 
            })
            .then((res) => {
                console.log(res.data);
                console.log(InputID);
                if(res.data === true) {
                    alert("이미 사용중인 아이디입니다.");
                    return true;
                } else {
                    alert("사용 가능한 아이디입니다.");
                    return false;
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
        };
        const nicknameValidation = () => {   // 닉네임 중복 확인
            axios
              .post('/signup/verify/nickname', InputNickName, {
                responseType: 'text/plain',
              })
              .then((res) => {
                  console.log(res.data);
                  if(res.data === true) {
                      alert("이미 사용중인 닉네임입니다.");
                  } else {
                      alert("사용 가능한 닉네임입니다.");
                  }
              })
              .catch((error) => {
                  console.log(error.response);
              });
          };


          const emailValidation = () => {   // 이메일 중복 확인
            axios
              .post('/signup/verify/email', InputEmail, {
                responseType: 'text/plain',
              })
              .then((res) => {
                  console.log(res.data);
                  if(res.data === true) {
                      alert("이미 사용중인 이메일입니다.");
                  } else {
                      alert("사용 가능한 이메일입니다.");
                  }
              })
              .catch((error) => {
                  console.log(error.response);
              });
          };

    const onClickSignUP = async () => {
        console.log("click SignUP");

        if(InputPW !== InputPWCHK) {   
            // 비밀번호와 비밀번호 체크가 다를 때
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "비밀번호를 다시 확인해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
            });
        } else if(InputID === '' || InputPW === '' || InputNickName === '' || InputEmail === '' || InputName === ''
             || InputPhoneNumber === '' || InputAddress === '' || InputBirth === '' || InputGender === '' ){  
            // 항목들이 비어있을 때
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "필수 항목을 모두 채워주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
            });
        }

        //모든 항목을 채웠을 경우
        await axios.post('http://localhost:3000/signup', {
            id: InputID,
            pw: InputPW,
            name: InputName,
            email: InputEmail,
            nickname: InputNickName,
            phone: InputPhoneNumber,
            home: InputAddress,
            birth: InputBirth,
            gender: InputGender,
            hopeLocation: InputWorkArea,
            hopeJob: InputWorkJob
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response);
            if (response.status === "CREATED 201") {
                console.log(response);
                document.location.href = "/login";  //회원가입 되면 로그인 페이지 이동(새로고침)
            }
        })
        .catch((error) => {
            console.log(error.response);
            Swal.fire({
                icon: "warning",
                title: "경고",
                text: "회원가입할 수 없습니다. 다시 시도해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
                if (res.isConfirmed) {
                     //삭제 요청 처리
                }
                else{
                    //취소
                }
            });
            if (error.response) {
                console.log("1", error.response.data);
                console.log("2", error.response.status);
                console.log("3", error.response.headers);
              } else if (error.request) {
                console.log("4", error.request);
              } else {
                console.log('Error', error.message);
              }
              console.log("5", error.config);
        });
    };

    return(
        <div>
            <div className="logo-container">
                    <img src={damnBreadLogo} alt="damnBreadLogo" width="30" style={{position: "relative", zIndex: 2}}/>
                    <span className="logo-container-1">
                        <b>회원가입</b>
                    </span>
            </div>
            <div className="division-line" style={{position: "relative", zIndex: 2}}></div>

            <div className="SignUP-form">
                <body>
                    <div id="root"></div>

                    <label style={{fontSize: "16px", marginTop: "550px", position: "relative", zIndex: 1}}><b>아이디</b></label>
                    <div>
                        <input type='text' id="id" name="id" placeholder="아이디" value={InputID}
                             onChange={handleInputID} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={idValidation} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px", 
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>    
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>비밀번호</b></label>
                    <label style={{fontSize: "9px", color: "#7F7F7F", marginTop: "30px", marginLeft: "20px"}}>8~20자, 하나 이상의 대문자, 특수문자 포함</label>
                    <div>
                        <input type='password' id="pw" name='pw' placeholder="비밀번호" value={InputPW}
                             onChange={handleInputPW} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>
                    <div>
                        <input type='password' name='input_pw_check' placeholder="비밀번호 확인" value={InputPWCHK}
                             onChange={handleInputPWCHK} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>닉네임</b></label>
                    <div>
                        <input type='text' id='nickname' name='nickname' placeholder="닉네임" value={InputNickName}
                             onChange={handleInputNickName} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={nicknameValidation} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>이름</b></label>
                    <div>
                        <input type='text' id='name' name='name' placeholder="이름 (실명)" value={InputName}
                             onChange={handleInputName} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>전화번호</b></label>
                    <div>
                        <input type='text' id='phone' name='phone' placeholder=" ex) 010-1234-5678" value={InputPhoneNumber}
                             onChange={handleInputPhoneNumber} style={{width:"440px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>생년월일</b></label>
                    <label style={{fontSize: "16px", marginTop: "30px", marginLeft: "85px"}}><b>성별</b></label>
                    <label style={{fontSize: "16px", marginTop: "30px", marginLeft: "23px"}}><b>거주지</b></label>
                    <div className="SignUP-form1">
                        <input type='date' id='birth' name='birth' value={InputBirth}
                             onChange={handleInputBirth} style={{width:"130px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />

                        <select className="select-style" id="gender" name="gender" required="true" onChange={handleInputGender}>
                            <option value="true">남</option>
                            <option value="false">여</option>
                        </select>

                        <input type='text' id='home' name='home' placeholder="거주지" value={InputAddress}
                             onChange={handleInputAddress} style={{width:"150px", height: "40px", marginLeft: "10px"
                             , marginTop: "15px", borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />

                        <button type='button' variant="outline-primary" onClick={handleShow} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                            marginTop: "22px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 검색</button>     
                   
                        <Modal dialogClassName="custom-modal-content" show={show} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>지역 선택</Modal.Title>
                            </Modal.Header>
                            <div className="custom-modal-box-whole">
                                <Modal.Body dialogClassName="custom-modal-box">
                                    {items.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleClick(item.type)}
                                            className={`custom-modal-box ${select === item.type ? 'select' : ''}`}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                </Modal.Body>

                                {showCityItems && (
                                    <div className="city-items-container">
                                        {items_city
                                            .filter((cityItem) => cityItem.type === select)
                                            .map((cityItem, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => CityhandleClick(cityItem.title)}
                                                    className={`custom-modal-box ${citySelect === cityItem.title ? 'select' : ''}`}
                                                >
                                                    {cityItem.title}
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {/* 동 분류하는 중 */}
                                {showCityItems && (
                                    <div className="city-items-container">
                                        {items_dong
                                            .filter((dongItem) => dongItem.title === select)
                                            .map((dongItem, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => CityhandleClick(dongItem.title)}
                                                    className={`custom-modal-box ${citySelect === dongItem.title ? 'select' : ''}`}
                                                >
                                                    {dongItem.title}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>

                            <Modal.Footer>
                                <Button className="btn_close" variant="secondary" onClick={handleClose}>
                                    닫기
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </div>

                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>이메일</b></label>
                    <div>
                        <input type='text' id='email' name='email' placeholder="이메일" value={InputEmail}
                             onChange={handleInputEmail} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' onClick={emailValidation} style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>중복 확인</button>      
                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>희망 근무 지역</b></label>
                    <div>
                        <input type='text' id='hopeLocation' name='hopeLocation' placeholder="희망 근무 지역" value={InputWorkArea}
                             onChange={handleInputWorkArea} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>지역 검색</button>   

                    </div>


                    <label style={{fontSize: "16px", marginTop: "30px"}}><b>희망 업직종</b></label>
                    <div>
                        <input type='text' id='hopeJob' name='hopeJob' placeholder="희망 업직종" value={InputWorkJob}
                             onChange={handleInputWorkJob} style={{width:"350px", height: "40px", marginTop: "15px", 
                              borderColor: "#E7E6E6", fontSize: "15px", borderRadius: "10px", padding: ".5em"}} />
                        <button type='button' style={{fontSize: "11px", width: "70px", height: "25px", borderColor: "#BF5E49", marginLeft: "10px",
                        marginTop: "8px",backgroundColor: "#BF5E49B0", border:"0px", borderRadius: "5px"}}>직종 검색</button>      
                    </div>


                    <div className="border1">
                        <button type='button' onClick={onClickSignUP} style={{fontSize: "15px", borderColor: "#BF5E49", marginLeft: "164px", marginTop: "8px",
                             color:"#BF5E49", backgroundColor: "#FFFFFF", border:"0px", borderRadius: "15px"}}><b>회원가입</b></button>
                    </div>
                         

                </body>
            </div>
            
        </div>
        
    )
}

export default SignUP;