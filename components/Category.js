"use client"
import styled from "styled-components";
import React,{span,useRef,useState} from "react";
import {
	Motion,
	Spring,
	GlobalController,
	GuageController,
	Tween,
	Easetype,
} from "@/CorgiUI/src";

const Category = () => {

  const containerRef = useRef(null);

  const [sliderOn, setsliderOn] = useState(false);
  const [mousePosition, setmousePosition] = useState(0);


  const handleWheel = (e) => {
    const deltaX = mousePosition - e.clientX;
    containerRef.current.scrollLeft += 0.5*deltaX;
    setmousePosition(e.clientX);

    // 스크롤 이벤트 전파 방지
    e.preventDefault();
  };

    
  const categoryList = ["IT","인문학","언론","과학","세미나","전시회","발표"];
  return (
    <Frame>
      <Title><span>엄</span>선한 카테고리들</Title>
      <SubTitle>담앗콘이 엄선하여 분류한 카테고리들을 살펴보세요</SubTitle>
      <Motion.div
        onMouseDown={(event, ref) => {
          setsliderOn(true);
          setmousePosition(event.clientX);
        }}
        onMouseUp={(event, ref) => {
          setsliderOn(false);
          setmousePosition(0);
        }}
        onMouseMove={(event, ref) => {
          if (sliderOn) {
            handleWheel(event);
          }
        }}
      >
      <ContentRow ref={containerRef}>
        {categoryList.map((category,index)=>
        {return(
          <Motion.div
          key = {index}
          onMouseOver={(event,ref) => Spring.scaleMotion(1.05,1.05,0,[15, 0.27, 55],ref,"change")}
          onMouseLeave = {(event,ref) => Spring.scaleMotion(1,1,0,[15, 0.27, 55],ref,"change")}
          >
         <Content>
           <Image src = {"/images/Category"+(index+1)+".jpg"}></Image>
            <Name>{category}</Name>
        </Content>
        </Motion.div>
        )
        }
        )
        }
      </ContentRow>
      </Motion.div>
    </Frame>
  );
};

const Frame = styled.div `
  position: relative;
  margin-top: 390px;
  margin-left: 45px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div `
  position: relative;
  margin-left: 1px;
  font-family: "PretendardBold";
  font-size: 25px;
  color: black;

  span {
    color: var(--color-darkturquoise);
  }
`;

const SubTitle = styled.div `
  position: relative;
  margin-left: 3px;
  font-family: "PretendardSemiBold";
  font-size: 12px;
  color: black;
`;

const ContentRow = styled.div `
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  gap: 14px;
  overflow-x: scroll;
  overflow-y: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div `
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: center/cover no-repeat;
`;

const Image = styled.img `
  position: relative;
  width: 235px;
  height: 130px;
  border-radius: 10px;
  border: 1px solid var(--color-white);
  object-fit: cover;
`;

const Name = styled.div `
  position: relative;
  font-family: "PretendardSemiBold";
  font-size: 15px;
`;
