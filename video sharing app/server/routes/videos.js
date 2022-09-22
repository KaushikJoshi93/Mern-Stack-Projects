import express from 'express'
import { } from '../controllers/comment.js';
import { addVideo, addView, deleteVideo, getVideo, random, trend, updateVideo , sub, getByTag, search } from '../controllers/video.js';
import { verifytoken } from '../verifyToken.js';

const router = express.Router();

// create a video
router.post("/" , verifytoken , addVideo);
// update a video
router.put("/:id" , verifytoken , updateVideo);
router.delete("/:id" , verifytoken , deleteVideo);
router.get("/find/:id" , getVideo);
router.put("/view/:id" , addView);
router.get("/trend" , trend);
router.get("/random" , random);
router.get("/sub" , verifytoken , sub);
router.get("/tags" ,  getByTag);
router.get("/search" , search);





export default router;