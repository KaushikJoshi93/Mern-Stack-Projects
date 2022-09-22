import styled from "styled-components"
import { keyframes } from "styled-components";


const opacityAnimation = keyframes`
  to{
    opacity: 0.5;
  }
`
const Container = styled.div`

    width: 360px;
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: ${opacityAnimation} 1s ease infinite alternate;
    margin-bottom: 12px;
`;
const Image = styled.div`
    width: 100%;
    height: 202px;
    background-color: #8d8989d6;
`;
const Details = styled.div`
    display: flex;
    margin-top: 16px;
    gap: 12px;
`;

const ChannelImage = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
`;
const Texts = styled.div`
    width: 100%;
`;
const Title = styled.div`
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    height: 20px;
    background-color: #8d8989d6;
`;

const Info  = styled.div`
    margin-top: 12px;
    width: 140px;
    height: 20px;
    background-color: #8d8989d6;
    
`;


const Loading_bar = () => {
  return (
    <Container>
        <Image />
        <Details>
          <ChannelImage/>
          <Texts>
            <Title/>
            <Info/>
          </Texts>
        </Details>
    </Container>
  )
}

export default Loading_bar