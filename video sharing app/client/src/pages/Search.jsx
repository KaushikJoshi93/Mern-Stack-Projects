import styled from 'styled-components'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card'
import Loading_bar from '../components/LoadingBar';


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
`;
function Search() {
    const [videos , setVideos] = useState([]);
    const [isLoading , setIsLoading] = useState(false);
    const query = useLocation().search;

    useEffect(()=>{
        const fetchVideos = async()=>{
            setIsLoading(true);
            const res = await axios.get(`/videos/search${query}`);
            setVideos(res.data);
            setIsLoading(false);
        }
        fetchVideos();
    } , [query]);

  return (
    <Container>
        {!isLoading ? videos.map(video=>{
                return <Card key={video._id} video={video} type="sm" page="search"/>
            }) :
            <>
                {Array(9).fill(<Loading_bar/>)}
            </>}

    </Container>
    
  )
}



export default Search