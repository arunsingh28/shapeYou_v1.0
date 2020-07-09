const express = require('express');
const dash = express.Router()

dash.get('/profile',(req,res)=>{
    res.render('profile',{
        title : 'Profile',
        user : req.user
    })
})


module.exports = dash;