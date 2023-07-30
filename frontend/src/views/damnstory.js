import React from "react";
import Header from "../components/Headers/Header";
import "../assets/css/damnstory.css";

const SectionDataWrite = [
    {
        title: '비오니까 일자리도 없다',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가..',
        nickname: '전 메디니언', 
        time: '2분전',
        url: ''
    },

    {
        title: '이번시간에는 퍼싸아ㅏㅏㅏ드',
        post: '막쏘 먹고싶다 아니야 그냥 다 먹고싶은거같아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ헤헿',
        nickname: '전 메디니언', 
        time: '2분전',
        url: ''
    },
    {
        title: '비오니까 일자리도 없다 ㅡㅇ아아아아 너무 더워',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가가가 가능하나나나나나나',
        nickname: '전 메디니언', 
        time: '2분전',
        url: ''
    },
    {
        title: '비오니까 일자리도 없다 ㅡㅇ아아아아 너무 더워',
        post: '주말에만 단기알바 했는데 객실 관리가 꿀이라 쏠쏠했는데 이번주는 자리가가가 가능하나나나나나나',
        nickname: '전 메디니언', 
        time: '2분전',
        url: ''
    }
];

const SectionData = [
    {
      title: '공지사항',
      postTitle: '게시물 제목입니다다ㅏㅏㅏ',
      date: '2023-07-29',
      url: 'https://example.com/notice',
    },
    {
      title: '공지사항',
      postTitle: '다른 게시물 제목입니다다ㅏㅏㅏ',
      date: '2023-08-01',
      url: 'https://example.com/another-notice',
    },
];

const sectionStyle = {
    textDecoration: 'none',
    color: 'black',
  };

const damnstory = () => {


    return (
        <div className="damnstorywhole">
            <Header />
            <div className="damnstory">
                <p>땜빵썰</p>

                <div className="damnstorycontainer">
                    <div className="damnstorycount">총 n건</div> 
                    <div className="damnstorysearch">
                    <input type="text" placeholder="제목+본문 검색" />
                    {/* 작성일, 제목검색 추가하기 */}
                </div>

                </div>

                <div className="brown-line1"></div>

                <div className="damnstoryannomain">
                    {SectionData.map((section, index) => (
                        <a key={index} href={section.url} style={sectionStyle}>
                        <div className="damnstoryannowhole">
                            <div className="damnstoryanno" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="leftdamnstoryanno">
                                <p className="annotext" style={{ whiteSpace: 'nowrap' }}>{section.title}</p>
                            </div>
                            <div className="middamnstoryanno" style={{ display: 'flex', justifyContent: 'left', flex: 1 }}>
                                <p className="annotext" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{section.postTitle}</p>
                            </div>
                            <div className="rightdamnstoryanno">
                                <p className="annotext">{section.date}</p>
                            </div>
                            </div>
                            <div className="gray-line1"></div>
                        </div>
                        </a>
                    ))}
                </div>

                
                <div className="damnstoryboard">
                    {SectionDataWrite.map((section, index) => (
                        <a key={index} href={section.url} style={sectionStyle}>
                            <div className="damnstoryboardtitle">{section.title}</div>
                            <div className="damnstoryboardcontent">{section.post}</div>
                            <div className="damnstoryboardnickname">{section.nickname} | {section.time}</div>
                            <div className="gray-line1"></div>
                        </a>
                    ))}
                    
                </div>


            </div>
        </div>

    );
};

export default damnstory;