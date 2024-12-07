import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import WebAppAuthProvider from 'msal-node-wrapper'
import session from 'express-session'
import models from './models.js';

import apiRouter from './routes/api/v1/apiv1.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'log-in-page.html'));
  });
  
  const authConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: "http://localhost:3000/redirect",
        postLoginRedirectUri: "/temp"

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

  app.use((req, res, next) => {
    req.models = models;
    next();
});

app.use('/api', apiRouter);

app.get('/temp', async (req, res) => {
    console.log("Post-login processing...");

    const { username } = req.session.account || {};
    if (!username) {
        console.log("No username found in session. Redirecting to login page.");
        return res.redirect('/log-in-page.html');
    }

    try {
        const user = await req.models.User.findOne({ username });
        if (!user) {
            console.log(`User "${username}" not found in database. Redirecting to registration.`);
            return res.redirect('/register-page.html'); 
        }
        console.log(`User "${username}" authenticated and exists in the database.`);
        return res.redirect('/homepage.html');
    } catch (error) {
        console.error("Error during post-login database check:", error);
        return res.status(500).send("Internal Server Error");
    }
});

app.get('/signin', (req, res, next) => {
    console.log('Sign-in initiated...');
    
    return req.authContext.login({
        postLoginRedirectUri: "/temp", 
    })(req, res, next);
});

app.get('/signinNewUser', (req, res, next) => {
    return req.authContext.login({
        postLoginRedirectUri: "/register-page.html",
    })(req, res, async (err) => {
        if (err) {
            console.error("Error during login:", err);
            return next(err);
        };

        console.log("Session after login:", req.session);
        res.redirect("/register-page.html");
    });
});

app.get('/signout', (req, res, next) => {
    return req.authContext.logout({
        postLogoutRedirectUri: "/log-in-page.html",
    })(req, res, next);

});

app.use((req, res, next) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session Data:", req.session); 
    next();
});

app.use(authProvider.interactionErrorHandler());
export default app;
