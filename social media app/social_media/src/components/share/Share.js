import './share.css'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState("");
    const [source , setsource] = useState("#");
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("file", file);
            data.append("name", filename);

            try {
                let name_of_file = await axios.post("/upload/", data);
                newPost.img = name_of_file.data;
                
            } catch (err) {
                console.log(err);
            }
        }
        try {
            console.log(newPost)

            await axios.post("/posts/", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'hero.png'} alt="" className='shareProfileImg' />
                    <input placeholder={"What's in your mind " + user.username + "?"} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={source} alt="" className='shareImg'/>
                        <Cancel className='shareCancelImg' onClick={()=>setFile(null)}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor="tomato" className='shareIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                            <input type="file" name="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e) => {setFile(e.target.files[0]);
                                 setsource(URL.createObjectURL(e.target.files[0]))}} style={{ display: "none" }} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share