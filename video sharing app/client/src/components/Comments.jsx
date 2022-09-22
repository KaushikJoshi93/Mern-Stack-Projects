import axios from "axios";
import { useEffect, useState } from "react";
import Comment from './Comment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useSelector} from 'react-redux'
import styled from "styled-components";


const Container = styled.div`
    
`;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
    background-color: transparent;
    padding: 5px;
    outline: none;
    width: 100%;
`;

function Comments({videoId}) {
    const [comments , setComments] = useState([]);
    const currentUser = useSelector(state=>state.user.currentuser);

    useEffect(()=>{
        const fetchComments = async() =>{
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComments();
    } , [videoId])
  return (
    <Container>
        <NewComment>
            {currentUser ? <Avatar src={currentUser.img}/> : <AccountCircleIcon/>}
            <Input placeholder="Add a comment..."/>
        </NewComment>
        {comments.map(comment=>{
            return <Comment key={comment._id} comment={comment}/>
        })}
    </Container>
  )
}

export default Comments