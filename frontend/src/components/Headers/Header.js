import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import damnBreadLogo from '../../assets/img/damnBread_logo.png';
import '../../assets/css/Header.css';

const Header = () => {
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
              <Link to="/Page1Header" className="nav-link">땜빵구해요</Link>
              <Link to="/Page2Header" className="nav-link">땜빵썰</Link>
              <Link to="/Page3Header" className="nav-link">인재정보</Link>
              <Link to="/Page4Header" className="nav-link">마이페이지</Link>
            </Nav>

          </Navbar.Collapse>
        </Container>

        <Nav className="ml-auto">
                <Link to="/Login" className="Login">로그인</Link>
                <span className="login-divider">|</span>
                <Link to="/SignUP" className="SignUP">회원가입</Link>
            </Nav>
      </Navbar>
    </header>
  );
};

export default Header;
