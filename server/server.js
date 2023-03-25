import express from "express";
import session from "express-session";
import cors from 'cors'
import fs from 'fs';
import path from 'path';
import { uuid } from 'uuidv4';

// #region Add __dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// #endregion

const port = 3000;
const app = express();
//
app.use(express.json());// Session Setup
app.use(session({
    secret: 'awesome_secret :)',
    resave: true,
    saveUninitialized: true
}));

app.use(cors())

app.get("/", (req, res) => {
    res.send("The server is running!")
})

app.post('/submitTimes', (req, res) => {
    try {
        const userUUID = req.body.uuid ?? uuid();
        // console.log(req.body.uuid)
        console.log(req.body)
        fs.writeFileSync(path.join(__dirname, "users", userUUID), JSON.stringify(req.body));
        res.send(userUUID)
    } catch (err) {
        console.log(err);
    }
})

app.get('/getTimes', (req, res) => {
    console.log(req.query.uuid);
    const userData = fs.readFileSync(path.join(__dirname, "users", req.query.uuid));

    res.type('application/json')
    res.send(userData);
})

app.listen(port, '0.0.0.0', () =>{
    console.log("we started the app!! go to http://localhost:" + port)
})
