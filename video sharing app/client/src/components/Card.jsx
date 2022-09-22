import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import {format} from "timeago.js"

const Container = styled.div`
    width: ${(props)=>props.type !== "sm" ? "360px" : (props.page==="search") ? "100%" : ""};
    height: ${(props)=>props.page==="search" ? "200px" : ""};
    margin-bottom: ${(props)=>props.type === "sm" ? "10px":"45px"};
    cursor: pointer;
    display: ${(props)=>props.type === "sm" && "flex"};
    gap: 10px;
`;
const Image = styled.img`
    width: 100%;
    height: ${(props)=>props.type === "sm" ? (props.page==="search")? "100%" : "102px" :  "202px"};
    background-color: gray;
    flex:  1;
`;
const Details = styled.div`
    display: flex;
    margin-top: ${(props)=>props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`;
const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props)=>props.type === "sm" ? (props.page!="search")? "none":"" : ""};
    
`;

const Texts = styled.div`
    
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
`;
const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({theme}) => theme.textSoft};
    margin: 9px 0px;
`;
const Info  = styled.div`
    font-size:${(props)=>props.type === "sm" ? "12px" : "14px"};
    color: ${({theme}) => theme.textSoft};
`;

function Card({type , video , page}) {
    const [channel , setChannel] = useState({});

    useEffect(()=>{
        const fetchChannel = async ()=>{
            const res = await axios.get(`users/find/${video.userId}`);
            setChannel(res.data);
        }
        fetchChannel();
    },[video.userId])
  return (
    <Link to={`/video/${video._id}`} style={{ width:  (page==="search" ? "100%" : "") , textDecoration:"none"} }>
    <Container type={type} page={page}>
        <Image type={type} src={video.imgUrl} page={page}/>
        <Details type={type}>
            <ChannelImage type={type} src={channel.img} page={page}/>
            <Texts>
                <Title>{video.title}</Title>
                <ChannelName>{channel.name}</ChannelName>
                <Info>{video.views} views . {format(video.createdAt)}</Info>
            </Texts>
        </Details>
    </Container>
    </Link>
  )
}

export default Card