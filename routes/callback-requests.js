let callbackRequest = require('../models/callback-requests').callbackRequest; // We had callbackRequest because it is an object in the module 
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router(); // This will help to redirect requests from one to another
let authMiddleware = require('../middleware/auth'); //this function shoud be called before all root pass with admin rights


// Three routes are needed
//Get all Requests
//secure the callback request roout by creating a function that should be call before or anytime a user request 
// we will use the middleware function it can be called before the route
// As a result the route will only be visible to users with admin rights
// The user make a request to access to the route "callbackrequests" we first check if the user has the right yes or not    
router.get('/', authMiddleware, async (req, resp) => {
   resp.send(await callbackRequest.find());
});

//Adding Requests
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newRequest =  new callbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save()
    resp.send('Accepted');
});

//Delete Requests
router.delete('/:id', authMiddleware, async (req, resp) => {
   await callbackRequest.deleteOne({id: req.params.id});
   resp.send('Deleted');
});

module.exports = router;