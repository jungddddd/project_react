"use client";
import styled from "styled-components";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { events } from "@/app/API";
import ProjectPost from "../components/ProjectPost";
import { useSelector } from "react-redux";
import { checkLogIn,isLogIn } from "../helper/helper";
import { useRouter } from "next/navigation";

const MyPage = () => {

  const tempdata = events.results.dedlines;

  const img_mypage_banner = "images/img_mypage_banner.jpg"
  const ic_arrow_black = "images/ic_arrow_black.png"
  const [userName,setuserName] = useState("");
  const [userProfile,setuserProfile] = useState("");
  const [heartEvents, setheartEvents] = useState([])
  const rounter = useRouter();
  const interests = ["IT","디자인","박람회","공모전"];

  useEffect(() => {
    const loadUserProfile = async () =>{
      try{
      await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/member`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res)=>res.json())
      .then((res)=>{
        setuserName(res.data.username);
        setuserProfile(res.data.profile)
      })
    }
    catch(error){
      console.log(error);
    }
    }
    if(isLogIn){loadUserProfile()}
  }, [])

  useEffect(() => {
  if(!checkLogIn()){rounter.push("/loginpage")}
  }, [])

  const formatDate = (dateString) =>{
    const date = new Date(dateString);
    const dateArray = ["월","화","수","목","금","토","일"]

    var month = String(date.getMonth()+1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var dayName = dateArray[date.getDay()];
    
    return `${month}월 ${day}일 (${dayName})`
  }

  useEffect(() => {
    const handleInit = async() => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/member/mypage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
      })
      .then((res)=>res.json())
      .then((res)=>{
        setinterests(res.data.memberInfo.interest);
        setheartEvents(res.data.heartEvents)
      })
    } catch (error) {
      console.log(error);
    }
  }
  handleInit();
  }, [])

  return (
    <OuterFrame>
      <Header></Header>
      <PageSection>
        <Frame>
          <Banner src = {img_mypage_banner}></Banner>
          <UserBannerFrame>
            <UserBanner>
              <UserDataFrame>
                <UserName>{userName}</UserName>
                <UserTagsList>
                  {interests.map((interest,index)=>{
                    return (<UserTag key = {index}>{interest.category_name}</UserTag>)
                  })}
                </UserTagsList>
              </UserDataFrame>
                <UserDataSectionGrid>
                  {[...Array(4).keys()].map((value, index) => {
                    return (
                      <UserDataSection key = {index}>
                        <UserDataSectionHeaderRow>
                          <UserDataSectionTitle>게시물 수</UserDataSectionTitle>
                          <UserDataSectionArrow src = {ic_arrow_black}></UserDataSectionArrow>
                        </UserDataSectionHeaderRow>
                        <UserDataSectionCounter>2 개</UserDataSectionCounter>
                      </UserDataSection>
                    );
                  })}
                </UserDataSectionGrid>
            </UserBanner>
            <UserProfilePic src = {userProfile} ></UserProfilePic>
          </UserBannerFrame>
          <BookmarkFrame>
          <Title>
            <span>좋</span>
            아요 목록
          </Title>
          <ResultGrid>
            {heartEvents.map((eventinfo, index) => {
              return (
                <ProjectPost
                  key={index}
                  title={eventinfo.title}
                  category={eventinfo.category}
                  date={formatDate(eventinfo.startDate)}
                  deadline={eventinfo.remainDate}
                  poster_path={eventinfo.thumbnail}
                  currentLiking = {true}
                ></ProjectPost>
              );
            })}
          </ResultGrid>
          </BookmarkFrame>
        </Frame>
      </PageSection>
    </OuterFrame>
  );
};

const PageSection = styled.div`
  position: relative;
  display: flex;
  width: 97.75%;
  border-radius: 30px 30px 0px 0px;
  background-color: white;
  overflow: hidden;
`;

const OuterFrame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Frame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #F6F6F6;
`;

const Banner = styled.img`
  position: absolute;
  width: 100%;
  height: 323px;
  object-fit: cover;
  object-fit: cover;
`;

const UserBannerFrame = styled.div`
  position: relative;
  margin-top: 139px;
  width: 1496px;
  height: 257px;
`;

const UserBanner = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: 54px;
  width: 100%;
  height: 203px;
  border-radius: 30px;
  background-color: white;
`;

const UserProfilePic = styled.img`
  position: absolute;
  top: 0px;
  left: 40px;
  width: 218px;
  height: 218px;
  border-style: solid;
  border-width: 9px;
  border-radius: 60px;
  border-color: #3BC1C6;
  object-fit: cover;
  
`;

const UserDataFrame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  margin-left: 290px;
  width: 327px;
`;

const UserName = styled.div`
  position: relative;
  font-family: "PretendardBold";
  color: black;
  font-size: 35px;
`;

const UserTagsList = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 9px;
  flex-wrap: wrap;
`;

const UserTag = styled.div`
  position: relative;
  display: flex;
  padding-right: 14px;
  padding-left: 14px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-width: 1.5px;
  border-color: black;
  border-radius: 100px;
  border-style: solid;
  font-family: "PretendardMedium";
  font-size: 13px;
  color: black;
`;

const UserDataSectionGrid = styled.div`
  position: relative;
  margin-left: 136px;
  margin-top: 32px;
  display: grid;
  width: 510px;
  height: 138px;
  grid-template-columns: 158px 158px; // 1fr 3fr 1fr과 똑같을까..?
  grid-template-rows: 53px 53px;
  row-gap: 32px;
  column-gap: 194px;
`;

const UserDataSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const UserDataSectionHeaderRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserDataSectionTitle = styled.div`
  position: relative;
  font-family: "PretendardMedium";
  color: black;
  font-size: 17px;
  white-space: nowrap;
`;

const UserDataSectionArrow = styled.img`
  position: relative;
  margin-left: 87px;
  width: 9px;
  height: 15px;
  object-fit: cover;
`;

const UserDataSectionCounter = styled.div`
  position: relative;
  margin-top: 13px;
  font-family: "PretendardMedium";
  color: black;
  font-size: 17px;
`;

const BookmarkFrame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 1476px;
`;

const Title = styled.div`
  position: relative;
  margin-left: 2px;
  font-family: "PretendardBold";
  font-size: 25px;
  color: black;

  span {
    color: var(--color-darkturquoise);
  }
`;

const ResultGrid = styled.div`
  position: relative;
  display: flex;
  width: 1476px;
  margin-top: 23px;
  /* padding-top: 20px;
  padding-bottom: 60px; */
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
`;

export default MyPage;
