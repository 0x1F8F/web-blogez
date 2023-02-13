const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const cookieParser = require('cookie-parser');
require('dotenv').config();

var port = 8081;
var posts=[];
var users =[{
    name:'root',
    email:'null',
    passwd:'123'
}];


// Initialize Express
const app = express();

// Setting up template engine
app.set('view engine', 'ejs');

// bodyParser Initialized
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())

//Static Files Served
app.use('/public', express.static('public'));

// Home Route
app.get('/', (req, res) => {
    res.render("home", {
        posts: posts,
        jquery:[false,'']
        // title: posts
    });
});
app.get('/posts/:activepost',(req,res)=>{
    posts.forEach((post)=>{
        if(_.lowerCase(post.title)==_.lowerCase(req.params.activepost)){
            res.render('post',{
                title:post.title,
                content:post.content,
                time:post.time,
                name:post.name,
                jquery:[false,'']
            });
        }
    });
});

app.get('/compose',(req,res)=>{
    res.render('compose.ejs',{
        jquery:[false,'']
    });
});

app.post('/compose',(req,res)=>{
    const post={
        content:req.body.post,
        title:req.body.title,
        time: Date(),
        name:req.body.user
    }
    console.log(post)
    posts.push(post);
    res.redirect('/');

});

app.get('/about',(req,res) => {
    res.render('about')
})

app.get('/login',(req,res) => {
    res.render('login',{
        errmsg:''
    })
})
app.post('/login',(req,res) => {
    var n = req.body.name
    var p = req.body.passwd
    for(i=0;i<users.length;i++){
        if (users[i]['name'] === n) {
            console.log(n)
            if(users[i]['passwd'] === p) {
                res.cookie(' login','1')
                res.cookie(" userName",users[i]['name'])
                res.redirect('/')
            }
            res.render('login',{
                errmsg:"Password incorrect"
            })
            res.end()
        }
    }
    res.render('login',{
        errmsg:'User not found'
    })
})

app.get('/signup',(req,res) => {
    res.render('signup',{
        errmsg:''
    })
})
app.post('/signup',(req,res) => {
    var n = req.body.name
    var e = req.body.email
    var p = req.body.passwd
    var fault = true
    for(i=0;i<users.length;i++){
        console.log(users[i]);
        if (users[i]['name'] === n) {
            fault=false
            res.render('signup',{
                errmsg:'Username taken,use different'
            })   
        }
        if (users[i]['email'] === e) {
            fault=false
            res.render('signup',{
                errmsg:'Another account connected with same email'
            })
        }
    }
    if (fault){
        users.push({
            name:n,
            email:e,
            passwd:p
        })
        res.redirect('/login')
    }
})


app.listen(port, () => {
    console.log("Server At " + port);
});