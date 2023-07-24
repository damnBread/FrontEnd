import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import damnBreadLogo from '../../assets/img/damnBread_logo.png';
import '../../assets/css/Header.css';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              src={damnBreadLogo}
              alt="damnBreadLog"
              width="70"
              height="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto justify-content-center">
              {/* Use Link components from React Router for navigation */}
              <Link to="/Page1Header" className="nav-link">땜빵구해요</Link>
              <Link to="/Page2Header" className="nav-link">땜빵썰</Link>
              <Link to="/Page3Header" className="nav-link">인재정보</Link>
              <Link to="/Page4Header" className="nav-link">마이페이지</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
