import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from 'react-cookie';
import { Link } from "react-router-dom";
import Header from "../components/Headers/Header";
import Button from "@mui/material/Button";
import "../assets/css/damnstory.css";
import "../components/Footers/Footer";

const damnstoryDetail = () => {

    return (

        <div className="damnstorywhole">
            <Header />
        </div>

    );
};
export default damnstoryDetail;