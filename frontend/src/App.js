import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>로고</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link>땜빵구해요</Nav.Link>
              <Nav.Link>땜빵썰</Nav.Link>
              <Nav.Link>인재정보</Nav.Link>
              <Nav.Link>마이페이지</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// import logo from "./logo.svg";
// import "./App.css";
// import { useEffect, useState } from "react";
// import React from "react";

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("/showMe")
//       .then((res) => {
//         return res.json();
//       })
//       .then(function (result) {
//         setData(result);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <ul>
//           {data.map((v, idx) => (
//             <li key={`${idx}-${v}`}>{v}</li>
//           ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;
