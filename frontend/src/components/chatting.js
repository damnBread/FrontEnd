import React from "react";
import "../assets/css/Chatting.css";
import { Fab } from '@mui/material';
import FABicon from '../assets/img/chatting-icon.png';

function Chatting() {

    function onClickChatting() {
        console.log("CLICK FAB");

    }

    return (
        <div className="chatting-style">
            <Fab onClick={onClickChatting} size="large" color="warning">
                <img src={FABicon} width="30px"/>
            </Fab>
        </div>
    );

}

export default Chatting;