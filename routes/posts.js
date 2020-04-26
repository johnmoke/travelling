let Post = require('../models/posts').Post; //the key "Post" as been  imported from the module Post
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router(); // This will help to redirect requests from one to another
let authMiddleware = require('../middleware/auth'); // We connect the middelware function  


// back end part (find the posts and send them to client async function used)
router.get('/', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

router.get('/:id', async (req, resp) => {
    let id = req.params.id;  
    let post = await Post.findOne({id: id});
    resp.send(post);
})

//Another route for the postRequest
router.post('/', authMiddleware, async (req, resp) => {
    // let take the information from the body of the post request, we then create the variable reqBody
    let reqBody = req.body;
    // Check if the path to image is empty
    let imgPath;
    if(reqBody.imageUrl) {
        imgPath = reqBody.imageUrl;  // image url can either be url
    } else {
        imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);     // image can also be the path the path start from 
    }
    
    let newPost = new Post({
        id: uniqid(),
        title:reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        // imageURL: reqBody.imageUrl
        imageURL: imgPath
    })
    // console.log(req.file);
    await newPost.save(); // This is an asynchronous process . We use async - await 
    resp.send('Created!'); 
})

//DeleteRequest
router.delete('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted!');
})

// Udpdate post
router.put('/:id',  authMiddleware,async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('updated!');
})

module.exports = router;