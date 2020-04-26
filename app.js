let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
// let CallbackRequet = require('./models/callback-requests').callbackRequest;
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let Auth = require('./controllers/auth');

app.set('view engine', 'ejs');

// //to create a new document 
// let cr = new CallbackRequet({
//     id: '123',
//     phoneNumber: '+222222',
//     date: new Date()
// })

// //save the data to the database
// cr.save();

mongoose.connect('mongodb://localhost/travel', { useNewUrlParser: true ,useUnifiedTopology: true });
app.use(express.json());  // Because the data shld be sent in the json format, we convert these

// Adding images file to the console and the foler 
let imageStorage = multer.diskStorage({
    //key1 file destination  and key2 is filename
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})
app.use(multer({storage: imageStorage}).single('imageFile'));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts', postsRouter);                                            // this is the beginning of the route path
app.use('/callback-requests', callbackRequestsRouter); 
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req, resp) => {
    let id =req.query.id;
    let post = await Post.findOne({id: id});
     resp.render('sight', {
         title: post.title,
         imageURL: post.imageURL,
         date: post.date,
         text: post.text
     })
})
// As teh cookie will be needed by the server when the user need to sign again , we dont need this line -> let isLoggedIn = false;
app.get('/admin', (req, resp) => {  // The request is made to the route path /admin  the server can now read the cookie with cookieparser
    let token = req.cookies['auth_token'];
    if(token && Auth.checkToken(token)){
        resp.render('admin');
    } else {
        resp.redirect('/login');
    } 
    
})
app.get('/login', (req, resp ) => {
    resp.render('login');
})
app.listen(3000, () => console.log('Listening 3000..'));

