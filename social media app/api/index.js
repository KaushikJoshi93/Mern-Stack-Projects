const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');
const multer = require('multer');
const path = require('path');

dotenv.config();
mongoose.connect(process.env.MONGO_URL , {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>console.log('connected to database'))
.catch(e=>console.log(e));


app.use("/images",express.static(path.join(__dirname , "public/images")));

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use('/api/users' , userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/posts' , postRoute);
app.use('/api/conversations' , conversationRoute);
app.use('/api/messages' , messageRoute);

let name_of_file ;
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null , "public/images");
    },
    filename:(req,file,cb)=>{
        name_of_file = `${Date.now()}${file.originalname}`
        cb(null , name_of_file );
    }
})

const upload = multer({dest:"public/images" , storage:storage});
app.post("/api/upload",upload.single("file") , (req,res)=>{
    try {
        res.status(200).json(name_of_file);
    } catch (err) {
        console.log(err);
        res.status(404).json(err)
        
    }
})



app.listen(8000 , ()=>{
    console.log('Server is running ..');
    
})