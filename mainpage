"use client";
import styled from "styled-components";
import EventBanner from "@/app/components/EventBanner";
import Category from "@/app/components/Category";
import SectionRow from "@/app/components/SectionRow";
import { events } from "@/app/API";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkLogIn } from "../helper/helper";
import LoaderPage from "../loaderpage/page";

const MainPage = () => {
  const [dataOrigin, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const categoryName = ["마감임박 행사들","무료 행사들","할인 행사들"];
  const categorySubName = ["담앗콘이 엄선하여 분류한 카테고리들을 살펴보세요","담앗콘이 엄선하여 분류한 카테고리들을 살펴보세요","담앗콘이 엄선하여 분류한 카테고리들을 살펴보세요"];

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
  checkLogIn();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/event`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      const result = res.json();
      return result;
    };

    fetchData().then((res) => setData(res.data)).then(setIsLoading(false)); // Mark loading as false when done);
  }, []);


  return (
    <>
    {isLoading ? <LoaderPage></LoaderPage> :
        <OuterFrame>
        <Header></Header>
        <PageSection>
          <Frame>
            <EventBanner></EventBanner>
            <Category></Category>
            <SectionRows>
              {dataOrigin.map((outputData, index) => {
                return (
                  <SectionRow
                    key={index}
                    data={outputData}
                    title={categoryName[index]}
                    subtitle={categorySubName[index]}
                  ></SectionRow>
                );
              })}
            </SectionRows>
          </Frame>
        </PageSection>
      </OuterFrame>
    } 
    </>
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
  width: 100%;
  height: 100%;
`;

const SectionRows = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 42px;
  margin-left: 45px;
  gap: 107px;
`;

export default MainPage;
