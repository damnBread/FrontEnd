import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import DamnlistBoard from "./damnlistBoard";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import "../assets/css/damnlist.css";

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const damnlist = () => {
  const linkStyle = {
    textDecoration: 'none', // Removes the underline
    color: 'black' // Sets the text color to black
  };

  return (
    <div>
      <Header/>

      <div className="daumlist">
        <p>땜빵구해요</p>
      </div>

      <div className = "filtering"> 

      <div className="selectoption" style={{ display: 'flex' }}>
        <Select options={options} />
        <Select options={options} />
        <Select options={options} />
        <Select options={options} /> 
      </div>

      <div className="rounded-rectangle" style={{marginTop: "10px"}}>

      </div>
      </div>
      <div>
        <p className="listcount" style={{ fontFamily: 'Inter', fontWeight: 'bold'}}>총 30건</p>   
      </div>
      
      <div className="brown-line1"></div>
  
      <DamnlistBoard/>
    </div>
  );
};

export default damnlist;