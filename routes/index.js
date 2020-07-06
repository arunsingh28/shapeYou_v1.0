const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const index = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


const userDB = require('../models/User');
const messageDB = require('../models/message');

// Welcome Page
index.get('/', forwardAuthenticated, (req, res) => 
res.render('index',{
  condition : true,
  title : 'ShapeYou'
})
);


// Dashboard
index.get('/dashboard', ensureAuthenticated, (req, res) =>{
  res.render('dashboard',{
    condition : false,
    user : req.user,
    title : 'Dashboard'
  })
});

// login get
index.get('/login',(req,res)=>{
  res.render('login',{
    condition : false,
    title : 'Sign in'
  });
})

// Login post
index.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// logout
index.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

index.get('/user-signup',(req,res)=>{
 res.render('index_sign_up',{
    condition : true,
    title : 'Sign up'
 })
})

// registrion algo
index.post('/user-signup',(req,res)=>{
  const {first_name,last_name,password,C_password,email,belly,arm,neck,thigh,height,weight,g_weight,goal,phone} = req.body;
  const newUser = new userDB({first_name,last_name,password,email,belly,arm,neck,thigh,height,weight,g_weight,goal,phone});
  let errors = [];
  if(password != C_password){
      errors.push({msg : 'Password Not Matching'})
  }
  if (errors.length > 0) {
      res.render('index_sign_up', {
          title : 'Sign up',
          condition : true,
          errors,first_name,last_name,email,belly,arm,neck,thigh,height,weight,g_weight,goal,phone
      });
  }else{
      userDB.findOne({email : email},(err,docs)=>{
          if(err) throw err;
          if(docs){
              errors.push({msg : 'Email already Registered'})
              res.render('index_sign_up',{
                title : 'Sign up',
                condition : true,
                errors,first_name,last_name,belly,arm,neck,thigh,height,weight,g_weight,goal,phone
              });
          }else{
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                  .then(user => {
                    req.flash(
                      'success_msg',
                      'You are now registered and can log in'
                    );
                    res.redirect('/login');
                  })
                  .catch(err => console.log(err));
              });
            });
          }
      })
  }
})


// contact
index.get('/contact',(req,res)=>{
  res.render('contact',{
    condition : true,
    title : 'Contact'
  });
})
// contact POST
index.post('/contact',(req,res)=>{
  const {title,message}= req.body;
  const newMessage = new messageDB({title,message});
  newMessage.save().then(message =>{
    res.render('contact',{
      error : 'Message Send successfully',
      condition : true,
      title : 'Contact'
    })
  }).catch(err => console.log(err));
})


module.exports = index;
