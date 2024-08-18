import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js'
import Cors from 'cors'

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://o381208198:1234@cluster0.maptq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//Middlewares
app.use(express.json());
app.use(Cors());
mongoose.connect(connection_url).then(r => console.log('Connected to MongoDB')).catch(e => console.log('Error while connecting to MongoDB:' + e));
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));
app.post('/dating/cards', async (req, res) => {
        const dbCard = req.body;
        try {
            const data = await Cards.create(dbCard);
            res.status(201).send(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }
);
app.get('/dating/cards', async (req, res) => {
    try {
        const data = await Cards.find();
        console.log(data)
        res.status(200).json(data);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
})
app.listen(port, () => console.log(`Listening on localhost: ${port}`));

