
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please Login First To View Account.');
    res.redirect('/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    // user dashboard
    if(req.user.type == 'user'){
      res.redirect('/dashboard');
    }
    // for emp
    if(req.user.type == 'emp'){
      res.redirect('/emp/Dashboard')
    }
    // admin dashboard
    else{
      res.redirect('/admin/dashboard')
    }  
  }
};
