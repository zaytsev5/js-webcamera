
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
     app_id: '925053',
  key: '07fc6af7ee287c7dc81f',
  secret: '9d28463e66402db7f483',
  cluster: 'ap1',
  encrypted: true
});
// app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    return res.sendFile(__dirname + "/index.html");
});
app.post('/', (req, res) => {
    res.send(req.body.hack)
});
app.get('/home/:id',(req,res) => {
  if(req.query.method === 34)
   console.log("has been deledted " + req.params.id)
 else{
  console.log(req.query.age)
 }
  res.redirect("/")
})
// get authentictation for the channel;
app.post('/pusher/auth', (req, res) => {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        var presenceData = {
            user_id: Math.random().toString(36).slice(2) + Date.now()
        }
        const auth = pusher.authenticate(socketId, channel, presenceData);
        res.send(auth);
});

//listen on the app
app.listen(4000, () => {
    return console.log('Server is up on 3000')
});
