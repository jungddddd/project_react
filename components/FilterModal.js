"use client";
import styled from "styled-components";
import moment from "moment";
import {
  Motion,
  Spring,
  GlobalController,
  GuageController,
  Tween,
  Easetype,
} from "@/CorgiUI/src";

import SelectionFilter from "./SelectionFilter";

const closeButtonImg = "images/ic_CloseButton_Black.png"

const today = moment();

const periodFilterList = {
  types : ["startDate","endDate"],
  filters :[
    {title : "모든 날", values : ["1900-01-01T00:00:00","2100-01-01T00:00:00"]},
    {title : "오늘", values : [today.format("YYYY-MM-DD")+ "T00:00:00",today.format("YYYY-MM-DD")+"T24:00:00"]},
    {title : "이번 주", values : [today.startOf('week').format("YYYY-MM-DD")+ "T00:00:00",today.endOf('week').format("YYYY-MM-DD")+ "T24:00:00"]},
    {title : "이번 달", values : [today.startOf('month').format("YYYY-MM-DD")+ "T00:00:00",today.endOf('month').format("YYYY-MM-DD")+ "T24:00:00"]}
  ]
  // "모든 날", "오늘", "이번 주", "이번 달", "기간 선택"
};

const stateFilterList = {
  types : ["address"],
  filters:[
    {title : "서울/경기/인천", values : ["서울","경기","인천"]},
    {title : "부산/울산/경남", values : ["부산","울산","경남"]},
    {title : "대구/경북", values : ["대구","경북"]},
    {title : "충청/대전/세종", values : ["충청","대전","세종"]},
    {title : "전라/광주", values : ["전라","광주"]},
    {title : "강원", values : ["강원"]},
    {title : "제주", values : ["제주"]},
  ]
};

const categoryFilterList = {
  types : ["category_name"],
  filters :[
  {title : "창업", values : "창업"},
  {title : "IT/프로그래밍", values : "IT/프로그래밍"},
  {title : "라이프", values : "라이프"},
  {title : "경제/금융", values : "경제/금융"},
  {title : "경영", values : "경영"},
  {title : "인문/사회", values : "인문/사회"},
  {title : "예술", values : "예술"},
  {title : "마케팅", values : "마케팅"},
  {title : "커리어", values : "커리어"},
  {title : "과학기술", values : "과학기술"},
  {title : "디자인/영상", values : "디자인/영상"},
  {title : "의료/의학", values : "의료/의학"},
  {title : "행사 기획", values : "행사 기획"},
  {title : "관광/여행", values : "관광/여행"},
  {title : "기타", values : "기타"},
  ]
};

const formetFilterList = {
  types : ["type"],
  filters:[
    {title : "강연/세미나", values : "강연/세미나"},
    {title : "모임/커뮤니티", values : "모임/커뮤니티"},
    {title : "멘토링/대외활동", values : "멘토링/대외활동"},
    {title : "대회/공모전", values : "대회/공모전"},
    {title : "데모데이", values : "데모데이"},
    {title : "워크샵/클리닉", values : "워크샵/클리닉"},
    {title : "박람회/페어", values : "관광/투어"},
    {title : "콘테스트/콩쿠르", values : "콘테스트/콩쿠르"},
    {title : "회의/컨벤션", values : "회의/컨벤션"},
    {title : "축제/공연/전시", values : "축제/공연/전시"},
    {title : "기타", values : "기타"},
  ]
};

const attendenceFilterList = {
  types : ["location"],
  filters:[
    {title : "온라인", values : "온라인"},
    {title : "오프라인", values : "오프라인"}
  ]
};

const priceFilterList = {
  types : ["free","notFree","price"],
  filters:[
    {title : "무료", values : [true,false,""]},
    {title : "유료", values : [false,true,""]},
  ]
  // "무료", "유료", "직접 입력"
};

const filterTitleList = [
    { title: "일시", data: periodFilterList },
    { title: "지역", data: stateFilterList },
    { title: "행사분야", data: categoryFilterList },
    { title: "행사유형", data: formetFilterList },
    { title: "참여방법", data: attendenceFilterList },
    { title: "가격", data: priceFilterList },
  ];

const FilterModal = ({setisModal}) => {
  return (
    <Frame>
      <CloseButton onClick={() => setisModal(false)} src = {closeButtonImg}></CloseButton>
      <BannerFrame>
        <BannerText>필터 설정</BannerText>
      </BannerFrame>
      <TagSetFrame>
        {filterTitleList.map((filterSet, index) => {
          return (
            <TagLineFrame key = {index}>
              <TagLineTitle></TagLineTitle>
              <Title>
                <span>{filterSet.title.charAt(0)}</span>
                {filterSet.title.substring(1)}
              </Title>
              <FiltersFrame>
                {filterSet.data.filters.map((filterData, index) => {
                    return (
                  <SelectionFilter key = {index} types = {filterSet.data.types} title = {filterData.title} values={filterData.values}></SelectionFilter>
        )})}
              </FiltersFrame>
            </TagLineFrame>
          );
        })}
      </TagSetFrame>
    </Frame>
  );
};

const Frame = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1216px;
  height: 781px;
  background-color: white;
  border-radius: 30px;
  padding-top: 36px;
  padding-bottom: 36px;
  overflow: scroll;
`;

const CloseButton = styled.img`
  position: absolute;
  width: 18px;
  height: 18px;
  top: 36px;
  right: 36px;
  background: center/cover no-repeat;
  object-fit: cover;
`;

const BannerFrame = styled.div`
  position: relative;
  width: 991px;
  height: 60px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-darkturquoise);
`;

const BannerText = styled.div`
  position: relative;
  font-family: "PretendardBold";
  font-size: 20px;
  color: white;
`;

const TagSetFrame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 28px;
  gap: 21px;
`;

const TagLineFrame = styled.div`
  position: relative;
  width: 991px;
`;

const TagLineTitle = styled.div`
  position: relative;
  width: 991px;
`;

const FiltersFrame = styled.div`
  position: relative;
  display: flex;
  width: 991px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 11px;
  margin-top: 16px;
`;

const Title = styled.div`
  position: relative;
  margin-left: 1px;
  font-family: "PretendardBold";
  font-size: 25px;
  color: black;

  span {
    color: var(--color-darkturquoise);
  }
`;
