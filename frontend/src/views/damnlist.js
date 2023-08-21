import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import DamnlistBoard from "./damnlistBoard";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Button from "@mui/material/Button";
import "../assets/css/damnlist.css";


const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const damnlist = () => {

  return (
    <div className="damnlistwhole">
      <Header/>
      <div className="damnlist-container">

              <div className="damnlist">
                <div className="content-wrapper">
                  <p>땜빵구해요</p>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "brown",
                      color: "brown",
                    }}
                    component={Link}
                    to="/damnlist/new"
                  >
                    구직구하기
                  </Button>
                </div>
              </div>


          <div>
            <p className="listcount" style={{ fontFamily: 'Inter', fontWeight: 'bold'}}>총 6건</p>   
          </div>
        
        <div className="brown-line1"></div>
    
        <DamnlistBoard/>
      </div>
    </div>
  );
};

export default damnlist;