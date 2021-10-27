//read environment variable from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDb = require('./Utils/connection');
const { connect } = require('mongoose');
const app = express();

//Importing models
const Player = require('./Models/Player.model');

const PORT = process.env.NODE_PORT || 8084;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Cors middleware
app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/', async(req, res)=>{
    res.status(200).send("Welcome");
});

app.get('/loadState/:name', async(req, res)=>{
    let name = req.params.name;
    try{
        let playerToLoad = await Player.findOne({
            Name: name
        });
        if(playerToLoad !== null){
            //console.log(typeof playerToLoad.State);
            res.status(200).send({statusCode: 200, playerToLoad: playerToLoad.State});
            
            
        }
        else{
            
            res.status(400).send({statusCode: 400, msg: "Player not found"});
        }
    }
    catch(error){
        console.log(error)
        res.status(400).send("Bad Request");
    }
    
});

app.post('/saveState', async(req,res)=>{
    let state = req.body.state;
    let name = req.body.name;
    try{
        let oldPlayer = await Player.findOne({
            Name: name 
        });
        if(oldPlayer !== null){
            oldPlayer.State = state;
            await oldPlayer.save();
        }
        else{
            let newPlayer = new Player({
                Name: name,
                State: state
            });
            newPlayer.save();
        }
        res.status(200).send("Player state is saved!!");
    }

    catch(err){
        res.status(400).send(`Player state could not be saved due to ${err}`);
    }
})

app.listen(PORT, async()=>{
    try{
        await connectDb();
        console.log("Database connected successfully...");
        console.log(`Server started on ${PORT}`);

    }
    catch(error){
        console.log(`Server could not start due to ${error}`);
    }

});