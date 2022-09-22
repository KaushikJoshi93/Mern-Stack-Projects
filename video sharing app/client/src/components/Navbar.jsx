import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux'
import { VideoCallOutlined } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Upload from './Upload'
import { logout } from '../redux/userSlice';
import axios from 'axios';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color:${({ theme }) => theme.bgLighter} ;
  color: ${({ theme }) => theme.text};
  height: 56px;
  z-index: 2;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position:absolute;
  left: 0px;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const Input = styled.input`
  width: 90%;
  border: none;
  background-color: transparent;
  color:${({ theme }) => theme.text};
  &:focus{
    outline: none;
  }
  `;
const Button = styled.div`
  padding: 5px 15px;
  background-color: transparent;
  border: 3px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  opacity: 0;
  width: 120px;
  height: 50px;
  background-color: ${({ theme }) => theme.bgLighter};
  position: absolute;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: all 0.3s ease-out;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position: relative;
  cursor: pointer;

 
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  
`;

const Dropdown = styled.div`
  &:hover {
    & > div{
      opacity: 1;
      transition:all 0.5s ease-in;
    }
  }
`;

const DropdownItem = styled.div`
  display: flex;
`;



const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const currentUser = useSelector(state => state.user.currentuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) { document.body.style.overflow = "auto"; }
  }, [open])

  const handleLogout = async()=>{
      await axios.get("/auth/logout");
      dispatch(logout());
      alert("Logged out successfully!!");
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder='Search' onChange={e => setQuery(e.target.value)} />
            <SearchOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => navigate(`/search?q=${query}`)} />
          </Search>
          {currentUser ? (<>
            <User>
              <VideoCallOutlined style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
              <Dropdown>
                <Avatar src={currentUser.img} />
                <DropdownContainer className='dropdown-content'>
                  <DropdownItem onClick={handleLogout}>
                    <LogoutIcon />
                    <div>Logout</div>
                  </DropdownItem>

                </DropdownContainer>
              </Dropdown>


              {currentUser.name}

            </User>


          </>
          ) : <Link to="signin" style={{ textDecoration: 'none' }}> <Button><AccountCircleOutlinedIcon />SIGN IN</Button></Link>}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar