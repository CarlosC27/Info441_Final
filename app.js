import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {promises as fs} from 'fs';
import WebAppAuthProvider from 'msal-node-wrapper';
import session from 'express-session';
import apiRouter from './routes/api/v1/apiv1.js';


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

const authConfig = {
    auth: {
        clientId: "f7ae4642-1ee4-4d86-b40a-7ea47ef3fb8c",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "LLz8Q~nx0tDkJXf1mUnhumwwmomGklWNNnvNlcVn",
        redirectUri: "http://localhost:3000/redirect"
    },
    system: {
        loggerOptions: {
        	loggerCallback(loglevel, message, containsPii) {
            	console.log(message);
        	},
        	piiLoggingEnabled: false,
        	logLevel: 3,
    	}
    }
};
app.enable('trust proxy')
const oneDay = 1000 * 60 * 60 * 24
app.use(session({
    secret: "this is some secret key I am making up 093u4oih54lkndso8y43hewrdskjf",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());
app.use(authProvider.interactionErrorHandler());

app.use('/api', apiRouter);

app.get('/signin', (req, res, next) => {
    console.log('Sign-in initiated...');
    return req.authContext.login({
        postLoginRedirectUri: "/homepage.html", // Redirect after login
    })(req, res, next);
});

app.get('/signout', (req, res, next) => {
    return req.authContext.logout({
        postLogoutRedirectUri: "/log-in-page.html",// redirect here after logout
    })(req, res, next);

});

// router.get('/myIdentity', (req, res) => {
//     console.log("Session Data:", req.session);
//     if (req.session.isAuthenticated) {
//         res.json({
//             status: "loggedin",
//             userInfo: {
//                 name: req.session.account?.name,
//                 username: req.session.account?.username,
//             },
//         });
//     } else {
//         res.json({ status: "loggedout" });
//     }
// });

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