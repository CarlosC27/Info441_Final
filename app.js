import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {promises as fs} from 'fs';


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import models from './models.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.models = models
    next()
}) 



app.get("/", async (req, res) => {
    let fileContents = await fs.readFile("public/log-in-page.html")
    res.type("html")
    res.send(fileContents)
})

app.get('/style.css', async (req, res) => {
    console.log("request to '/style.css', sending back css content")
    let fileContents = await fs.readFile("public/stylesheets/style.css")
    res.type("css")
    res.send(fileContents)
})

export default app;