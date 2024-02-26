"use client"
import styled from "styled-components";

const EventBanner = () => {
    
  const detailButtonImg = "images/DetailButton.png"
  const eventImg = "images/EventImage.jpg"

  return (
    <Frame>
        <Image src = {eventImg}></Image>
        <Foreground></Foreground>
        <InfoFrame>
            <EventTitle>{"뚝섬 재사용 장터\n이벤트"}</EventTitle>
            <EventSubTitle>{"Lorem Ipsum is simply dummy text of the printing and type\nsetting Industry Lorem Ipsum"}</EventSubTitle>
            <EventDetailButton src = {detailButtonImg}></EventDetailButton>
        </InfoFrame>
    </Frame>
  );
};

const Frame = styled.div `
  position: absolute;
  height: 624px;
  width: 100%;
  background-color: white;
`;

const Image = styled.img `
  position: absolute;
  width: 100%;
  height: 100%;
  background: center/cover no-repeat;
  object-fit: cover;
`;

const InfoFrame = styled.div `
  position: relative;
  display: flex;
  margin-left: 42px;
  margin-top: 84px;
  flex-direction: column;
  height: 191.5px;
  width: 300px;
`;

const EventTitle = styled.div `
  position: relative;
  font-family: "PretendardBold";
  font-size: 40px;
  color: white;
`;

const EventSubTitle = styled.div `
  position: relative;
  font-family: "PretendardSemiBold";
  font-size: 10px;
  line-height: 14px;
  margin-top: 9px;
  color: #D3CFD0
`;

const EventDetailButton = styled.img `
  position: relative;
  height: 55px;
  width: 122px;
  margin-top: 26px;
  object-fit: cover;
`;

const EventLikeButton = styled.img `
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 191.5px;
  width: 273px;
  background-color: white;
  object-fit: cover;
`;

const Foreground = styled.div `
  position: absolute;
  height: 318px;
  width: 100%;
  bottom: 0px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.00) 5.03%, #FFF 65.45%
  );
`;
