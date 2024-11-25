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

app.get("/home", async (req, res) => {
    let fileContents = await fs.readFile("public/homepage.html")
    res.type("html")
    res.send(fileContents)
})

app.get("/newjob", async (req, res) => {
    let fileContents = await fs.readFile("public/new-job-review-page.html")
    res.type("html")
    res.send(fileContents)
})
app.get("/newresume", async (req, res) => {
    let fileContents = await fs.readFile("public/upload-new-resume.html")
    res.type("html")
    res.send(fileContents)
})

app.get("/profile", async (req, res) => {
    let fileContents = await fs.readFile("public/profile-page.html")
    res.type("html")
    res.send(fileContents)
})

app.get("/editprofile", async (req, res) => {
    let fileContents = await fs.readFile("public/edit-profile.html")
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