const express = require('express');
const session = require('express-session');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { Customer } = require("./models/index")
const app = express();
const port = 3000;

const customers = require("./routes/customers");
const register = require("./routes/register");
const farmers = require("./routes/farmers");
const products = require("./routes/products");
const landing = require('./routes/landing');
const home = require("./routes/home");
const logout = require('./routes/logout');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(register)
app.use(landing)



const secretKey = uuid.v4();

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000000 }
}));

let errMsg

function auth(req, res, next) {
  // console.log(req.session);
  if (req.session && req.session.isAuthenticated) {
    next();
  } else {
    if (req.path === '/login') {
      next();
    } else {
      res.redirect('/login');
    }
  }
}

app.use(auth, customers);
app.use(auth, farmers);
app.use(auth, products);
app.use(auth, home)


app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
let errMsg
  Customer.findOne({ where: { username } })
    .then(user => {
      if (!user) {
        errMsg = 'Useer Is Not Found, Please Register'
        return res.send('login', { errMsg });
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            req.session.isAuthenticated = true;
            req.session.user = user;
             errMsg = false
            res.redirect('/home');
          } else {
             errMsg = 'Passsword is incorrect.'
            return res.send()
          }
        })
    })
    .catch(err => {
      console.error(err);
      res.send(err);
    });
});

app.use(logout);


app.listen(port, () => {
  console.log(`Disayurin app listening on port ${port}`);
});
