const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// UPDATE
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password , salt);
                
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id , {$set:req.body,});
            res.status(200).json("Account has been updated..");
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        return res.status(403).json("You can update only your account");
    }
})
// DELETE
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted..");
        }
        catch(err){
            res.status(500).json(err)
            // console.log(err);
            
        }
    }
    else{
        return res.status(403).json("You can delete only your account");
    }
})
// GET USER
router.get("/",async(req,res)=>{
    const userId = req.query.userId;
    const userName = req.query.username;
    let result = {};
    try {
        const user = userId ? await User.findById(userId,function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                result = docs;
            }} ).clone() : await User.findOne({username:userName},function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                result = docs;
            }}).clone();

       
        const {password , updatedAt , ...other} = user;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
        
    }
})

// get friends
router.get("/friends/:userId" , async(req , res)=>{
    try {
        const user = await User.findById(req.params.userId);
        if(user){
            const friends = await Promise.all(
                user.following.map(friendId=>{
                    return User.findById(friendId);
                })
            );
            let friendList = [];
            friends.map(friend=>{
                const {_id , username , profilePicture} = friend;
                friendList.push({_id , username , profilePicture});
            })
            res.status(200).json(friendList);
        }
    
    } 
    catch (err) {
        // console.log(err)
        // res.json(500).json(err);
    }
})


// FOLLOW USER
router.put("/:id/follow" , async(req , res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentuser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentuser.updateOne({$push:{following:req.params.id}})
                res.json("user has been follwed")
                
            }else{
                res.status(403).json("you already follow this user")
            }

        }
        catch(err){
            res.status(403).json("You cannot follow yourself");
        }
    }
})
// UNFOLLOW USER
router.put("/:id/unfollow" , async(req , res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentuser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentuser.updateOne({$pull:{following:req.params.id}})
                console.log('User has been unfollowed..');
                res.status(200).json("User has been unfollowed..");
                
            }else{
                res.status(403).json("you don't follow this user")
            }

        }
        catch(err){
            res.status(403).json("You cannot unfollow yourself");
        }
    }
})

module.exports = router;