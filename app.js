const http = require('http')
const fs = require('fs')


// read file user/*.json
function Rfile(name) {
    fs.stat(`users/{name}.json`, (err,stat) => {
        if (err === null) {
           return fs.readFile(`users/{name}.json`)
           //return json formate

        } else if (err.code === 'ENOENT') {
            console.log('user not found')
            return "user not found"
            // user not found : redirect btn to home or login pg

        } else {
            console.log(err.message)
            // something happened: run as adminstator it could be fix
        }
    })
}

// write user data as json document
function Wfile(name, email, passwd) {
    fs.stat(`users/{name}.json`, (err, stat) => {
        if (err === null) {
            console.log('user already found')
        } else if (err.code === 'ENOENT') {
            fs.writeFile(`users/{name}.json`,() => {
            // save in these formate
            })
        } else {
            console.log(err.message)
        }
    }
)}


//initialization of http server
const server = http.createServer((req,res) => {
    if (req.url==='/home') {
        res.write(fs.readFile('src/home.html'))
        res.end()
    } else {
        res.write(Rfile('src/host/404.html'))
    }
})


//server host at port:80 host:127.0.0.1
server.listen(80,"127.0.0.1", () => {
    console.log('Server at http://localhost:80/home')
})
