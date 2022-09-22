import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Homepage from "./pages/Homepage";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import {useSelector} from 'react-redux'
import Search from './pages/Search';

const Container = styled.div`
  display:flex;

`;

const Main = styled.div`
  flex: 7;
  background-color: ${({theme}) => theme.bg};
`;
const Wrapper = styled.div`
   background-color: ${({theme}) => theme.bg};
`;

function App() {
  const [darkMode , setDarkMode] = useState(true);
  const currentUser = useSelector(state=>state.user.currentuser);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Main>
            <Navbar/>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Homepage type="random"/>}/>
                  <Route path="trends" element={<Homepage type="trend"/>}/>
                  <Route path="subscriptions" element={<Homepage type="sub"/>}/>
                  <Route path="search" element={<Search/>}/>
                  <Route path="signin" element={currentUser ? <Navigate to="/"/> : <Signin/>}/>
                  <Route path="video">
                    <Route path=":id" element={<Video/>}/>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
    </Container>
    </ThemeProvider>
  );
}

export default App;
