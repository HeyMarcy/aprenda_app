const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const { User, Question } = require('./models');

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  DB_URL: process.env.DB_URL
}

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');   //// What is NODE_ENV??
}

const app = express();

const database = { };  //// don't think this is being used.

app.use(passport.initialize());
app.use(bodyParser.json());

//----------------   AUTH ROUTES   --------------------//
passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        User
        .find({
          'googleId': profile.id
        })
        .then(
          users => {
          console.log(users)
          if (!users[0]) {
              const userScore = 0;
              Question.find().then((questions) => {
                console.log('questions', questions);
                const userQuestions = questions.map((question) => ({
                    score: 0,
                    portuguese: question.portuguese,
                    english: question.english
                }));
                User
                  .create({
                    googleId: profile.id,
                    accessToken: accessToken,
                    questions: userQuestions,
                    score: userScore
                  })
                  .then(
                    user => {
                      return cb(null, user);
                    }
                  )
              })
          } else {
            User
            .findOneAndUpdate({
              googleId: users[0].googleId}, {$set: {accessToken: accessToken}
            }, {new: true})
            .then(
              user => {
                // console.log('afterupdate', user)
                return cb(null, user);
              }
            )
          }
        });
    }
));


passport.use(
    new BearerStrategy(
        (token, done) => {
            User
            .find({
              'accessToken': token
            })
            .then(
              users => {
              console.log(users)
              if (!users[0]) {
                return done(null, false);
              }
              return done(null, users[0]);
              }
          )
        }
    )
);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

//------------------------------- AUTH ROUTES END  --------------------//


app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);


app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
      let questions = req.user.questions.sort((a,b)=>{
        return a.score - b.score;
      })
      res.json(questions.slice(0,10));
    }
);
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/answer',
passport.authenticate('bearer', {session: false}),
    (req, res) => {
      User.findOneAndUpdate( {googleId: req.user.googleId, "questions._id": req.body.questions})
      console.log("req.body ", req.body);
      //  res.json("Hello, world");
    }
);



//  "questionSet._id": mongoose.Types.ObjectId(questionId) /// from Aaron as suggestion

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;

function runServer(port=3001, databaseUrl=secret.DB_URL) {
    return new Promise((resolve, reject) => {
        console.log(databaseUrl);
        mongoose.connect(databaseUrl, err => {
          if (err) {
            return reject(err);
          }

        server = app.listen(port, () => {
            resolve();
        }).on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
      });
    });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
  });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
