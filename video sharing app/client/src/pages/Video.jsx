import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbUp } from "@mui/icons-material";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import styled from "styled-components"
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {useSelector , useDispatch} from 'react-redux'
import axios from "axios";
import { dislikes, fetchSuccess, likes } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from '../components/Recommendation'


const Container = styled.div`
    display: flex;
    gap: 24px;
`;
const Content = styled.div`
    flex: 5;
`;
const VideoWrapper = styled.div`
    
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: 400;
    margin-top: 20px;
    margin-bottom: 10px;
    color: ${({theme}) => theme.text};
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const Info = styled.span`
    color: ${({theme}) => theme.textSoft};
`;

const Buttons = styled.div`
    display: flex;
    gap: 25px;
    color: ${({theme}) => theme.text};
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
`;

const Hr = styled.hr`
    margin: 15px 0;
    border: 0.5px solid ${({theme}) => theme.soft};
`



const Channel = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ChannelInfo = styled.div`
    display: flex;
    gap: 20px;
`;

const Subscribe = styled.button`
    background-color: #cc1a00;
    font-weight: 500;
    color: white;
    border: none;
    border-radius: 3px;
    height: max-content;
    padding: 10px 20px;
    cursor: pointer;
`;

const Image =  styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const ChannelDetail = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme}) => theme.text};
`;

const ChannelName = styled.span`
    font-weight: 500;
`;

const ChannelCounter = styled.span`
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 12px;
    color: ${({theme}) => theme.textSoft};
`;

const Description = styled.p`
    font-size: 14px;
`;

const VideoFrame = styled.video`
    max-height: 450px;
    width: 100%;
    object-fit: cover;
`

function Video() {
    const currentVideo = useSelector(state=>state.video.currentVideo);
    const currentUser = useSelector(state=>state.user.currentuser);
    const dispatch = useDispatch();
    const path = useLocation().pathname.split("/")[2];
    const [channel , setChannel] = useState({});

    useEffect(()=>{
        const incViews = async()=>{
            await currentVideo && axios.put(`/videos/view/${currentVideo._id}`);
            console.log("views increased..")
        };
        incViews();
    } , [currentVideo])
  
    
    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const videoRes = await axios.get(`/videos/find/${path}`);
                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
                // currentVideo && axios.put(`/videos/view/${currentVideo._id}`)
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    } , [path , dispatch]);

    const handleLike = async()=>{
        console.log(currentVideo);
        await axios.put(`/users/like/${currentVideo?._id}`);
        dispatch(likes(currentUser?._id));
    }
    const handleDislike = async()=>{
        await axios.put(`/users/dislike/${currentVideo?._id}`);
        dispatch(dislikes(currentUser?._id));
    }
    const handleSub = async()=>{
        currentUser.subscribedUsers.includes(channel._id) ?
        await axios.put(`/users/unsub/${channel._id}`):
        await axios.put(`/users/sub/${channel._id}`)
        dispatch(subscription(channel._id));
    }
  return (
    <Container>
        <Content>
            <VideoWrapper>
            <VideoFrame src={currentVideo?.videoUrl} controls/>
            </VideoWrapper>
            <Title>{currentVideo?.title}</Title>
            <Details>
                <Info>{currentVideo?.views} views . {format(currentVideo?.createdAt)}</Info>
                <Buttons>
                    <Button onClick={handleLike}>
                        {currentVideo?.likes?.includes(currentUser?._id) ?  <ThumbUp/>:<ThumbUpOutlinedIcon/>}
                        {currentVideo?.likes?.length}
                    </Button>
                    <Button onClick={handleDislike}>
                        {currentVideo?.dislikes?.includes(currentUser?._id) ? <ThumbDown/>:<ThumbDownAltOutlinedIcon/>}
                        {currentVideo?.dislikes?.length}
                    </Button>
                    <Button>
                        <ReplyOutlined/>
                        Share
                    </Button>
                    <Button>
                        <AddTaskOutlined/>
                        Save
                    </Button>
                </Buttons>
            </Details>
            <Hr/>
            <Channel>
                <ChannelInfo>
                    <Image src={channel.img}/>
                    <ChannelDetail>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                        <Description>{currentVideo?.desc}</Description>
                    </ChannelDetail>
                </ChannelInfo>
             {currentUser &&<Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" :  "SUBSCRIBE"}</Subscribe>}
            </Channel>
            <Hr/>
            <Comments videoId = {currentVideo?._id}/>
        </Content>
        <Recommendation tags={currentVideo?.tags}/>
    </Container>
  )
}

export default Video