import Card from "../components/Card"
import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios";
import LoadingBar from "../components/LoadingBar";

const Container = styled.div`
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    gap: 16px;
`

function Homepage({ type }) {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            setIsLoading(true);
            const res = await axios.get(`videos/${type}`);
            setVideos(res.data);
            setIsLoading(false);
        }
        fetchVideos();
    }, [type])
    return (
        <Container>
           {!isLoading ? videos.map(video=>{
                return <Card key={video._id} video={video}/>
            }) :
            <>
                {Array(9).fill(<LoadingBar/>)}
            </>}
        </Container>
    )
}

export default Homepage