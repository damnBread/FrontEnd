import React , {useState} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import damnBreadLogo from '../../assets/img/damnBread_logo.png';
import '../../assets/css/Header.css';
import '../../assets/css/font.css';

const Header = () => {

  const [activeLink, setActiveLink] = useState(''); 
  const sessionId = sessionStorage.getItem('id');

  console.log("seesion: " + sessionId);

  const handleLinkClick = (link) => { //네비게이션 색상 바꾸기 위함
    console.log('Clicked link:', link);
    setActiveLink(link); 
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
              <Link to="/Page3Header" className={`nav-link ${activeLink === '인재정보' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => handleLinkClick('인재정보')}>인재정보</Link>
              <Link to="/damnprofile" className={`nav-link ${activeLink === '마이페이지' ? 'active' : ''}`} 
                style={{ fontFamily: 'GmarketSans, sans-light', fontWeight: 'bold' }} onClick={() => handleLinkClick('마이페이지')}>마이페이지</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>

            {sessionId.length === 0 ? 
                <Nav className="ml-auto">
                  <Link to="/Login" className="Login" style={{ fontFamily: 'GmarketSans, sans-light' }}>로그인</Link>
                  <span className="login-divider">|</span>
                  <Link to="/SignUP" className="SignUP" style={{ fontFamily: 'GmarketSans, sans-light' }}>회원가입</Link>
                </Nav>
             : 
              <Nav className="session-id">
              <Link to="/damnprofile" className="Login" style={{ fontFamily: 'GmarketSans, sans-light' }}>{sessionId}</Link>
            </Nav>
            }


      </Navbar>
    </header>
  );
};

export default Header;
