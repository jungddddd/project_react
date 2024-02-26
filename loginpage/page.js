"use client"
import styled from "styled-components";
import Header from "../components/Header";
import LoginButton from "../components/LoginButton";
import React, { useEffect, useState,forwardRef } from "react";
import { checkLogIn } from "../helper/helper";
const LoginPage =  forwardRef((props,ref) => {

  const maintext = "한번의 로그인으로\n당신의 열정을 공유하세요";
  const subtext = "당신의 열정을 기록하고, 공유하세요, 맞춤형 행사를 찾아보세요\n담앗콘이 당신의 빛나는 청춘과 함께합니다.";
  
  const clientID = "606562447967-0ibkhonkgjq05l5hahoejj0ncnh8iln5.apps.googleusercontent.com"
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    checkLogIn();
    }, [])

  useEffect(() => {
    setIsLoading(false); // Mark loading as false when done
  }, []);

  const handleGoogleLogin = () =>{
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${clientID}
		&redirect_uri=${redirect_uri}
		&response_type=code
		&scope=email profile`;
  }

  const handleKakaoLogin = () =>{

  }


  return (
    <>
    {isLoading ? null :
    <OuterFrame>
    <Header></Header>
    <PageSection>
    <Frame>
      <Background src ={"/images/img_login_background.png"}></Background>
      <Maintext>{maintext}</Maintext>
      <Subtext>{subtext}</Subtext>
      <LoginButtonsFrame>
      <LoginButton onClick={handleKakaoLogin}  backgroundColor="#FAE714" logoImg={"/images/img_kakao_logo.png"} text={"카카오로 시작하기"} ></LoginButton>
      <LoginButton onClick={handleGoogleLogin} backgroundColor="#FFFFFF" logoImg={"/images/img_google_logo.png"} text={"구글로 시작하기"} ></LoginButton>
      </LoginButtonsFrame>
    </Frame>
    </PageSection>
    </OuterFrame>} 
    </>
  );
});

const PageSection = styled.div`
position: absolute;
display: flex;
top : 68px;
bottom : 0px;
width: 97.75%;
border-radius: 30px 30px 0px 0px;
background-color: white;
overflow: hidden;
`;

const OuterFrame = styled.div`
position: absolute;
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const Frame = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const Background = styled.img`
position: absolute;
width: 100%;
background: center/cover no-repeat;
object-fit: cover;
`;

const Maintext = styled.text`
position: relative;
font-family: "PretendardBold";
font-size: 85px;
color: black;
margin-top: 187px;
white-space: pre-wrap;
text-align: center;
`;

const Subtext = styled.text`
position: relative;
font-family: "PretendardSemiBold";
font-size: 20px;
color: black;
margin-top: 36px;
white-space: pre-wrap;
text-align: center;
`;

const LoginButtonsFrame = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 79px;
gap: 22px;
`;

LoginPage.displayName = "LoginPage"; // displayName 설정

export default LoginPage;
