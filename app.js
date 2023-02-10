const express = require("express")
const sqlite = require("sqlite3").verbose()

const app = express()
const PORT = 8080


let db =new sqlite.Database('./db/database.db')
db.run('CREATE TABLE IF NOT EXISTS main (uname VARCHAR(20),email TEXT,passwd TEXT);')
// db.run('CREATE TABLE IF NOT EXISTS main (uname VARCHAR(20),email TEXT,passwd TEXT)')
function passwd_test(uname,passwd) {
    var sql = `SELECT passwd FROM main WHERE uname=?;`
    db.all(sql,[uname],(err,row) => {
        if (err) {
            throw err
        } else {
            return (row==passwd)
        }
    })
}
function user_test(uname) {
    var sql = `SELECT uname FROM main WHERE uname=?;`
    db.all(sql,[uname],(err,row) => {
        if (row) {
            return true
        } else {
            return false
        }
    })
}

function passwd_change(uname,newpasswd) {
    
}

function add_user(uname,email,passwd){
    if (!(user_test(uname))) {
    sql = `INSERT INTO main (uname,email,passwd) VALUES ("${uname}","${email}","${passwd}");`
    db.run(sql)
    return true
    } else {
        return false
    }
}





var logined = false

app.use(express.urlencoded()) // req.body would give data in json formate
app.set('view engine','ejs')


app.get('/home',(req,res) => {
    
    res.status(200,"ok")
    res.render('home',{
        PORT:PORT ,
        login:logined
    })
})



app.get('/',(req,res) => {
    res.redirect('/home')
})



app.get("/login", (req,res) => {
    res.render('login')
})



app.post("/login", (req,res) => {
    //post request
    var name = req.body.name
    var passwd = req.body.passwd
    if (passwd_test(name,passwd)) {
        logined= true
        console.log(req.body)
        res.redirect('/')
        res.send()
    } else {
        res.redirect('/login')
    }
})




app.get("/signup", (req,res) => {
    res.render('signup')
})



app.post("/signup", (req,res) => {
    var name = req.body.name
    var email = req.body.email
    var passwd = req.body.passwd
    if (add_user(name,email,passwd)) {
        res.status(300,"redirecting to home")
        res.redirect('/home')
    } else {

    }
})






app.listen(PORT,() => {
    console.log(`server running at ${PORT}`)
})

