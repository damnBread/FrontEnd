import React , {useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import damnBreadLogo from '../../assets/img/damnBread_logo.png';
import '../../assets/css/Header.css';
import '../../assets/css/font.css';
import Swal from "sweetalert2";

const Header = () => {

  const [activeLink, setActiveLink] = useState(''); 
  let sessionId = sessionStorage.getItem('id');

  const handleLinkClick = (link) => { //네비게이션 색상 바꾸기 위함
    console.log('Clicked link:', link);
    setActiveLink(link); 
  };

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
      }
      else{
          //취소
      }
    });
  }

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
              <Link to="/Page3Header" className={`nav-link ${activeLink === '인재정보' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => handleLinkClick('인재정보')}>인재정보</Link>
              <Link to="/damnprofile" className={`nav-link ${activeLink === '마이페이지' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => handleLinkClick('마이페이지')}>마이페이지</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>

            {sessionId === null ? 
                <Nav className="session">
                  <Link to="/Login" className="Login" style={{ fontFamily: 'GmarketSans, sans-light' }}>로그인</Link>
                  <span className="login-divider">|</span>
                  <Link to="/SignUP" className="SignUP" style={{ fontFamily: 'GmarketSans, sans-light' }}>회원가입</Link>
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
