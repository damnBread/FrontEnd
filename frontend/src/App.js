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
import React from "react";
import Login from "./Login";
import SignUP from './SignUP';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div>
      {/* <Router>
        <Switch>
          <Route path='/login'z component={<Login />} />
          <Route path='/signUP' component={<SignUP />} />
        </Switch>
      </Router> */}
      <Router>
        <Login />
        <SignUp />
      </Router>
    </div>
  );
}

export default App;