import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useHistory, Link, useLocation } from "react-router-dom";
import damnBreadLogo from "../assets/img/damnBread_logo.png";
import "../assets/css/Login.css";
import Swal from "sweetalert2";

function DamnprofileApply() {

    const history = useHistory();

    const sessionToken = sessionStorage.getItem('token');

    useEffect(() => {
        profileApplyFirst();
      }, []);

    const location = useLocation();
    console.log("ll: ", location.state.postid);
      

    function profileApplyFirst() {
        axios
            .get(`http://localhost:3000/mypage/requestlist/${location.state.postid}/appliance`, {
              headers: {
                Authorization: "Bearer " + sessionToken
              }
            })
        .then(async response => {
            console.log(response);
            
        })
        .catch((error) => {
            if (error.response.status === 400) {
                Swal.fire({
                  icon: "warning",
                  title: "경고",
                  text: "로그인 또는 회원가입이 필요한 서비스입니다. 로그인 또는 회원가입을 해주세요.",
                  showCancelButton: true,
                  confirmButtonText: "확인",
                  cancelButtonText: "취소",
                  width: 800,
                  height: 100,
              }).then((res) => {
                  if (res.isConfirmed) {
                       //삭제 요청 처리
                      history.push('/Login'); // SignUP으로 url 이동
                      window.scrollTo(0, 0);   //새 페이지로 이동한 후 화면이 맨 위로 스크롤
                  }
              });
            }
        });
    };
    
    return(
        <div>
                
        </div>
        
    )

}
 
export default DamnprofileApply;