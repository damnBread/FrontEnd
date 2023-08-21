import React, { useState } from "react";
import Header from "../components/Headers/Header";
import "../assets/css/Page3Header.css";
import DamnrankBoard from "./damnrankBoard";
import Select from 'react-select';
import selecticon from "../assets/img/select-icon.png";
import Swal from "sweetalert2";
import {items, items_city, items_dong} from '../components/CityItem.js'

const Page3Header = () => {

  const [showArea, setShowArea] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [showConditions, setShowConditions] = useState(false);

  const [InputWorkArea, setInputWorkArea] = useState("");   //희망근무지역 입력창
  const [InputWorkJob, setInputWorkJob] = useState("");   //희망업직종 입력창 

  const [imageRotation, setImageRotation] = useState(0);

  const handleToggleArea = () => {
    setShowArea(prevState => !prevState); // Toggle the modal visibility
    setImageRotation(prevRotation => (prevRotation === 0 ? 180 : 0));
  };

    const [showCityItems, setShowCityItems] = useState(true);  //시/군/구
    const [showDongItems, setShowDongItems] = useState(true);  //동/읍/면

    //희망근무지역
    const [SelectWorkArea, setSelectWorkArea] = useState("");  //시/도 선택
    const [citySelectWorkArea, setCitySelectWorkArea] = useState("");  //시/군/구 선택
    const [dongSelectWorkArea, setDongSelectWorkArea] = useState(""); //동/읍/면 선택
    const [addedWorkAreas, setAddedWorkAreas] = useState([]);

    const [SelectWorkJob, setSelectWorkJob] = useState([]);  //희망업직종 선택 
    const [activeWorkJob, setActiveWorkJob] = useState('');  //색 변경

    //희망 근무 지역
    const handleClickWorkArea = (itemType) => {
      setSelectWorkArea(itemType);
      setCitySelectWorkArea(null);
      setDongSelectWorkArea(null);
      setShowCityItems(true);
      setShowDongItems(true);
  };

  const CityhandleClickWorkArea = (cityItem) => {
      setCitySelectWorkArea(cityItem);
      setShowDongItems(true);       
  }

  const DonghandleClickWorkArea = (dongItem) => {
      setDongSelectWorkArea(dongItem);         
  }

  const handleAddWorkArea = () => {   //희망근무지역 추가 버튼 클릭시
    if (SelectWorkArea && citySelectWorkArea && dongSelectWorkArea) {
      const addWorkArea = SelectWorkArea + " " + citySelectWorkArea + " " + dongSelectWorkArea;
      if (addedWorkAreas.includes(addWorkArea)) {
        Swal.fire({
          icon: "warning",
          title: "경고",
          text: "이미 추가된 지역입니다.",
          showCancelButton: false,
          confirmButtonText: "확인",
          width: 800,
          height: 100,
        }).then((res) => {});
      } else {
        setAddedWorkAreas(prevWorkAreas => [...prevWorkAreas, addWorkArea]);
      }
      console.log(addWorkArea);
    } else {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "거주지가 모두 선택되지 않았습니다. 다시 선택해주세요.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      }).then((res) => {});
    }
  }

  const removeWorkArea = (workAreaToRemove) => {    //희망근무지역 하나씩 삭제
    setAddedWorkAreas(prevWorkAreas =>
      prevWorkAreas.filter(workArea => workArea !== workAreaToRemove)
    );
  }

  const handleSelectWorkArea = (e) => {   //희망근무지역 완료 버튼 클릭시
    if(SelectWorkArea && citySelectWorkArea && dongSelectWorkArea) {
      setInputWorkArea(addedWorkAreas.join("|"));
      setShowJob(false);
      setAddedWorkAreas([]);
    } 
    else {
      Swal.fire({
        icon: "warning",
        title: "경고",
        text: "희망근무지역이 없습니다. 다시 선택해주세요.",
        showCancelButton: false,
        confirmButtonText: "확인",
        width: 800,
        height: 100,
      }).then((res) => {});
    }
  }

  function onClickArea() {
    setShowArea(false);
    setShowJob(false);
    setShowConditions(false);

  }

  function onClickJob() {
    setShowArea(false);
    setShowJob(true);
    setShowConditions(false);


  }
  function onClickConditions() {
    setShowArea(false);
    setShowJob(false);
    setShowConditions(true);


  }

  function onClickSelect() {

  }

  return (
    <div>
      <Header />
      <div className="items-align">
        <div>
          <div>
              <button type="button" onClick={handleToggleArea} className="filter">
                지역
                <img src={selecticon} alt="selecticon" className="select-icon" width="15" style={{marginLeft: "30px", transform: `rotate(${imageRotation}deg)`}}/>
              </button> 

              <button type="button" onClick={onClickJob} className="filter1">
                업직종
                <img src={selecticon} alt="selecticon" className="select-icon" width="15" style={{marginLeft: "30px"}}/>
              </button> 

              <button type="button" onClick={onClickConditions} className="filter1">
                상세조건
                <img src={selecticon} alt="selecticon" className="select-icon" width="15" style={{marginLeft: "30px"}}/>
              </button> 

              <button type="button" onClick={onClickSelect} className="filter-select">적용</button> 
          </div>
          {!showArea && (
              <button type="button" className="default-filter" disabled>
              검색 조건을 설정해주세요.
              </button> 
          )}
             
        </div>
    
      </div>
      {showArea && (
              <div className="custom-modal-content custom-modal-box-whole">

                      {/* 시/도 */}
                      <div className="items-container scrollable-container">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleClickWorkArea(item.type)}
                                className={`custom-modal-box ${SelectWorkArea === item.type ? 'select' : ''}`}
                            >
                                {item.title}
                            </div>
                        ))}
                      </div>
                    {/* </Modal.Body> */}

                      {/* 시/군/구 */}
                    {showCityItems && (
                      <div className="city-items-container scrollable-container">
                          {items_city
                              .filter((cityItem) => cityItem.type === SelectWorkArea)
                              .map((cityItem, index) => (
                                  <div
                                      key={index}
                                      onClick={() => CityhandleClickWorkArea(cityItem.title)}
                                      className={`custom-modal-box ${citySelectWorkArea === cityItem.title ? 'select' : ''}`}
                                  >
                                      {cityItem.title}
                                  </div>
                              ))}
                      </div>
                    )}
                      

                    {/* 동/읍/면 */}
                    {showDongItems && (
                          <div className="dong-items-container scrollable-container">
                          {items_dong
                            .filter((dongItem) => dongItem.type === citySelectWorkArea)
                            .map((dongItem, index) => (
                              <div
                                key={index}
                                onClick={() => DonghandleClickWorkArea(dongItem.title)}
                                className={`custom-modal-box1 ${dongSelectWorkArea === dongItem.title ? 'select' : ''}`}
                              >
                                {dongItem.title}
                              </div>
                            ))}
                        </div>
                      )}
              </div>
              )}
              {/* 희망 근무 지역 여러개 선택 */}
              {/* <div className="addedWorkArea-style">
              {addedWorkAreas.length > 0 && (     
                  <div className="added-work-areas left-align-footer">
                      {addedWorkAreas.map((workArea, index) => (
                          <div key={index}>
                            {workArea}
                            <button className="close" onClick={() => removeWorkArea(workArea)}>   
                                x
                            </button>
                          </div>
                      ))}
                  </div>
              )}
              </div> */}
        <DamnrankBoard />
    </div>
  );
};

export default Page3Header;
