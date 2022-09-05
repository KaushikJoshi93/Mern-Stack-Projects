const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {

    try {
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // save user and respond
        const user = await newUser.save();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);

    }

})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            const {password,createdAt,updatedAt , ...other} = user;
            (!validPassword) ? res.status(404).json("Wrong Credentials...") : res.status(200).json(other);
        }

    } catch (error) {
        res.status(500).json("Some Error occured... " + error);

    }

})




module.exports = router;