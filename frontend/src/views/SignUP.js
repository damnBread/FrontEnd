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
    const [InputWorkArea, setInputWorkArea] = useState("");   //희망근무지역 입력창
    const [InputWorkJob, setInputWorkJob] = useState("");   //희망업직종 입력창 

    const [usableId, setUsableId] = useState(false);  //아이디 중복확인  -> true여야 사용 가능
    const [usableNickname, setUsableNickname] = useState(false);  //닉네임 중복확인
    const [usableEmail, setUsableEmail] = useState(false);  //이메일 중복확인    (인증하기 X -> 중복확인)

    const [show, setShow] = useState(false);   //모달창
    const handleClose = () => setShow(false);   //모달창 닫기
    const handleShow = () => setShow(true);     //모달창 켜기

    const [select, setSelect] = useState(null);  //시/도 선택
    const [citySelect, setCitySelect] = useState(null);  //시/군/구 선택
    const [dongSelect, setDongSelect] = useState(null); //동/읍/면 선택
    const [showCityItems, setShowCityItems] = useState(false);  //시/군/구
    const [showDongItems, setShowDongItems] = useState(false);  //동/읍/면

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
            title: '개포동',
        },
        { 
            type: '강남구',
            title: '개포2동',
        },
        { 
            type: '강남구',
            title: '개포4동',
        },
        { 
            type: '강남구',
            title: '논현1동',
        },
        { 
            type: '강남구',
            title: '논현2동',
        },
        { 
            type: '강남구',
            title: '대치1동',
        },
        { 
            type: '강남구',
            title: '대치2동',
        },
        { 
            type: '강남구',
            title: '도곡동',
        },
        { 
            type: '강남구',
            title: '도곡1동',
        },
        { 
            type: '강남구',
            title: '삼성동',
        },
        { 
            type: '강남구',
            title: '삼성1동',
        },
        { 
            type: '강남구',
            title: '세곡동',
        },
        { 
            type: '강남구',
            title: '수서동',
        },
        { 
            type: '강남구',
            title: '압구정동',
        },
        { 
            type: '강남구',
            title: '역삼동',
        },
        { 
            type: '강남구',
            title: '역삼2동',
        },
        { 
            type: '강남구',
            title: '율현동',
        },
        { 
            type: '강남구',
            title: '일원1동',
        },
        { 
            type: '강남구',
            title: '일원2동',
        },
        { 
            type: '강남구',
            title: '자곡동',
        },
        { 
            type: '강남구',
            title: '청담동',
        },   //강남구 끝
        { 
            type: '강동구',
            title: '강일동',
        },
        { 
            type: '강동구',
            title: '고덕1동',
        },
        { 
            type: '강동구',
            title: '고덕2동',
        },
        { 
            type: '강동구',
            title: '둔촌동',
        },
        { 
            type: '강동구',
            title: '둔촌1동',
        },
        { 
            type: '강동구',
            title: '명일동',
        },
        { 
            type: '강동구',
            title: '명일1동',
        },
        { 
            type: '강동구',
            title: '상일동',
        },
        { 
            type: '강동구',
            title: '성내동',
        },
        { 
            type: '강동구',
            title: '성내2동',
        },
        { 
            type: '강동구',
            title: '성내3동',
        },
        { 
            type: '강동구',
            title: '암사1동',
        },
        { 
            type: '강동구',
            title: '암사2동',
        },
        { 
            type: '강동구',
            title: '천호동',
        },{ 
            type: '강동구',
            title: '천호1동',
        },{ 
            type: '강동구',
            title: '천호3동',
        },   //강동구 끝
        { 
            type: '강북구',
            title: '미아동',
        },{ 
            type: '강북구',
            title: '번1동',
        },{ 
            type: '강북구',
            title: '번2동',
        },{ 
            type: '강북구',
            title: '삼각산동',
        },{ 
            type: '강북구',
            title: '삼양동',
        },{ 
            type: '강북구',
            title: '송천동',
        },{ 
            type: '강북구',
            title: '수유동',
        },{ 
            type: '강북구',
            title: '수유2동',
        },{ 
            type: '강북구',
            title: '수유3동',
        },{ 
            type: '강북구',
            title: '인수동',  //강북구 끝
        },{ 
            type: '강서구',
            title: '가양동',
        },{ 
            type: '강서구',
            title: '가양2동',
        },{ 
            type: '강서구',
            title: '가양3동',
        },{ 
            type: '강서구',
            title: '공항동',
        },{ 
            type: '강서구',
            title: '과해동',
        },{ 
            type: '강서구',
            title: '등촌동',
        },{ 
            type: '강서구',
            title: '등촌1동',
        },{ 
            type: '강서구',
            title: '등촌3동',
        },{ 
            type: '강서구',
            title: '마곡동',
        },{ 
            type: '강서구',
            title: '방화1동',
        },{ 
            type: '강서구',
            title: '방화2동',
        },{ 
            type: '강서구',
            title: '염창동',
        },{ 
            type: '강서구',
            title: '오곡동',
        },{ 
            type: '강서구',
            title: '외발산동',
        },{ 
            type: '강서구',
            title: '우장산동',
        },{ 
            type: '강서구',
            title: '화곡1동',
        },{ 
            type: '강서구',
            title: '화곡2동',
        },{ 
            type: '강서구',
            title: '화곡4동',
        },{ 
            type: '강서구',
            title: '화곡6동',
        },{ 
            type: '강서구',
            title: '화곡본동',   //강서구 끝
        },{ 
            type: '관악구',
            title: '낙성대동',
        },{ 
            type: '관악구',
            title: '난향동',
        },{ 
            type: '관악구',
            title: '남현동',
        },{ 
            type: '관악구',
            title: '미성동',
        },{ 
            type: '관악구',
            title: '보라매동',
        },{ 
            type: '관악구',
            title: '삼성동',
        },{ 
            type: '관악구',
            title: '서림동',
        },{ 
            type: '관악구',
            title: '성현동',
        },{ 
            type: '관악구',
            title: '신림동',
        },{ 
            type: '관악구',
            title: '신원동',
        },{ 
            type: '관악구',
            title: '은천동',
        },{ 
            type: '관악구',
            title: '조원동',
        },{ 
            type: '관악구',
            title: '중앙동',
        },{ 
            type: '관악구',
            title: '청림동',
        },{ 
            type: '관악구',
            title: '행운동',   //관악구 끝
        },{ 
            type: '광진구',
            title: '광장동',
        },{ 
            type: '광진구',
            title: '구의1동',
        },{ 
            type: '광진구',
            title: '구의2동',
        },{ 
            type: '광진구',
            title: '군자동',
        },{ 
            type: '광진구',
            title: '능동',
        },{ 
            type: '광진구',
            title: '자양1동',
        },{ 
            type: '광진구',
            title: '자양2동',
        },{ 
            type: '광진구',
            title: '자양4동',
        },{ 
            type: '광진구',
            title: '중곡동',
        },{ 
            type: '광진구',
            title: '중곡2동',
        },{ 
            type: '광진구',
            title: '중곡3동',
        },{ 
            type: '광진구',
            title: '화양동',   //광진구 끝
        },{ 
            type: '구로구',
            title: '가리봉동',
        },{ 
            type: '구로구',
            title: '개봉1동',
        },{ 
            type: '구로구',
            title: '개봉2동',
        },{ 
            type: '구로구',
            title: '고척동',
        },{ 
            type: '구로구',
            title: '고척1동',
        },{ 
            type: '구로구',
            title: '구로동',
        },{ 
            type: '구로구',
            title: '구로1동',
        },{ 
            type: '구로구',
            title: '구로3동',
        },{ 
            type: '구로구',
            title: '구로4동',
        },{ 
            type: '구로구',
            title: '궁동',
        },{ 
            type: '구로구',
            title: '신도림동',
        },{ 
            type: '구로구',
            title: '오류1동',
        },{ 
            type: '구로구',
            title: '오류2동',
        },{ 
            type: '구로구',
            title: '천왕동',
        },{ 
            type: '구로구',
            title: '항동',   //구로구 끝
        },{ 
            type: '금천구',
            title: '가산동',
        },{ 
            type: '금천구',
            title: '독산1동',
        },{ 
            type: '금천구',
            title: '독산2동',
        },{ 
            type: '금천구',
            title: '독산4동',
        },{ 
            type: '금천구',
            title: '시흥동',
        },{ 
            type: '금천구',
            title: '시흥2동',
        },{ 
            type: '금천구',
            title: '시흥3동',
        },{ 
            type: '금천구',
            title: '시흥5동',  //금천구 끝
        },{ 
            type: '노원구',
            title: '공릉동',
        },{ 
            type: '노원구',
            title: '공릉2동',
        },{ 
            type: '노원구',
            title: '상계동',
        },{ 
            type: '노원구',
            title: '상계2동',
        },{ 
            type: '노원구',
            title: '상계3.4동',
        },{ 
            type: '노원구',
            title: '상계6.7동',
        },{ 
            type: '노원구',
            title: '상계8동',
        },{ 
            type: '노원구',
            title: '상계10동',
        },{ 
            type: '노원구',
            title: '월계동',
        },{ 
            type: '노원구',
            title: '월계2동',
        },{ 
            type: '노원구',
            title: '월계3동',
        },{ 
            type: '노원구',
            title: '중계1동',
        },{ 
            type: '노원구',
            title: '중계2.3동',
        },{ 
            type: '노원구',
            title: '중계본동',
        },{ 
            type: '노원구',
            title: '하계동',
        },{ 
            type: '노원구',
            title: '하계2동',   //노원구 끝
        },{ 
            type: '도봉구',
            title: '도봉동',
        },{ 
            type: '도봉구',
            title: '도봉2동',
        },{ 
            type: '도봉구',
            title: '방학동',
        },{ 
            type: '도봉구',
            title: '방학2동',
        },{ 
            type: '도봉구',
            title: '방학3동',
        },{ 
            type: '도봉구',
            title: '쌍문1동',
        },{ 
            type: '도봉구',
            title: '쌍문2동',
        },{ 
            type: '도봉구',
            title: '쌍문4동',
        },{ 
            type: '도봉구',
            title: '창동',
        },{ 
            type: '도봉구',
            title: '창2동',
        },{ 
            type: '도봉구',
            title: '창3동',
        },{ 
            type: '도봉구',
            title: '창5동',  //도봉구 끝
        },{ 
            type: '동대문구',
            title: '답십리동',
        },{ 
            type: '동대문구',
            title: '답십리2동',
        },{ 
            type: '동대문구',
            title: '신설동',
        },{ 
            type: '동대문구',
            title: '이문동',
        },{ 
            type: '동대문구',
            title: '이문1동',
        },{ 
            type: '동대문구',
            title: '장안동',
        },{ 
            type: '동대문구',
            title: '장안1동',
        },{ 
            type: '동대문구',
            title: '전농동',
        },{ 
            type: '동대문구',
            title: '전농1동',
        },{ 
            type: '동대문구',
            title: '제기동',
        },{ 
            type: '동대문구',
            title: '청량리동',
        },{ 
            type: '동대문구',
            title: '휘경동',
        },{ 
            type: '동대문구',
            title: '휘경1동',   //동대문구 끝
        },{ 
            type: '동작구',
            title: '노량진동',
        },{ 
            type: '동작구',
            title: '노량진2동',
        },{ 
            type: '동작구',
            title: '대방동',
        },{ 
            type: '동작구',
            title: '본동',
        },{ 
            type: '동작구',
            title: '사당동',
        },{ 
            type: '동작구',
            title: '사당2동',
        },{ 
            type: '동작구',
            title: '사당3동',
        },{ 
            type: '동작구',
            title: '사당5동',
        },{ 
            type: '동작구',
            title: '상도동',
        },{ 
            type: '동작구',
            title: '상도2동',
        },{ 
            type: '동작구',
            title: '상도3동',
        },{ 
            type: '동작구',
            title: '신대방동',
        },{ 
            type: '동작구',
            title: '신대방1동',
        },{ 
            type: '동작구',
            title: '흑석동',  //동작구 끝
        },{ 
            type: '마포구',
            title: '공덕동',
        },{ 
            type: '마포구',
            title: '노고산동',
        },{ 
            type: '마포구',
            title: '당인동',
        },{ 
            type: '마포구',
            title: '도화동',
        },{ 
            type: '마포구',
            title: '동교동',
        },{ 
            type: '마포구',
            title: '망원동',
        },{ 
            type: '마포구',
            title: '망원1동',
        },{ 
            type: '마포구',
            title: '상수동',
        },{ 
            type: '마포구',
            title: '상암동',
        },{ 
            type: '마포구',
            title: '성산동',
        },{ 
            type: '마포구',
            title: '성산1동',
        },{ 
            type: '마포구',
            title: '신공덕동',
        },{ 
            type: '마포구',
            title: '신수동',
        },{ 
            type: '마포구',
            title: '아현동',
        },{ 
            type: '마포구',
            title: '연남동',
        },{ 
            type: '마포구',
            title: '용강동',
        },{ 
            type: '마포구',
            title: '중동',
        },{ 
            type: '마포구',
            title: '토정동',
        },{ 
            type: '마포구',
            title: '하중동',
        },{ 
            type: '마포구',
            title: '현석동',  //마포구 끝
        },{ 
            type: '서대문구',
            title: '남가좌동',
        },{ 
            type: '서대문구',
            title: '남가좌2동',
        },{ 
            type: '서대문구',
            title: '냉천동',
        },{ 
            type: '서대문구',
            title: '대현동',
        },{ 
            type: '서대문구',
            title: '미근동',
        },{ 
            type: '서대문구',
            title: '북가좌동',
        },{ 
            type: '서대문구',
            title: '북가좌1동',
        },{ 
            type: '서대문구',
            title: '북아현동',
        },{ 
            type: '서대문구',
            title: '신촌동',
        },{ 
            type: '서대문구',
            title: '영천동',
        },{ 
            type: '서대문구',
            title: '옥천동',
        },{ 
            type: '서대문구',
            title: '천연동',
        },{ 
            type: '서대문구',
            title: '충정로2가',
        },{ 
            type: '서대문구',
            title: '충현동',
        },{ 
            type: '서대문구',
            title: '합동',
        },{ 
            type: '서대문구',
            title: '홍은동',
        },{ 
            type: '서대문구',
            title: '홍은1동',
        },{ 
            type: '서대문구',
            title: '홍제동',
        },{ 
            type: '서대문구',
            title: '홍제1동',
        },{ 
            type: '서대문구',
            title: '홍제3동',  //서대문구 끝
        },{ 
            type: '서초구',
            title: '내곡동',
        },{ 
            type: '서초구',
            title: '반포1동',
        },{ 
            type: '서초구',
            title: '반포2동',
        },{ 
            type: '서초구',
            title: '반포4동',
        },{ 
            type: '서초구',
            title: '반포본동',
        },{ 
            type: '서초구',
            title: '방배1동',
        },{ 
            type: '서초구',
            title: '방배2동',
        },{ 
            type: '서초구',
            title: '방배4동',
        },{ 
            type: '서초구',
            title: '방배본동',
        },{ 
            type: '서초구',
            title: '서초1동',
        },{ 
            type: '서초구',
            title: '서초2동',
        },{ 
            type: '서초구',
            title: '서초4동',
        },{ 
            type: '서초구',
            title: '신원동',
        },{ 
            type: '서초구',
            title: '양재1동',
        },{ 
            type: '서초구',
            title: '양재2동',
        },{ 
            type: '서초구',
            title: '우면동',
        },{ 
            type: '서초구',
            title: '원지동',   //서초구 끝
        },{ 
            type: '성동구',
            title: '금호동1가',
        },{ 
            type: '성동구',
            title: '금호동3가',
        },{ 
            type: '성동구',
            title: '금호동4가',
        },{ 
            type: '성동구',
            title: '마장동',
        },{ 
            type: '성동구',
            title: '사근동',
        },{ 
            type: '성동구',
            title: '성수동1가',
        },{ 
            type: '성동구',
            title: '성수동2가',
        },{ 
            type: '성동구',
            title: '성수1가2동',
        },{ 
            type: '성동구',
            title: '성수2가1동',
        },{ 
            type: '성동구',
            title: '송정동',
        },{ 
            type: '성동구',
            title: '옥수동',
        },{ 
            type: '성동구',
            title: '응봉동',
        },{ 
            type: '성동구',
            title: '하왕십리동',
        },{ 
            type: '성동구',
            title: '행당1동',
        },{ 
            type: '성동구',
            title: '행당2동',   //성동구 끝
        },{ 
            type: '성북구',
            title: '길음동',
        },{ 
            type: '성북구',
            title: '길음2동',
        },{ 
            type: '성북구',
            title: '돈암동',
        },{ 
            type: '성북구',
            title: '돈암2동',
        },{ 
            type: '성북구',
            title: '동선동1가',
        },{ 
            type: '성북구',
            title: '동선동3가',
        },{ 
            type: '성북구',
            title: '동선동4가',
        },{ 
            type: '성북구',
            title: '동소문동1가',
        },{ 
            type: '성북구',
            title: '동소문동2가',
        },{ 
            type: '성북구',
            title: '동소문동4가',
        },{ 
            type: '성북구',
            title: '동소문동5가',
        },{ 
            type: '성북구',
            title: '동소문동7가',
        },{ 
            type: '성북구',
            title: '보문동1가',
        },{ 
            type: '성북구',
            title: '보문동3가',
        },{ 
            type: '성북구',
            title: '보문동4가',
        },{ 
            type: '성북구',
            title: '보문동6가',
        },{ 
            type: '성북구',
            title: '보문동7가',
        },{ 
            type: '성북구',
            title: '삼선동2가',
        },{ 
            type: '성북구',
            title: '삼선동3가',
        },{ 
            type: '성북구',
            title: '삼선동5가',
        },{ 
            type: '성북구',
            title: '상월곡동',
        },{ 
            type: '성북구',
            title: '성북동',
        },{ 
            type: '성북구',
            title: '성북동1가',
        },{ 
            type: '성북구',
            title: '안암동2가',
        },{ 
            type: '성북구',
            title: '안암동3가',
        },{ 
            type: '성북구',
            title: '안암동5가',
        },{ 
            type: '성북구',
            title: '월곡1동',
        },{ 
            type: '성북구',
            title: '장위동',
        },{ 
            type: '성북구',
            title: '장위1동',
        },{ 
            type: '성북구',
            title: '장위3동',
        },{ 
            type: '성북구',
            title: '정릉동',
        },{ 
            type: '성북구',
            title: '정릉2동',
        },{ 
            type: '성북구',
            title: '정릉3동',
        },{ 
            type: '성북구',
            title: '종암동',
        },{ 
            type: '성북구',
            title: '하월곡동',  //성북구 끝
        },{ 
            type: '송파구',
            title: '가락동',
        },{ 
            type: '송파구',
            title: '가락2동',
        },{ 
            type: '송파구',
            title: '가락본동',
        },{ 
            type: '송파구',
            title: '거여1동',
        },{ 
            type: '송파구',
            title: '거여2동',
        },{ 
            type: '송파구',
            title: '마천1동',
        },{ 
            type: '송파구',
            title: '마천2동',
        },{ 
            type: '송파구',
            title: '문정1동',
        },{ 
            type: '송파구',
            title: '문정2동',
        },{ 
            type: '송파구',
            title: '방이1동',
        },{ 
            type: '송파구',
            title: '방이2동',
        },{ 
            type: '송파구',
            title: '석촌동',
        },{ 
            type: '송파구',
            title: '송파동',
        },{ 
            type: '송파구',
            title: '송파2동',
        },{ 
            type: '송파구',
            title: '신천동',
        },{ 
            type: '송파구',
            title: '오륜동',
        },{ 
            type: '송파구',
            title: '위례동',
        },{ 
            type: '송파구',
            title: '잠실2동',
        },{ 
            type: '송파구',
            title: '잠실3동',
        },{ 
            type: '송파구',
            title: '잠실6동',
        },{ 
            type: '송파구',
            title: '잠실7동',
        },{ 
            type: '송파구',
            title: '장지동',
        },{ 
            type: '송파구',
            title: '풍납동',
        },{ 
            type: '송파구',
            title: '풍납2동',  //송파구 끝
        },{ 
            type: '양천구',
            title: '목동',
        },{ 
            type: '양천구',
            title: '목2동',
        },{ 
            type: '양천구',
            title: '목3동',
        },{ 
            type: '양천구',
            title: '목5동',
        },{ 
            type: '양천구',
            title: '신월동',
        },{ 
            type: '양천구',
            title: '신월2동',
        },{ 
            type: '양천구',
            title: '신월3동',
        },{ 
            type: '양천구',
            title: '신월5동',
        },{ 
            type: '양천구',
            title: '신월6동',
        },{ 
            type: '양천구',
            title: '신정동',
        },{ 
            type: '양천구',
            title: '신정1동',
        },{ 
            type: '양천구',
            title: '신정3동',
        },{ 
            type: '양천구',
            title: '신정4동',
        },{ 
            type: '양천구',
            title: '신정7동',  //양천구 끝
        },{ 
            type: '영등포구',
            title: '당산동',
        },{ 
            type: '영등포구',
            title: '당산동2가',
        },{ 
            type: '영등포구',
            title: '당산동3가',
        },{ 
            type: '영등포구',
            title: '당산동5가',
        },{ 
            type: '영등포구',
            title: '당산동6가',
        },{ 
            type: '영등포구',
            title: '대림1동',
        },{ 
            type: '영등포구',
            title: '대림2동',
        },{ 
            type: '영등포구',
            title: '도림동',
        },{ 
            type: '영등포구',
            title: '문래동',
        },{ 
            type: '영등포구',
            title: '문래동2가',
        },{ 
            type: '영등포구',
            title: '문래동3가',
        },{ 
            type: '영등포구',
            title: '문래동5가',
        },{ 
            type: '영등포구',
            title: '문래동6가',
        },{ 
            type: '영등포구',
            title: '신길1동',
        },{ 
            type: '영등포구',
            title: '신길3동',
        },{ 
            type: '영등포구',
            title: '신길5동',
        },{ 
            type: '영등포구',
            title: '신길6동',
        },{ 
            type: '영등포구',
            title: '양평동',
        },{ 
            type: '영등포구',
            title: '양평동1가',
        },{ 
            type: '영등포구',
            title: '양평동3가',
        },{ 
            type: '영등포구',
            title: '양평동4가',
        },{ 
            type: '영등포구',
            title: '양평동6가',
        },{ 
            type: '영등포구',
            title: '양화동',
        },{ 
            type: '영등포구',
            title: '영등포동',
        },{ 
            type: '영등포구',
            title: '영등포동1가',
        },{ 
            type: '영등포구',
            title: '영등포동3가',
        },{ 
            type: '영등포구',
            title: '영등포동6가',
        },{ 
            type: '영등포구',
            title: '영등포동7가',
        },{ 
            type: '영등포구',
            title: '영등포본동',   //영등포구 끝
        },{ 
            type: '용산구',
            title: '갈월동',
        },{ 
            type: '용산구',
            title: '도원동',
        },{ 
            type: '용산구',
            title: '동빙고동',
        },{ 
            type: '용산구',
            title: '문배동',
        },{ 
            type: '용산구',
            title: '보광동',
        },{ 
            type: '용산구',
            title: '서계동',
        },{ 
            type: '용산구',
            title: '서빙고동',
        },{ 
            type: '용산구',
            title: '신창동',
        },{ 
            type: '용산구',
            title: '용문동',
        },{ 
            type: '용산구',
            title: '용산동2가',
        },{ 
            type: '용산구',
            title: '용산동3가',
        },{ 
            type: '용산구',
            title: '용산동5가',
        },{ 
            type: '용산구',
            title: '용산동6가',
        },{ 
            type: '용산구',
            title: '원효로2가',
        },{ 
            type: '용산구',
            title: '원효로3가',
        },{ 
            type: '용산구',
            title: '이촌동',
        },{ 
            type: '용산구',
            title: '이촌1동',
        },{ 
            type: '용산구',
            title: '이태원동',
        },{ 
            type: '용산구',
            title: '이태원1동',
        },{ 
            type: '용산구',
            title: '주성동',
        },{ 
            type: '용산구',
            title: '청암동',
        },{ 
            type: '용산구',
            title: '청파동2가',
        },{ 
            type: '용산구',
            title: '청파동3가',
        },{ 
            type: '용산구',
            title: '한강로2가',
        },{ 
            type: '용산구',
            title: '한강로3가',
        },{ 
            type: '용산구',
            title: '효창동',
        },{ 
            type: '용산구',
            title: '후암동',   //용산구 끝
        },{ 
            type: '은평구',
            title: '갈현동',
        },{ 
            type: '은평구',
            title: '갈현2동',
        },{ 
            type: '은평구',
            title: '구산동',
        },{ 
            type: '은평구',
            title: '대조동',
        },{ 
            type: '은평구',
            title: '불광동',
        },{ 
            type: '은평구',
            title: '불광2동',
        },{ 
            type: '은평구',
            title: '수색동',
        },{ 
            type: '은평구',
            title: '신사1동',
        },{ 
            type: '은평구',
            title: '신사2동',
        },{ 
            type: '은평구',
            title: '응암동',
        },{ 
            type: '은평구',
            title: '응암1동',
        },{ 
            type: '은평구',
            title: '응암3동',
        },{ 
            type: '은평구',
            title: '증산동',  //은평구 끝
        },{ 
            type: '종로구',
            title: '가회동',
        },{ 
            type: '종로구',
            title: '경운동',
        },{ 
            type: '종로구',
            title: '계동',
        },{ 
            type: '종로구',
            title: '관수동',
        },{ 
            type: '종로구',
            title: '관철동',
        },{
            type: '종로구',
            title: '교남동',
        },{ 
            type: '종로구',
            title: '교북동',
        },{ 
            type: '종로구',
            title: '궁정동',
        },{ 
            type: '종로구',
            title: '권농동',
        },{ 
            type: '종로구',
            title: '내수동',
        },{ 
            type: '종로구',
            title: '내자동',
        },{ 
            type: '종로구',
            title: '누하동',
        },{ 
            type: '종로구',
            title: '당주동',
        },{ 
            type: '종로구',
            title: '돈의동',
        },{ 
            type: '종로구',
            title: '동숭동',
        },{ 
            type: '종로구',
            title: '명륜2가',
        },{ 
            type: '종로구',
            title: '명륜3가',
        },{ 
            type: '종로구',
            title: '묘동',
        },{ 
            type: '종로구',
            title: '무악동',
        },{ 
            type: '종로구',
            title: '부암동',
        },{ 
            type: '종로구',
            title: '사간동',
        },{ 
            type: '종로구',
            title: '삼청동',
        },{ 
            type: '종로구',
            title: '서린동',
        },{ 
            type: '종로구',
            title: '소격동',
        },{ 
            type: '종로구',
            title: '송월동',
        },{ 
            type: '종로구',
            title: '수송동',
        },{ 
            type: '종로구',
            title: '숭인동',
        },{ 
            type: '종로구',
            title: '숭인2동',
        },{ 
            type: '종로구',
            title: '신교동',
        },{ 
            type: '종로구',
            title: '신문로2가',
        },{ 
            type: '종로구',
            title: '신영동',
        },{ 
            type: '종로구',
            title: '연건동',
        },{ 
            type: '종로구',
            title: '연지동',
        },{ 
            type: '종로구',
            title: '옥인동',
        },{ 
            type: '종로구',
            title: '와룡동',
        },{ 
            type: '종로구',
            title: '원남동',
        },{ 
            type: '종로구',
            title: '원서동',
        },{ 
            type: '종로구',
            title: '익선동',
        },{ 
            type: '종로구',
            title: '인사동',
        },{ 
            type: '종로구',
            title: '장사동',
        },{ 
            type: '종로구',
            title: '재동',
        },{ 
            type: '종로구',
            title: '종로1가',
        },{ 
            type: '종로구',
            title: '종로2가',
        },{ 
            type: '종로구',
            title: '종로4가',
        },{ 
            type: '종로구',
            title: '종로5가',
        },{ 
            type: '종로구',
            title: '중학동',
        },{ 
            type: '종로구',
            title: '창성동',
        },{ 
            type: '종로구',
            title: '창신1동',
        },{ 
            type: '종로구',
            title: '창신2동',
        },{ 
            type: '종로구',
            title: '청운동',
        },{ 
            type: '종로구',
            title: '청진동',
        },{ 
            type: '종로구',
            title: '충신동',
        },{ 
            type: '종로구',
            title: '통의동',
        },{
            type: '종로구',
            title: '팔판동',
        },{ 
            type: '종로구',
            title: '평동',
        },{ 
            type: '종로구',
            title: '필운동',
        },{ 
            type: '종로구',
            title: '행촌동',
        },{ 
            type: '종로구',
            title: '홍지동',
        },{ 
            type: '종로구',
            title: '홍파동',
        },{ 
            type: '종로구',
            title: '효자동',
        },{ 
            type: '종로구',
            title: '효제동',  //종로구 끝
        },{ 
            type: '중구',
            title: '광희동1가',
        },{ 
            type: '중구',
            title: '남대문로1가',
        },{ 
            type: '중구',
            title: '남대문로2가',
        },{ 
            type: '중구',
            title: '남대문로4가',
        },{ 
            type: '중구',
            title: '남대문로5가',
        },{ 
            type: '중구',
            title: '남산동2가',
        },{ 
            type: '중구',
            title: '남산동3가',
        },{ 
            type: '중구',
            title: '남학동',
        },{ 
            type: '중구',
            title: '다동',
        },{ 
            type: '중구',
            title: '동화동',
        },{ 
            type: '중구',
            title: '만리동1가',
        },{ 
            type: '중구',
            title: '명동1가',
        },{ 
            type: '중구',
            title: '명동2가',
        },{ 
            type: '중구',
            title: '무학동',
        },{ 
            type: '중구',
            title: '묵정동',
        },{ 
            type: '중구',
            title: '봉래동1가',
        },{ 
            type: '중구',
            title: '봉래동2가',
        },{ 
            type: '중구',
            title: '산림동',
        },{ 
            type: '중구',
            title: '삼각동',
        },{ 
            type: '중구',
            title: '소공동',
        },{ 
            type: '중구',
            title: '수표동',
        },{ 
            type: '중구',
            title: '순화동',
        },{ 
            type: '중구',
            title: '신당동',
        },{ 
            type: '중구',
            title: '신당5동',
        },{ 
            type: '중구',
            title: '쌍림동',
        },{ 
            type: '중구',
            title: '예관동',
        },{ 
            type: '중구',
            title: '예장동',
        },{ 
            type: '중구',
            title: '을지로1가',
        },{ 
            type: '중구',
            title: '을지로2가',
        },{ 
            type: '중구',
            title: '을지로4가',
        },{ 
            type: '중구',
            title: '을지로5가',
        },{ 
            type: '중구',
            title: '을지로7가',
        },{ 
            type: '중구',
            title: '인현동1가',
        },{ 
            type: '중구',
            title: '인현동2가',
        },{ 
            type: '중구',
            title: '장교동',
        },{ 
            type: '중구',
            title: '장충동1가',
        },{ 
            type: '중구',
            title: '저동1가',
        },{ 
            type: '중구',
            title: '저동2가',
        },{ 
            type: '중구',
            title: '주교동',
        },{ 
            type: '중구',
            title: '주자동',
        },{ 
            type: '중구',
            title: '청구동',
        },{ 
            type: '중구',
            title: '초동',
        },{ 
            type: '중구',
            title: '충무로2가',
        },{ 
            type: '중구',
            title: '충무로3가',
        },{ 
            type: '중구',
            title: '충무로5가',
        },{ 
            type: '중구',
            title: '충정로1가',
        },{ 
            type: '중구',
            title: '태평로2가',
        },{ 
            type: '중구',
            title: '필동1가',
        },{ 
            type: '중구',
            title: '필동3가',
        },{ 
            type: '중구',
            title: '황학동',   //중구 끝
        },{ 
            type: '중랑구',
            title: '망우동',
        },{ 
            type: '중랑구',
            title: '망우본동',
        },{ 
            type: '중랑구',
            title: '면목동',
        },{ 
            type: '중랑구',
            title: '면목3.8동',
        },{ 
            type: '중랑구',
            title: '면목4동',
        },{ 
            type: '중랑구',
            title: '면목7동',
        },{ 
            type: '중랑구',
            title: '면목본동',
        },{ 
            type: '중랑구',
            title: '묵1동',
        },{ 
            type: '중랑구',
            title: '묵2동',
        },{ 
            type: '중랑구',
            title: '상봉1동',
        },{ 
            type: '중랑구',
            title: '상봉2동',
        },{ 
            type: '중랑구',
            title: '신내1동',
        },{ 
            type: '중랑구',
            title: '신내2동',
        },{ 
            type: '중랑구',
            title: '중화1동',
        },{ 
            type: '중랑구',
            title: '중화2동',  //중랑구 끝 서울 끝
        }
    ];



    const handleClick = (itemType) => {
        setSelect(itemType);
        setCitySelect(null);
        setDongSelect(null);
        console.log(itemType);
        setShowCityItems(true);
        setShowDongItems(true);
    };

    const CityhandleClick = (cityItem) => {
        setCitySelect(cityItem);
        setDongSelect(cityItem);
        setShowDongItems(true);
        console.log('CItyDIcy:', cityItem);             
    }

    const DonghandleClick = (dongItem) => {
        setDongSelect(dongItem);
        console.log('DongDOng Item:', dongItem);             
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

                                    {/* 시/도 */}
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

                                    {/* 시/군/구 */}
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
                                    

                                {/* 동/읍/면 */}
                                {showDongItems && (
                                        <div className="dong-items-container">
                                            {items_dong
                                                .filter((dongItem) => dongItem.type === citySelect)
                                                .map((dongItem, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => DonghandleClick(dongItem.title)}
                                                        className={`custom-modal-box ${dongSelect === dongItem.title ? 'select' : ''}`}
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