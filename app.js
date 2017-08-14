const express       = require("express"),
      mongoose      = require("mongoose"),
      bodyParser	= require("body-parser"),
      cookieSession = require("cookie-session"),
      passport      = require("passport"),
      keys          = require("./config/keys");
      
require("./models/user");
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
      
const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({ 
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
); 

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.senfFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log("Server is on.");
});