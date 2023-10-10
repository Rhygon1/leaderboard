const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const socketIo = require('socket.io');
const io = socketIo(server);

const schema = new mongoose.Schema({
    Name: String,
    Score: Number
})

const model = mongoose.model('score', schema)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

mongoose.connect('mongodb+srv://Dhruv:gilbert130@cluster0.rcpc7.mongodb.net/mr-cross-speedrun?retryWrites=true&w=majority')
    .then(() => model.find({}).sort('Score').exec())
    .then(() => {
        server.listen(3000)
    })

app.get('/leaderboard', async (req, res) => {
    let response = await model.find({}).sort('Score').exec()
    res.send(response)
})

app.post('/leaderboard', (req, res) => {
    if(!req.body.Name || !req.body.Score){
        res.send('Smt went wrong :/')
        return
    }
    let obj = {
        Name: req.body.Name,
        Score: req.body.Score
    }
    console.log(req.body)

    model.updateOne({Name: obj.Name}, {Score: obj.Score})
        .then(response => {
            if(response.matchedCount === 0){
                console.log('a')
                model.create(obj)
                    .then(r => {
                        res.send(r)
                    })
            } else {
                res.send(response)
            }
            io.emit('UpdateLeaderboard')
    })
})