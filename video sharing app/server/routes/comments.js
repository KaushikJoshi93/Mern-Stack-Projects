import express from 'express'
import { addComment, deleteComment, getComments } from '../controllers/comment.js';
import {verifytoken} from '../verifyToken.js';

const router = express.Router();

router.post("/" , verifytoken , addComment);
router.delete("/:id" , verifytoken , deleteComment);
router.get("/:videoId" , verifytoken ,getComments);




export default router;