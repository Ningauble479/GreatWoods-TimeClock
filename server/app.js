import express from "express";
import session from "express-session";
import routes from './routes/index.js'
const app = express();
const port = process.env.PORT || 50000;
import cors from 'cors'
import bodyParser from 'body-parser';
// import passportConfig from "./routes/passport.cjs";
import cookieparser from 'cookie-parser'
import mongoose from 'mongoose'
// import passport from 'passport'
const dbRoute = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@51.222.231.153:27017/${process.env.DBNAME}}?authSource=${process.env.DBNAME}`

app.use(cookieparser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
// passportConfig(app)

app.use('/api', routes);

console.log(dbRoute)
// Database connection
mongoose.connect(dbRoute, {
    useCreateIndex: true,
    useFindAndModify: false
});

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  app.use( '/', express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (req, res) {
   res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });


    app.listen(port, function() {
      console.log("App listening on PORT " + port);
    });

//     import passcode from './models/passcodes.js'

//     let newCode = new passcode ({
//       password: 'Welcome321!',
//       level: 'floor'
//   })

//   newCode.save((err)=>{
//       if(err) return console.log({success: false, err: err})
//       return console.log({success: true})
//   })

//   let newCode2 = new passcode ({
//     password: 'Welcome123!',
//     level: 'admin'
// })

// newCode2.save((err)=>{
//     if(err) return console.log({success: false, err: err})
//     return console.log({success: true})
// })