import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Headers/Header";
import "../assets/css/damnstory.css";
import "../components/Footers/Footer";

const sectionStyle = {
    textDecoration: 'none',
    color: 'black',
};

const DamnstoryDetail = () => {
    const { storyid } = useParams(); // Change 'id' to 'storyid'
    const [post, setPost] = useState(null); // Change 'posts' to 'post'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/damnstory/${storyid}`);
                console.log(response);
                setPost(response.data); // Change 'setPosts' to 'setPost'
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [storyid]);

    return (
        <div className="damnstorydetailwhole">
            <Header />
            <div className="damnstorydetailcontainer">
                <div className="damnstorydetail">
                    {post && ( // Only render if post is not null
                        <div className="damnstorydetail1" style={sectionStyle}>
                            <div className="damnstorydetailtitle">{post.title}</div>
                            <div className="damnstorydetailcontent">{post.content}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DamnstoryDetail;
