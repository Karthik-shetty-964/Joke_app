import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { error } from 'console';

const app = express();
const port = 3000;
const API_URL = 'https://v2.jokeapi.dev/joke';

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", async (req, res) => {
    try {
        if(req.body['joke-category'] === "") {
            throw error;
        }
        const response = await axios.get(API_URL + `/${req.body['joke-category']}?type=single`);
        res.render("index.ejs", {joke : response.data.joke});
    } catch (error) {
        res.render("index.ejs", {joke : "Please choose a category.. "})
    }
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})