import React, { useState } from "react";
import Header from "../components/Headers/Header";
import "../assets/css/Page3Header.css";
import DamnrankBoard from "./damnrankBoard";
import selecticon from "../assets/img/select-icon.png";
import Swal from "sweetalert2";
import {items, items_city, items_dong} from '../components/CityItem.js'
import workstaff from "../assets/img/workicon-staff.png";
import workcoffeebeans from "../assets/img/workicon-coffeebeans.png";
import workcustomer from "../assets/img/workicon-customer.png";
import workdelivery from "../assets/img/workicon-delivery.png";
import workdesign from "../assets/img/workicon-design.png";
import workknife from "../assets/img/workicon-knife.png";
import workeducation from "../assets/img/workicon-education.png";
import workmedia from "../assets/img/workicon-media.png";
import workplatter from "../assets/img/workicon-platter.png";
import worksale from "../assets/img/workicon-sale.png";
import workbackground from "../assets/img/workicon-background.png";

const Page3Header = () => {

  const [showArea, setShowArea] = useState(false);      //지역
  const [showJob, setShowJob] = useState(false);        //업직종
  const [showConditions, setShowConditions] = useState(false);    //세부조건

  const [imageRotationArea, setImageRotationArea] = useState(0); 
  const [imageRotationJob, setImageRotationJob] = useState(0);
  const [imageRotationCondi, setImageRotationCondi] = useState(0);

    const [showCityItems, setShowCityItems] = useState(true);  //시/군/구
    const [showDongItems, setShowDongItems] = useState(true);  //동/읍/면

    //지역
    const [SelectWorkArea, setSelectWorkArea] = useState("");  //시/도 선택
    const [citySelectWorkArea, setCitySelectWorkArea] = useState("");  //시/군/구 선택
    const [dongSelectWorkArea, setDongSelectWorkArea] = useState(""); //동/읍/면 선택
    const [addedWorkAreas, setAddedWorkAreas] = useState([]);

    const [SelectWorkJob, setSelectWorkJob] = useState([]);  //업직종 선택 
    const [activeWorkJob, setActiveWorkJob] = useState('');  //색 변경

    const [selectedGenders, setSelectedGenders] = useState([]);  // 성별

    const [selectedAges, setSelectedAges] = useState([]);   //나이
    const [InputAge, setInputAge] = useState("");

    const handleToggleArea = () => {
      setShowArea(prevState => !prevState);
      setImageRotationArea(prevRotation => (prevRotation === 0 ? 180 : 0));
      setShowJob(false);
      setShowConditions(false);
    };
  
    const handleToggleJob = () => {
      setShowJob(prevState => !prevState);
      setImageRotationJob(prevRotation => (prevRotation === 0 ? 180 : 0));
      setShowArea(false);
      setShowConditions(false);
    };
  
    const handleToggleConditions = () => {
      setShowConditions(prevState => !prevState);
      setImageRotationCondi(prevRotation => (prevRotation === 0 ? 180 : 0));
      setShowArea(false);
      setShowJob(false);
    };
  
    const shouldApplyActiveStyle = (clickedElement) => {
      return clickedElement === true;
    };

  

  //지역
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
      
        const addWorkArea = SelectWorkArea + " " + citySelectWorkArea + " " + dongItem;

        if (!addedWorkAreas.includes(addWorkArea)) {
          setAddedWorkAreas(prevWorkAreas => [...prevWorkAreas, addWorkArea]);
        } else {
          Swal.fire({
            icon: "warning",
            title: "경고",
            text: "이미 선택된 지역입니다.",
            showCancelButton: false,
            confirmButtonText: "확인",
            width: 800,
            height: 100,
          }).then((res) => {});
        }

        console.log(addWorkArea);
  }

  const removeWorkArea = (workAreaToRemove) => {    //지역 하나씩 삭제
    setAddedWorkAreas(prevWorkAreas =>
      prevWorkAreas.filter(workArea => workArea !== workAreaToRemove)
    );
  }



  //업직종
  const handleWorkJobClick = (job) => {
    if (SelectWorkJob.includes(job)) {
      setSelectWorkJob((prevSelected) =>
        prevSelected.filter((selectedJob) => selectedJob !== job)
      );
    } else if (!SelectWorkJob.includes(job)) {
        setActiveWorkJob(job);
        setSelectWorkJob((prevSelected) => [...prevSelected, job]);
    } else {
      
    }
  };

  const removeWorkJob = (workJobToRemove) => {    //업직종 하나씩 삭제
    setSelectWorkJob(prevWorkJobs =>
      prevWorkJobs.filter(workJob => workJob !== workJobToRemove)
    );
    }  



//세부조건 -> 성별
    const handleGenderClick = (gender) => {
      if (selectedGenders.includes(gender)) {
        setSelectedGenders(selectedGenders.filter(item => item !== gender));
      } else {
        setSelectedGenders([...selectedGenders, gender]);
      }
    };

  const removeGender = (GenderToRemove) => {    //성별 하나씩 삭제
    setSelectedGenders(prevGender =>
      prevGender.filter(gender => gender !== GenderToRemove)
    );
    }  

//세부조건 -> 나이
const handleInputAge = (event) => {
  setInputAge(event.target.value);
};

const handleAgeClick = () => {
  if (InputAge && !selectedAges.includes(InputAge)) {
    setSelectedAges([...selectedAges, InputAge]);
    setInputAge('');
  }
};

const removeAge = (AgeToRemove) => {    //나이 하나씩 삭제
    setSelectedAges(prevAges =>
      prevAges.filter(age => age !== AgeToRemove)
    );
  }  

  function onClickSelect() {

  }

  return (
    <div>
      <Header />
      <div className="items-align-rank">
        <div>
          <div>
              <button type="button" onClick={handleToggleArea} className="filter-rank">
                지역
                <img src={selecticon} alt="selecticon" className="select-icon" width="15" style={{marginLeft: "30px", transform: `rotate(${imageRotationArea}deg)`}}/>
              </button> 

              <button type="button" onClick={handleToggleJob} className="filter1-rank">
                업직종
                <img src={selecticon} alt="selecticon" className="select-icon" width="15" style={{marginLeft: "30px", transform: `rotate(${imageRotationJob}deg)`}}/>
              </button> 

              <button type="button" onClick={handleToggleConditions} className="filter1-rank">
                상세조건
                <img src={selecticon} alt="selecticon" className="select-icon" width="15" style={{marginLeft: "30px", transform: `rotate(${imageRotationCondi}deg)`}}/>
              </button> 

              <button type="button" onClick={onClickSelect} className="filter-select-rank">적용</button> 
          </div>             
        </div>
    
      </div>

      {/* 지역 */}
      {showArea && (
              <div className="custom-modal-content-rank custom-modal-box-whole-rank">

                      {/* 시/도 */}
                      <div className="items-container-rank scrollable-container-rank">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleClickWorkArea(item.type)}
                                className={`custom-modal-box-rank ${SelectWorkArea === item.type ? 'select-rank' : ''}`}
                            >
                                {item.title}
                            </div>
                        ))}
                      </div>

                      {/* 시/군/구 */}
                    {showCityItems && (
                      <div className="city-items-container-rank scrollable-container-rank">
                          {items_city
                              .filter((cityItem) => cityItem.type === SelectWorkArea)
                              .map((cityItem, index) => (
                                  <div
                                      key={index}
                                      onClick={() => CityhandleClickWorkArea(cityItem.title)}
                                      className={`custom-modal-box-rank ${citySelectWorkArea === cityItem.title ? 'select-rank' : ''}`}
                                  >
                                      {cityItem.title}
                                  </div>
                              ))}
                      </div>
                    )}
                      

                    {/* 동/읍/면 */}
                    {showDongItems && (
                          <div className="dong-items-container-rank scrollable-container-rank">
                          {items_dong
                            .filter((dongItem) => dongItem.type === citySelectWorkArea)
                            .map((dongItem, index) => (
                              <div
                                key={index}
                                onClick={() => DonghandleClickWorkArea(dongItem.title)}
                                className={`custom-modal-box1-rank ${dongSelectWorkArea === dongItem.title ? 'select-rank' : ''}`}
                              >
                                {dongItem.title}
                              </div>
                            ))}
                        </div>
                      )}
              </div>
              )}

              {/* 업직종 */}
              {showJob && (
                <div className="custom-modal-content-rank1">
                                <div className="work-icon">
                                    <div className={`icon-style ${SelectWorkJob.includes('카페') ? 'active' : ''}`} style={{position: "relative", left: "110px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('카페')}>
                                          <img src={workbackground} width="130" alt="cafeImage1"/>
                                            <span style={{position: "absolute", top: "32px", left:"40px"}}>
                                              <img src={workcoffeebeans} id="카페" width="65" alt="cafeImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "400px", left:"530px"}}>
                                          <b>카페</b>
                                      </span>
                                    
                                    <span>
                                      <div className={`icon-style ${SelectWorkJob.includes('서빙') ? 'active' : ''}`} style={{position: "relative", left:"190px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('서빙')}>
                                          <img src={workbackground} width="130" alt="platterImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={workplatter} id="서빙" width="65" alt="platterImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "400px", left:"755px"}}>
                                          <b>서빙</b>
                                      </span>
                                    </span>

                                    <span>
                                      <div className={`icon-style ${SelectWorkJob.includes('판매') ? 'active' : ''}`} style={{position: "relative", left:"270px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('판매')}>
                                          <img src={workbackground} width="130" alt="saleImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={worksale} id="판매" width="65" alt="saleImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "400px", left:"980px"}}>
                                          <b>판매</b>
                                      </span>
                                    </span>

                                    <span>
                                      <div className={`icon-style ${SelectWorkJob.includes('주방 보조') ? 'active' : ''}`} style={{position: "relative", left:"350px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('주방 보조')}>
                                          <img src={workbackground} width="130" alt="knifeImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={workknife} id="주방 보조" width="65" alt="knifeImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "400px", left:"1190px"}}>
                                          <b>주방 보조</b>
                                      </span>
                                    </span>

                                    <div>
                                      <div className={`icon-style ${SelectWorkJob.includes('배달') ? 'active' : ''}`} style={{position: "relative", left:"430px", top: "50px"}}>
                                        <button className="icon-style" onClick={() => handleWorkJobClick('배달')}>
                                          <img src={workbackground} width="130" alt="deliveryImage1"/>
                                            <span style={{position: "absolute", top: "37px", left:"40px"}}>
                                              <img src={workdelivery} id="배달" width="65" alt="deliveryImage2"/>
                                            </span>
                                        </button>
                                      </div>
                                      <span style={{position: "absolute", top: "400px", left:"1432px"}}>
                                          <b>배달</b>
                                      </span>
                                    </div>
                                  </div>

                                  <div className="work-icon">
                                    <div className={`icon-style ${SelectWorkJob.includes('교육') ? 'active' : ''}`} style={{position: "relative", left: "110px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('교육')}>
                                            <img src={workbackground} width="130" alt="educationImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workeducation} id="교육" width="65" alt="educationImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "650px", left:"530px"}}>
                                            <b>교육</b>
                                        </span>

                                        <div className={`icon-style ${SelectWorkJob.includes('스태프') ? 'active' : ''}`} style={{position: "relative", left: "190px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('스태프')}>
                                            <img src={workbackground} width="130" alt="staffImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workstaff} id="스태프"width="65" alt="staffImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "650px", left:"750px"}}>
                                            <b>스태프</b>
                                        </span>

                                        <div className={`icon-style ${SelectWorkJob.includes('생산') ? 'active' : ''}`} style={{position: "relative", left: "270px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('생산')}>
                                            <img src={workbackground} width="130" alt="designImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workdesign} id="생산" width="65" alt="designImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "650px", left:"980px"}}>
                                            <b>생산</b>
                                        </span>

                                        <div className={`icon-style ${SelectWorkJob.includes('미디어') ? 'active' : ''}`} style={{position: "relative", left: "350px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('미디어')}>
                                            <img src={workbackground} width="130" alt="mediaImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workmedia} id="미디어" width="65" alt="mediaImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "650px", left:"1200px"}}>
                                            <b>미디어</b>
                                        </span>

                                        <div className={`icon-style ${SelectWorkJob.includes('고객 상담') ? 'active' : ''}`} style={{position: "relative", left: "430px", top: "170px"}}>
                                          <button className="icon-style" onClick={() => handleWorkJobClick('고객 상담')}>
                                            <img src={workbackground} width="130" alt="customerImage1"/>
                                              <span style={{position: "absolute", top: "35px", left:"38px"}}>
                                                <img src={workcustomer} id="고객 상담" width="65" alt="customerImage2"/>
                                              </span>
                                          </button>
                                        </div>
                                        <span style={{position: "absolute", top: "650px", left:"1420px"}}>
                                            <b>고객 상담</b>
                                        </span>
                                    </div>
                                    <div className="margin"/>
                                    </div>
              )}


              {/* 세부조건 */}
              {showConditions && (
                <div  className="custom-modal-content-rank1">
                    <div>
                      <label className="label-style" style={{zIndex: 1}}><b>성별</b></label>
                      
                          <button
                            type="button"
                            className={`gender-style1 ${selectedGenders.includes('남') ? 'gender-select-style' : ''}`}
                            onClick={() => handleGenderClick('남')}
                          >
                            남
                          </button>

                          <button
                            type="button"
                            className={`gender-style ${selectedGenders.includes('여') ? 'gender-select-style' : ''}`}
                            onClick={() => handleGenderClick('여')}
                          >
                            여
                          </button>

                          <button
                            type="button"
                            className={`gender-style ${selectedGenders.includes('무관') ? 'gender-select-style' : ''}`}
                            onClick={() => handleGenderClick('무관')}
                          >
                            무관
                          </button>
                        </div>

                    <div>
                      <label className="label-style1" style={{zIndex: 1}}><b>연령</b></label>
                      <label className="label-style2 inputAge-label-style">만 
                      <input type='text' className="inputAge-style" id='age' name='age' placeholder="0" value={InputAge}
                             onChange={handleInputAge} style={{width: "150px"}} />
                             <label className="inputAge-label-style" style={{marginLeft: "10px", marginRight: "30px"}}>세 이상</label>
                        <button type='button' onClick={handleAgeClick} className="inputAge-btn-style" disabled={!InputAge}>확인</button>   
                      </label>

                    </div>

                    <div>
                      <label className="label-style1" style={{zIndex: 1}}><b>경력</b></label>

                    </div>


                    <div className="margin-bottom-conditions" />
                  </div>
                  

              )}
          {(
              <button
              type="button"
              className="default-filter-rank added-work-areas-rank"
            >
                {(
                  <span className="left-align-footer-rank">
                    {addedWorkAreas.map((workArea, index) => (
                      <div key={index}
                      className={`addedWorkArea-style-rank ${shouldApplyActiveStyle(workArea) ? 'active' : ''}`}>
                        {workArea}
                        <button
                          className="close-rank"
                          onClick={() => removeWorkArea(workArea)}
                        >
                          x
                        </button>
                      </div>
                    ))}
                  

                  {SelectWorkJob.map((workJob, index) => (
                    <div key={index}
                    className={`addedWorkArea-style-rank ${shouldApplyActiveStyle(workJob) ? 'active' : ''}`}>
                      {workJob}
                      <button
                        className="close-rank"
                        onClick={() => removeWorkJob(workJob)}
                      >
                        x
                      </button>
                    </div>
                  ))}

                    {selectedGenders.map((gender, index) => (
                      <div key={index}
                      className={`addedWorkArea-style-rank ${shouldApplyActiveStyle(gender) ? 'active' : ''}`}>
                        {gender}
                        <button
                          className="close-rank"
                          onClick={() => removeGender(gender)}
                        >
                          x
                        </button>
                      </div>
                    ))}

                        {selectedAges.map((age, index) => (
                          <span key={index} className={`addedWorkArea-style-rank ${shouldApplyActiveStyle(age) ? 'active' : ''}`}>
                            {age}세
                            <button
                              className="close-rank"
                              onClick={() => removeAge(age)}
                            >
                              x
                            </button>
                          </span>
                        ))}
                    </span>
                    )}
            </button>
            
          )}
        <DamnrankBoard />
    </div>
  );
};

export default Page3Header;
