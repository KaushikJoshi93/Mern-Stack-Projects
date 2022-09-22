import express from 'express'
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update  } from '../controllers/user.js';
import {verifytoken} from '../verifyToken.js';

const router = express.Router();

// update a user
router.put("/:id" ,verifytoken ,  update);

// delete a user
router.delete("/:id",verifytoken , deleteUser);

// get a user
router.get("/find/:id" , getUser);

// subscribe a user
router.put("/sub/:id",verifytoken , subscribe);

// unsubscribe a user
router.put("/unsub/:id" ,verifytoken ,  unsubscribe);

// like a video
router.put("/like/:videoId" ,verifytoken, like);

// dislike a video
router.put("/dislike/:videoId" ,verifytoken, dislike);



export default router;