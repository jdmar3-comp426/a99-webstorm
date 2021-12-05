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
    return res.redirect('/app');
  });

app.get('/app',(req,res) =>{
    return res.redirect('/app/login');
})
app.get('/app/login', (req, res) => {
    return res.sendFile(__dirname + '/login.html');
});

app.get('/app/wp2180140.jpeg', (req, res) => {
    return res.sendFile(__dirname + '/wp2180140.jpeg')
})

app.get('/wp2180140.jpeg', (req, res) => {
    return res.sendFile(__dirname + '/wp2180140.jpeg')
})

app.get('/app/main.css', (req, res) => {
    return res.sendFile(__dirname + '/main.css')
})

app.get('/app/main.js', (req, res) => {
    return res.sendFile(__dirname + '/main.js')
})

app.get('/app/server.js', (req, res) => {
    return res.sendFile(__dirname + '/server.js')
})

app.post("/app/login", (req, res) => {
    const confirmInfo = db.prepare("SELECT EXISTS(SELECT 1 from accountinfo where username = ? and password = ?)").get(req.body.username, req.body.password);
	if(confirmInfo['EXISTS(SELECT 1 from accountinfo where username = ? and password = ?)']==1){
        const numOfGames = db.prepare("SELECT * from accountinfo where username = ?").get(req.body.username);
        console.log(numOfGames.numOfGames);
        let today = new Date().toISOString().slice(0, 10)
        const stmt = db.prepare("UPDATE accountinfo SET numOfGames = ?, recentLogin = ? WHERE username = ?");
        const info2 = stmt.run(numOfGames.numOfGames+1, today, req.body.username);
        return res.redirect('/app/game');
    }
    else{
        return res.redirect('/app/wronginformation');
    }
});

app.get('/app/signup', (req, res) => {
    return res.sendFile(__dirname + '/signup.html');
});

app.post("/app/signup", (req, res) => {

    const userRecord = db.prepare("SELECT EXISTS(SELECT 1 from accountinfo where username = ? or emailAddress = ?)").get(req.body.username,req.body.email);
	if(userRecord['EXISTS(SELECT 1 from accountinfo where username = ? or emailAddress = ?)']==1){
        return res.redirect('/app/alreadyexists');
    }
    else{
        const stmt = db.prepare("INSERT INTO accountinfo (username, password, emailAddress, recentLogin,numOfGames) VALUES (?,?,?,?,?)");
        const info = stmt.run(req.body.username, req.body.password, req.body.email,0,0);
        return res.redirect('/app/login');
    }
});

app.get('/app/alreadyexists',(req,res) =>{
    return res.sendFile(__dirname + '/alreadyexists.html');
})

app.get('/app/wronginformation',(req,res) =>{
    return res.sendFile(__dirname + '/wronginformation.html');
})

app.get('/app/game', (req, res) => {
    return res.sendFile(__dirname + '/game.html');
});

app.get('/app/changeInfo', (req, res) => {
    return res.sendFile(__dirname + '/changeInfo.html');
});

app.post('/app/changeInfo', (req, res) => {
    const confirmInfo = db.prepare("SELECT * from accountinfo where username = ?").get(req.body.username);
	if(confirmInfo.password==req.body.password){
        const stmt = db.prepare("UPDATE accountinfo SET username = ?, password = ? WHERE username = ?");
        const info2 = stmt.run(req.body.username_new, req.body.password_new, req.body.username);
        return res.redirect('/app/login');
    }
    else{
        return res.redirect('/app/wronginformation');
    }
});

app.post('/app/destroy', (req, res) => {
    const stmt = db.prepare("DELETE FROM accountinfo WHERE username = ?");
	const info = stmt.run(req.body.username);
    }
);

app.use(function(req, res){
    res.status(404);
});