import React , {useState} from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import damnBreadLogo from '../../assets/img/damnBread_logo.png';
import '../../assets/css/Header.css';
import '../../assets/css/font.css';
import Swal from "sweetalert2";

const Header = () => {

  const [activeLink, setActiveLink] = useState(''); 
  const [cookies] = useCookies();

  let sessionId = sessionStorage.getItem('id');
  const sessionToken = sessionStorage.getItem('token');
  const sessionAccessToken = sessionStorage.getItem('AccessToken');
  const sessionRefreshToken = sessionStorage.getItem('RefreshToken');

  const handleLinkClick = (link) => { //네비게이션 색상 바꾸기 위함
    console.log('Clicked link:', link);
    setActiveLink(link); 
  };


  function mypageSession() {
    axios
      .get('http://localhost:3000/', {
        headers: {
          Authorization: sessionToken,
        },
      })
      .then((res) => {              //올바른 경우
          console.log("success: " + res);   //성공 !

        })
        .catch(async (err) => {
          console.log(err);

          if (err.response.status === "401") {   //잘못된 스펠링, Bearer 형식 오류 등
            console.log("1: " + err);
            
            await axios.get('http://localhost:3000/issue', {
                headers: {
                  AccessToken: sessionAccessToken,
                  RefreshToken: sessionRefreshToken
                },
              })
              .then((response) => {
                console.log("access: " + response.data.AccessToken);
                console.log("refresh: " + response.data.RefreshToken);
  
                sessionStorage.setItem("AccessToken", response.data.AccessToken);     //웹브라우저에 SessionStorage에 저장 -> 찾아보니 이게 베스트인 거 같아요
                sessionStorage.setItem("RefreshToken", response.data.RefreshToken);
  
                console.log("access1: " + cookies.AccessToken);
                console.log("refresh1: " + cookies.RefreshToken);
              })
              .catch((err) => {
                console.log(err);
              });
  
          } else if (err.response.status === "404") {     //토큰이 만료된 경우
              console.log("2: " + err);
              Swal.fire({
                icon: "warning",
                title: "경고",
                text: "토큰이 만료되어 재로그인이 필요합니다. 다시 로그인 해주세요.",
                showCancelButton: false,
                confirmButtonText: "확인",
                width: 800,
                height: 100,
            }).then((res) => {
                if (res.isConfirmed) {
                    document.location.href = "/login";  //로그인 페이지로 이동
                }
                else{
                    //취소
                }
            });
            }
        });
  }

  function onClickLogout() {
    Swal.fire({
      icon: "warning",
      title: "경고",
      text: "로그아웃하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      width: 800,
      height: 100,
    }).then((res) => {
      if (res.isConfirmed) {
        sessionId = sessionStorage.clear();
        document.location.href = "/";
      }
      else{
          //취소
      }
    })
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={damnBreadLogo}
                alt="damnBreadLog"
                width="70"
                height="70"
                className="d-inline-block align-top"
              />
            </Link>
 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/damnlist" className={`nav-link ${activeLink === '땜빵구해요' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => handleLinkClick('땜빵구해요')}>땜빵구해요</Link>
              <Link to="/damnstory" className={`nav-link ${activeLink === '땜빵썰' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => handleLinkClick('땜빵썰')}>땜빵썰</Link>
              <Link to="/damnrank" className={`nav-link ${activeLink === '인재정보' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => handleLinkClick('인재정보')}>인재정보</Link>
              <Link to="/damnprofile" className={`nav-link ${activeLink === '마이페이지' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => {handleLinkClick('마이페이지'); mypageSession()}}>마이페이지</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>

            {sessionId === null ? 
                <Nav className="session">
                  <Link to="/Login" className="Login" style={{ fontFamily: 'GmarketSans, sans-light' }}>로그인</Link>
                  <span className="login-divider">|</span>
                  <Link to="/Agreement" className="SignUP" style={{ fontFamily: 'GmarketSans, sans-light' }}>회원가입</Link>
                </Nav>
             : 
                <Nav className="session">
                  <Link to="/damnprofile" className="Login" style={{ fontFamily: 'GmarketSans, sans-light' }}>{sessionId}</Link>
                  <span className="login-divider">|</span>
                  <Link to="/" className="SignUP" onClick={onClickLogout} style={{ fontFamily: 'GmarketSans, sans-light' }}>로그아웃</Link>
                </Nav>
            }


      </Navbar>
    </header>
  );
};

export default Header;
