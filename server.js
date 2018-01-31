let express = require('express');
let path = require('path');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let mongoose = require('mongoose');
let PORT = process.env.port | 5000;
let bodyParser = require('body-parser');
let cors = require('cors');
let Routes = require('./src/Routes/routes');
let User = require('./schemas/users');

const { SHA256 } = require('crypto-js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myBlogs', function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Database Connected")
    }
});

app.use(Routes);

io.on('connection', function(socket) {
    // Tell clients someone signed in
    socket.on('signedIn', (data) => {
        socket.join(data);
        User.findOneAndUpdate({ username: data }, { $set: { active: true } }, function(err, res) {
            if (res) {
                socket.broadcast.emit('joined', data);
            }
        });
    });
    // Tell clients someone signed out
    socket.on('signedOut', (data) => {
        User.findOneAndUpdate({ username: data }, { $set: { active: false } }, function(err, res) {
            if (err) res.send(err);
            if (res) {
                socket.emit('userLeft', res); // broadcast.
            }
        });
        //socket.leave(data);
    });

    // Send message to logged in user
    socket.on('message', (data) => {
        console.log('sent message to: ' + data.recipient);
        console.log('message: ' + data.message);
        socket.broadcast.to(data.recipient).emit('messageReceived', { message: data.message, sender: data.sender });
    });

    socket.on('memberList', () => {
        User.find({}, function(err, data) {
            if (err) {
                //res.status(401).send('No data');
                return;
            }
            //res.send(data);
            socket.emit('loadmembers', data);
        });
    });

    io.on('disconnnnected', function() {
        User.findOneAndUpdate({ username: data }, { $set: { active: false } }, function(err, res) {
            if (res) {
                socket.emit('left', res);
            }
        });
    });
});

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})