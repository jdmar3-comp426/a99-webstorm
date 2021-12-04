// Define app using express

const express = require('express');
const app = express();
// Require database SCRIPT file
var db = require("./database.js")
// Make Express use its own built-in body parser
// Start server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const HTTP_PORT = 3511;
app.listen(HTTP_PORT, () => {
    console.log(`This app is listening on port ${HTTP_PORT}`)
});
app.get('/', (req, res) => {
    return res.redirect('/login');
  });

app.get('/login', (req, res) => {
    return res.sendFile(__dirname + '/login.html');
});

app.get('/wp2180140.jpeg', (req, res) => {
    return res.sendFile(__dirname + '/wp2180140.jpeg')
})

app.get('/main.css', (req, res) => {
    return res.sendFile(__dirname + '/main.css')
})

app.get('/main.js', (req, res) => {
    return res.sendFile(__dirname + '/main.js')
})

app.get('/server.js', (req, res) => {
    return res.sendFile(__dirname + '/server.js')
})

app.post("/login", (req, res) => {
    const confirmInfo = db.prepare("SELECT EXISTS(SELECT 1 from accountinfo where username = ? and password = ?)").get(req.body.username, req.body.password);
	if(confirmInfo['EXISTS(SELECT 1 from accountinfo where username = ? and password = ?)']==1){
        const numOfGames = db.prepare("SELECT * from accountinfo where username = ?").get(req.body.username);
        console.log(numOfGames.numOfGames);
        let today = new Date().toISOString().slice(0, 10)
        const stmt = db.prepare("UPDATE accountinfo SET numOfGames = ?, recentLogin = ? WHERE username = ?");
        const info2 = stmt.run(numOfGames.numOfGames+1, today, req.body.username);
        return res.redirect('/game');
    }
    else{
        return res.redirect('/wronginformation');
    }
});

app.get('/signup', (req, res) => {
    return res.sendFile(__dirname + '/signup.html');
});

app.post("/signup", (req, res) => {

    const userRecord = db.prepare("SELECT EXISTS(SELECT 1 from accountinfo where username = ? or emailAddress = ?)").get(req.body.username,req.body.email);
	if(userRecord['EXISTS(SELECT 1 from accountinfo where username = ? or emailAddress = ?)']==1){
        return res.redirect('/alreadyexists');
    }
    else{
        const stmt = db.prepare("INSERT INTO accountinfo (username, password, emailAddress, recentLogin,numOfGames) VALUES (?,?,?,?,?)");
        const info = stmt.run(req.body.username, req.body.password, req.body.email,0,0);
        return res.redirect('/login');
    }
});

app.get('/alreadyexists',(req,res) =>{
    return res.sendFile(__dirname + '/alreadyexists.html');
})

app.get('/wronginformation',(req,res) =>{
    return res.sendFile(__dirname + '/wronginformation.html');
})

app.get('/game', (req, res) => {
    return res.sendFile(__dirname + '/game.html');
});

app.use(function(req, res){
    res.status(404);
});