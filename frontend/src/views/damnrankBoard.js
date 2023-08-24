import React from "react";
import "../assets/css/damnrankBoard.css";
import rank from "../assets/img/damnRank.png";

const damnrankBoard = () => {
  return (
    <div className="custom-modal-content-rank11">
      <img src={rank} width="40" alt="rank"/>
      <label className="label-margin" style={{zIndex: 1}}><b>새로운 인재</b></label>
    </div>
  );
};

export default damnrankBoard;