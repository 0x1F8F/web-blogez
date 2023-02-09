const express = require("express")
// const pug = require("pug")

const app = express()
const PORT = 8080

var logined = false
var name = ''
var email = ''
var passwd = ''


app.use(express.urlencoded()) // req.body would give data in json formate
app.set('view engine','ejs')


app.get('/home',(req,res) => {
    if (logined) {
        res.status(200,"ok")
        res.render('home',{
            PORT:PORT ,
            name:name ,
            login:logined
        })
        
    }
})


app.get('/',(req,res) => {
    res.redirect('/home')
})

app.get("/login", (req,res) => {
    res.render('login')
})

app.post("/login", (req,res) => {
    //post request
    name = req.body.name
    passwd = req.body.passwd
    logined= true
    console.log(req.body)
    res.redirect('/')
    res.send()
})

app.get("/signup", (req,res) => {
    res.render('signup')
})

app.post("/signup", (req,res) => {
    res.status(300,"redirecting to home")
    res.redirect('/home')
})

app.listen(PORT,() => {
    console.log(`server starting at ${PORT}`)
})

