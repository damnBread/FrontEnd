import React from "react";
import "../assets/css/damnrankBoard.css";
import rank from "../assets/img/damnRank.png";

const damnrankBoard = () => {
  return (
    <div className="custom-modal-content-rank11">
      <img src={rank} width="35" alt="rank" style={{marginTop: '-10px'}}/>
      <label className="label-margin" style={{zIndex: 1}}><b>인재 랭킹</b></label>
    </div>
  );
};

export default damnrankBoard;