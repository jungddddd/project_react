"use client"
import styled from "styled-components";
import Header from "../components/Header";
import React,{useState,useEffect} from "react";
import ic_clock from "images/ic_clock.png"
import ic_form from "images/ic_form.png"
import ic_coin from "images/ic_coin.png"
import ic_pin from "images/ic_pin.png"
import ic_blackdoublearrow from "images/ic_blackdoublearrow.png"
import ic_backbutton from "images/ic_backbutton.png"
import ic_speechbubble from "images/ic_speechbubble.png"
// import autherimg from "images/autherimg.png"
import CommentPanel from "./CommentPanel";
import { useRouter,useSearchParams } from 'next/navigation';
import { checkLogIn } from "../helper/helper";
const DetailPage = () => {

  const [dataOrigin, setData] = useState([]);
  const params = useSearchParams();
  const  eventId  = params.get('eventId');


  const timedata = `${dataOrigin.eventApplyStartDate} ~ ${dataOrigin.eventApplyEndDate}`
  const deadlinedata = `${dataOrigin.eventStartDate} ~ ${dataOrigin.eventEndData}`
  const pricedata = dataOrigin.price;
  const placedata = dataOrigin.address;
  const title = dataOrigin.title;
  const categorydata = dataOrigin.categoryName;
  const profilename = dataOrigin.host;
  const wrotedate = dataOrigin.eventApplyStartDate;
  const thumb = dataOrigin.thumbnail;
  const autherimg = dataOrigin.hostProfile;
  const [content, setcontent] = useState("")
  const eventsubtitle = dataOrigin.title;
  const applyLink = dataOrigin.link;

  const commentCount = 7;
  const [isPanelOn, setisPanelOn] = useState(false);

  useEffect(() => {
    checkLogIn();
    }, [])

  useEffect(() => {
    const handleDetail = async (eventId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/event/${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        });
          const result = res.json();
          return result;
    };

   handleDetail(eventId).then(res => setData(res.data));
  }, [])

  return (
    <OuterFrame>
    <Header></Header>
    <PageSection>
    <Frame>
    <BackgroundImg src = {"images/Category5.jpg"}></BackgroundImg>
    <Foreground></Foreground>
    <PosterSection>
      <PosterInfoSection>
        <Title>{title}</Title>
        <CategoryFrameList>
          <CategoryFrame>
            <CategoryHeader>
              <CategoryHeaderEmoji src = {ic_clock}></CategoryHeaderEmoji>
              <CategoryHeaderText>일시</CategoryHeaderText>
            </CategoryHeader>
            <CategoryDetail>{timedata}</CategoryDetail>
          </CategoryFrame>
          <CategoryFrame>
            <CategoryHeader>
              <CategoryHeaderEmoji src = {ic_form}></CategoryHeaderEmoji>
              <CategoryHeaderText>신청</CategoryHeaderText>
            </CategoryHeader>
            <CategoryDetail>{deadlinedata}</CategoryDetail>
          </CategoryFrame>
          <CategoryFrame>
            <CategoryHeader>
              <CategoryHeaderEmoji src = {ic_coin}></CategoryHeaderEmoji>
              <CategoryHeaderText>비용</CategoryHeaderText>
            </CategoryHeader>
            <CategoryDetail>{pricedata}</CategoryDetail>
          </CategoryFrame>
          <CategoryFrame>
            <CategoryHeader>
              <CategoryHeaderEmoji src = {ic_pin}></CategoryHeaderEmoji>
              <CategoryHeaderText>장소</CategoryHeaderText>
            </CategoryHeader>
            <CategoryDetail>{placedata}</CategoryDetail>
          </CategoryFrame>
        </CategoryFrameList>
        <ApplyButton onClick={() => window.open(applyLink)}>
          <ApplyButtonText>신청하기</ApplyButtonText>
          <ApplyButtonArrow src = {"images/ic_blackdoublearrow.png"}></ApplyButtonArrow>
        </ApplyButton>
      </PosterInfoSection>
    </PosterSection>
    <TextPanel>
      <TextPanelFrame>
      <TextPanelHeader>
        <Category>{categorydata}</Category>
        <BackButton src = {ic_backbutton}></BackButton>
      </TextPanelHeader>
      <TextPanelTitle>{eventsubtitle}</TextPanelTitle>
      <AutherProfileFrame>
        <AutherProfilePic src = {autherimg}></AutherProfilePic>
        <AutherProfileTextFrame>
          <AutherProfileName>{profilename}</AutherProfileName>
          <AutherProfileDate>{wrotedate}</AutherProfileDate>
        </AutherProfileTextFrame>
      </AutherProfileFrame>
      {/* <Content>{content}</Content> */}
      <Thumbcontent src = {thumb}></Thumbcontent>
      </TextPanelFrame>
      {isPanelOn &&
      <CommentPanel event_id={eventId}></CommentPanel>
      }
      <CommentFrame>
        <CommentButtonFrame onClick={() => setisPanelOn((prev) => !prev)}>
          <CommentButtonIc src = {"images/ic_speechbubble.png"}></CommentButtonIc>
        </CommentButtonFrame>
        <CommentButtonCounter>{commentCount}</CommentButtonCounter>
      </CommentFrame>
    </TextPanel>
    </Frame>
    </PageSection>
    </OuterFrame>
  );
};

const OuterFrame = styled.div`
position: absolute;
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

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

const Frame = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
flex-direction: row;
border-style: solid;
  border-width: 9px;
  border-radius: 60px;
  border-color: #3BC1C6;
  overflow: hidden;
`;

const BackgroundImg = styled.img`
position: absolute;
width: 50%;
height: 100%;
object-fit: cover;
/* background-color: black; */
`;

const Foreground = styled.div`
position: absolute;
width: 50%;
height: 80%;
bottom: 0;
background: linear-gradient(180deg, rgba(59, 193, 198, 0.00) 38.91%, rgba(59, 193, 198, 0.60) 73.78%, #3BC1C6 96.7%);
/* background-color: black; */
`;

const PosterSection = styled.div`
position: relative;
width: 50%;
height: 899px;
`;


const PosterInfoSection = styled.div`
position: relative;
margin-top: 526px;
left: 46px;
display: flex;
flex-direction: column;
`;

const Title = styled.text`
position: relative;
font-family: "PretendardBold";
font-size: 67;
letter-spacing: 3px;
color: white;
`;

const CategoryFrameList = styled.div`
position: relative;
display: flex;
flex-direction: column;
gap: 12px;
margin-top: 10px;
`;

const CategoryFrame = styled.div`
position: relative;
display: flex;
flex-direction: row;
gap: 23px;
`;

const CategoryHeader = styled.div`
position: relative;
width: 72px;
height: 27px;
display: flex;
flex-direction: row;
align-items: center;
`;

const CategoryHeaderEmoji = styled.img`
position: relative;
width: 16px;
height: 16px;
margin-left: 5px;
object-fit: cover;
`;

const CategoryHeaderText = styled.text`
position: relative;
font-family: "PretendardSemiBold";
font-size: 14px;
color: white;
margin-left: 9px;
letter-spacing: 3px;
`;

const CategoryDetail = styled.text`
position: relative;
font-family: "PretendardSemiBold";
font-size: 14px;
color: white;
letter-spacing: 3px;
`;

const ApplyButton = styled.div`
position: relative;
width: 192px;
height: 65px;
display: flex;
flex-direction: row;
margin-top: 24px;
align-items: center;
background-color: white;
border-radius: 20px;
`;

const ApplyButtonText = styled.text`
position: relative;
font-family: "PretendardSemiBold";
color: black;
margin-left: 39px;
`;

const ApplyButtonArrow = styled.img`
position: relative;
width: 10.5px;
height: 7.5px;
margin-left: 40px;
object-fit: cover;
`;

const TextPanel = styled.div`
position: relative;
width: 50%;
height: 879px;
border-radius: 22px;
background-color: white;
`;

const TextPanelFrame = styled.div`
position: relative;
margin-left: 34px;
display: flex;
flex-direction: column;
`;

const TextPanelHeader = styled.div`
position: relative;
display: flex;
flex-direction: row;
align-items: center;
margin-top: 31px;
width: 662px;
height: 39px;
`;


const Category = styled.div`
position: absolute;
left: 0;
border-radius: 7px;
background-color: #3BC1C6;
padding-left: 16.5px;
padding-right: 16.5px;
padding-top: 10px;
padding-bottom: 10px;
font-family: "PretendardSemiBold";
font-size: 20px;
color: white;
`;

const BackButton = styled.img`
position: absolute;
right: 0;
width: 24.25px;
height: 22.5px;
object-fit: cover;
`;

const TextPanelTitle = styled.div`
position: relative;
margin-top: 19px;
font-family: "PretendardSemiBold";
color: black;
font-size: 35px;
`;

const AutherProfileFrame = styled.div`
position: relative;
margin-top: 31px;
display: flex;
flex-direction: row;
align-items: center;
width: 239px;
height: 54px;
`;

const AutherProfilePic = styled.img`
position: relative;
width: 54px;
height: 54px;
border-radius: 54px;
object-fit: cover;
border-style: solid;
  border-width: 2px;
  border-radius: 60px;
  border-color: #3BC1C6;
`;

const AutherProfileTextFrame = styled.div`
position: relative;
flex-direction: column;
margin-left: 17px;
gap:4px
`;

const AutherProfileName = styled.div`
position: relative;
font-family: "PretendardSemiBold";
color: black;
font-size: 19;
`;

const AutherProfileDate = styled.div`
position: relative;
font-family: "PretendardRegular";
color: #818F98;
font-size: 17;
`;

const Content = styled.div`
position: relative;
margin-top: 27px;
font-family: "PretendardRegular";
font-size: 20px;
color: black;
`;

const CommentFrame = styled.div`
position : fixed;
bottom: 16px;
right : 40px;
width: 70px;
height: 72px;
`;

const CommentButtonFrame = styled.div`
position : absolute;
display: flex;
align-items: center;
justify-content: center;
bottom: 2px;
width: 70px;
height: 70px;
background-color: #3CC2C7;
border-radius: 70px;
`;

const CommentButtonIc = styled.img`
position: absolute;
width: 45px;  
height: 45px;
object-fit: cover;
`;

const CommentButtonCounter = styled.div`
position: absolute;
display: flex;
align-items: center;
justify-content: center;
font-family: "PretendardSemiBold";
font-size: 12px;
text-align: center center;
right: 2px;
bottom: 0px;
width: 20px;
height: 20px;
color: white;
background-color: black;
border-radius: 20px;
`;

const Thumbcontent = styled.img`
position: relative;
display: flex;
margin-top: 50px;
width: 90%;
object-fit: fill;
border-style: solid;
  border-width: 9px;
  border-radius: 60px;
  border-color: #3BC1C6;
`;

