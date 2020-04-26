let Email = require('../models/emails').Email; // We had callbackRequest because it is an object in the module 
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router(); // This will help to redirect requests from one to another
let authMiddleware = require('../middleware/auth'); // We connect the middelware function  

// Three routes are needed
//Get all Requests
router.get('/', authMiddleware, async (req, resp) => {
   resp.send(await Email.find());
});

//Adding Requests
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newEmail =  new Email({
        id: uniqid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new Date()
    })
    await newEmail.save()
    resp.send('Accepted');
});

//Delete Requests
router.delete('/:id', authMiddleware, async (req, resp) => {
   await Email.deleteOne({id: req.params.id});
   resp.send('Deleted');
});

module.exports = router;