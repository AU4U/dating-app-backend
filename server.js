import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js'

const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:your_password@cluster0.lggjc.mongodb.net/datingDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(r => console.log('Connected to MongoDB')).catch(e => console.log('Error while connecting to MongoDB'));
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));
app.post('/dating/cards', (req, res) => {
        const dbCard = req.body;
        Cards.create(dbCard, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
        });
    }
);
app.get('/dating/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})
app.listen(port, () => console.log(`Listening on localhost: ${port}`));

