var express = require("express");
var session = require("express-session");
var routes = require('./routes')
var app = express();
var port = process.env.PORT || 3001;
var cors = require('cors')
var bodyParser = require('body-parser');
var passport = require("./routes/passport");
var cookieparser = require('cookie-parser')
const mongoose = require('mongoose')
const dbRoute = 'mongodb+srv://Ningauble:Jakeybear5@reptileisland.xkr6d.gcp.mongodb.net/GreatWoods?retryWrites=true&w=majority'
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
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);


// Database connection
mongoose.connect(dbRoute, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
});




    app.listen(port, function() {
      console.log("App listening on PORT " + port);
    });


var path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", function (req, res) {
   res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}