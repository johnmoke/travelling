let User = require('../models/users').User; //the key "Post" as been  imported from the module Post
let express = require('express');
let router = express.Router(); // This will help to redirect requests from one to another
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');


//create a route for checking wheither the user is already in the database
// This route is responsible for signing process
router.post('/login', async (req, resp) => {
    //read email and password
    let email = req.body.email;
    let password = req.body.password;
    //search for the user in the database
    let user = await User.find().where({email: email});
    // Check if the user is not empty, if it is not empty it means that by using defined function the user was found in the database
    // If there is is such a user in the database then the user can log to the admin page
    if(user.length > 0){
       let comparisonResult = await bcrypt.compare(password, user[0].password);
       if(comparisonResult){
           let token = auth.generateToken(user[0]);
           // token to be stored in the cookie memeory
           resp.cookie('auth_token', token); //, { httpOnly: true } expires: new Date(Date.now() + 900000),
           resp.send({
               redirectURL: '/admin'
           });
       } else {
           resp.status(400);
           resp.send('Rejected');
       }
    //    resp.send('Logged In');
    } else {
        resp.status(400);
        resp.send('Rejected');
    }
})

// Create a route for creating a user in the database
router.post('/register', async (req, resp) => {
    //read email and password
    let email = req.body.email;
    let password = req.body.password;
    //check if the email has not been used by someone else in the database
    let user = await User.find().where({email: email});
    // If this email has not being used by someone else?
    // Then we add this email to the database by writing what comes
    // This is an asynchronous process . To wait for the result on this process , we use async await 
    if(user.length === 0){
        let encryptedPass = await bcrypt.hash(password, 12); //salt0rRounds: string number 
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
         await newUser.save();
        resp.send('Done');
    } else {
        resp.send('Rejected');
    }
})

module.exports = router;