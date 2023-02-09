const express = require("express")
// const pug = require("pug")

const app = express()
const PORT = 8080

app.use(express.urlencoded()) // req.body would give data in json formate
app.set('view engine','ejs')


app.get('/home',(req,res) => {
    res.status(200,"ok")
    res.render('home',{
        PORT:PORT
    })
})

app.get("/login", (req,res) => {
    res.render('login')
})
app.post("/login", (req,res) => {
    //post request
})

app.get("/signup", (req,res) => {
    res.render('signup')
})

app.post("/signup", (req,res) => {
    // post request
})

app.listen(PORT,() => {
    console.log(`server starting at ${PORT}`)
})

