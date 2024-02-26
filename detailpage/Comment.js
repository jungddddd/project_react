"use client";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
const Comment = ({
  isMine,
  message,
  autherProfilePic,
  autherName,
  wroteDate,
}) => {

  const CommentFrame = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: ${isMine ? "flex-end" : "flex-start"};
  `;

  const CommentBubble = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 28px;
    padding-right: 70px;
    padding-top: 17px;
    padding-bottom: 17px;
    border-radius: ${isMine ? "20px 20px 0px 20px" : "20px 20px 20px 0px"};
    color: white;
    background-color: #3BC1C6;
  `;

  const CommentAutherFrame = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 7px;
    gap: 9px;
    height: 32px;
  `;

  const CommentAutherPic = styled.img`
    position: relative;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    color: black;
    object-fit: cover;
  `;

  const CommentAutherName = styled.div`
    position: relative;
    font-family: "PretendardSemiBold";
    font-size: 18px;
    color: black;
  `;

  const CommentDate = styled.div`
    position: relative;
    margin-top: 13px;
    font-family: "PretendardSemiBold";
    font-size: 18px;
    color: #969495;
    text-align: end;
  `;

  return (
    <CommentFrame>
      <CommentBubble>{message}</CommentBubble>
      <CommentAutherFrame>
        <CommentAutherPic src = {autherProfilePic}></CommentAutherPic>
        <CommentAutherName>{autherName}</CommentAutherName>
      </CommentAutherFrame>
      <CommentDate>{wroteDate}</CommentDate>
    </CommentFrame>
  );
};

export default Comment;
