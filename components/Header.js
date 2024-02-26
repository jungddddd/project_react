"use client"
import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';
import React,{useState,useEffect} from "react";
import { addDisplayFilter, addFilter} from "../actions/Actions";
import { useRouter } from 'next/navigation';
import { useDispatch,useSelector } from "react-redux";
import { isLogIn } from "../helper/helper";
const Header = () => {

  const logoImg = "images/LogoText.png"
  const magnifierImg = "images/Magnifier_Emoji.png"
  const memberImg = "images/Member.png"
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [userName,setuserName] = useState("로그인 하기");
  const [userProfile,setuserProfile] = useState("images/Member.png");

  const router = useRouter();
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setisLoggedIn(isLogIn());
  }, [])

  useEffect(() => {
    const loadUserProfile = async (accessToken) =>{
      try{
      await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/member`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
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
    if(isLogIn){loadUserProfile(localStorage.getItem("accessToken"))}
  }, [])
  
  const handleSubmit = (event) =>{
    if(event.key === "Enter") {
      router.push("/searchpage")
      dispatch(addFilter("검색어 : "+inputText))
    }
  }

  const handleOnClickLogin = () =>{
      router.push("/loginpage")
  }

  return (
    <Frame>
      <Logo src={logoImg} onClick={() => router.push("/mainpage")}></Logo>
      <SearchFieldFrame>
        <SearchLogo src = {magnifierImg}></SearchLogo>
        <SearchField placeholder = {"지금 핫한 공모전 찾아보기!!"} onChange={(event) => setInputText(event.target.value)} onKeyDown={(event) => handleSubmit(event)} ></SearchField>
      </SearchFieldFrame>
      <Tab>
        <TabText>홈페이지</TabText>
        <TabText onClick={() => router.push("/mypage")}>마이페이지</TabText>
        <TabText>등록하기</TabText>
      </Tab>
      <UserFrame>
        {
          isLoggedIn ? 
          <>
          <ProfilePic src = {userProfile}></ProfilePic>
          <UserName onClick={handleOnClickLogin}>{userName}</UserName>
          </>
          :
          <>
        <ProfilePic src = {memberImg}></ProfilePic>
        <UserName onClick={handleOnClickLogin}>로그인 하기</UserName>
          </>
        }
      </UserFrame>
    </Frame>
  );
};

const Frame = styled.div `
position: relative;
display: flex;
flex-direction: row;
align-items: center;
height: 65px;
width: 100%;
background-color: white;
white-space: nowrap;
`;

const Logo = styled.img`
position: relative;
width: 95px;
height: 31px;
margin-left: 43px;
object-fit: cover;
`;

const Tab = styled.div`
position: relative;
display: flex;
margin-left: 66px;
gap: 60px;
flex-direction: row;
`;

const TabText = styled.div`
position: relative;
font-family: "PretendardBold";
font-size: 15;
`;

const SearchFieldFrame = styled.div`
position: relative;
display: flex;
flex-direction: row;
align-items: center;
margin-left: 29px;
min-width: 300px;
width: 399px;
height: 39px;
border-radius: 50px;
background-color: var(--color-darkturquoise);
border: none;
`;

const SearchField = styled.input`
position: relative;
margin-left: 11px;
width: 353px;
height: 100%;
font-family: "PretendardBold";
font-size: 15;
color: white;
outline: none;
box-shadow: none;
border: none;
background: transparent;

&::placeholder{
  color: white;
}
`;

const SearchLogo = styled.img`
position: relative;
margin-left: 14px;
width: 21px;
height: 21px;
object-fit: cover;
`;

const SearchPlaceHolder = styled.div`
position: relative;
margin-left: 11px;
font-family: "PretendardBold";
font-size: 15;
color: white;
`;


const UserFrame = styled.div`
position: absolute;
right: 50px;
display: flex;
flex-direction: row;
align-items: center;
flex-direction: row;
gap:11px;
`;

const ProfilePic = styled.img`
position: relative;
width: 30px;
height: 30px;
margin-left: 630px;
border-radius: 30px;
object-fit: cover;
`;

const UserName = styled.div`
position: relative;
font-family: "PretendardBold";
font-size: 15px;
`;

export default Header;
