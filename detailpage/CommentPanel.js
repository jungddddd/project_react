"use client"
import styled from "styled-components";
import React,{useState,useEffect} from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { isLogIn } from "../helper/helper";
const CommentPanel = ({event_id}) => {

    // const comments = [
    //     {
    //         isMine : true,
    //         message : "행사 기대되네요~!",
    //         autherProfilePic : "images/AutherProfile2.png",
    //         autherName : "코기",
    //         wroteDate : "11:10 AM"
    //     },

    //     {
    //         isMine : false,
    //         message : "투자에 관심있으신 분들은 참여하면 좋을것 같네요~!",
    //         autherProfilePic : "images/AutherProfile1.png",
    //         autherName : "Lion",
    //         wroteDate : "11:10 AM"
    //     }
    // ]ㄴ

    const [comments, setcomments] = useState([
      {
          isMine : true,
          message : "행사 기대되네요~!",
          autherProfilePic : "images/AutherProfile2.png",
          autherName : "코기",
          wroteDate : "11:10 AM"
      },

      {
          isMine : false,
          message : "준비물이 따로 있을까요?",
          autherProfilePic : "images/AutherProfile1.png",
          autherName : "Lion",
          wroteDate : "11:10 AM"
      }
  ])
    const [userProfile,setuserProfile] = useState("images/Member.png");
    const [userName,setuserName] = useState("");
    const [inputText, setInputText] = useState("");

    const handleSubmit = (event) =>{
      // const submitComment = async () => {
      //   try {
      //     await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/comment/${event_id}`, {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      //       },
      //       body:{
      //         content : inputText 
      //       }
      //     })
      //     .then((res)=>res.json())
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
      // if(event.key === "Enter") {
      //   submitComment();
      // }
      if(event.key === "Enter") {
        const today = new Date();
      const commentdata =  {
                isMine : true,
                message : inputText,
                autherProfilePic : userProfile,
                autherName : userName,
                wroteDate : `${String(today.getHours()%12).padStart(2,'0')}:${String(today.getMinutes()).padStart(2,'0')} ${today.getHours >12 ? "PM" : "AM"}`
            }
      setcomments((prev) => {return [commentdata, ...prev]})
      setInputText("")
          }
      }

      
    
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

    useEffect(() => {
        const handleLoadComments = async() => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/event/comment/${event_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
          })
          .then((res)=>res.json())
          .then((res)=>console.log(res))
          .then((res)=>{
            setcomments(res.data);
          })
        } catch (error) {
          console.log(error);
        }
      }
      handleLoadComments();
      }, [])

  return (
    <Frame>
        <CommentList>
        {/* {comments.slice(0).reverse().map((commentinfo,index) =>{return(<Comment key = {index} isMine={userProfile === commentinfo.writerProfile} message={commentinfo.content} autherProfilePic={commentinfo.writerProfile} autherName={commentinfo.writerName} wroteDate={commentinfo.creationTime}></Comment>)})} */}
        {comments.slice(0).reverse().map((commentinfo,index) =>{return(<Comment key = {index} isMine={commentinfo.isMine} message={commentinfo.message} autherProfilePic={commentinfo.autherProfilePic} autherName={commentinfo.autherName} wroteDate={commentinfo.wroteDate}></Comment>)})}
        </CommentList>
        <CommentInput placeholder = {"내용을 입력하세요..."} onChange={(event) => setInputText(event.target.value)} onKeyDown={(event) => handleSubmit(event)}></CommentInput>

    </Frame>
  );
};

const Frame = styled.div`
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 508px;
bottom: 0px;
padding-top: 100px;
border-radius: 30px;
background-color: white;
box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.15);
overflow: hidden;
`;

const CommentList = styled.div`
position: absolute;
display: flex;
flex-direction: column;
justify-content: flex-end;
width: 95%;
gap: 15px;
bottom: 100px;
`;

const CommentInput = styled.input`
position: absolute;
bottom: 18px;
left: 19px;
right: 104px;
height: 47px;
border-radius: 100px;
display: flex;
flex-direction: row;
align-items: center;
font-family: "PretendardBold";
font-size: 15;
color: black;
outline: none;
box-shadow: none;
border: none;
background: #F3F2F8;

&::placeholder{
  color: black;
}
`;


export default CommentPanel;
