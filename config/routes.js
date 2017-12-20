var passport = require('passport');
var index = require('../app/controllers');
var employee = require('../app/controllers/employee');

// Authentication or Session check
function authenticated(req, res, next) {
    console.log("req.user ------>", req.user);
    console.log("req.session ------>", req.session);
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = function (app) {
  app.get('/', authenticated, index.default);
  app.get('/login', index.login);
  app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/employee', failureRedirect: '/login?request=invalid' }));
  app.get('/signup', index.signup);
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

  //Employee
  app.get('/employee', authenticated, employee.list);
  app.get('/add-employee', authenticated, employee.employeeForm);
  app.post('/add-employee', authenticated, employee.addEmployee);
  app.get('/edit-employee/:id', authenticated, employee.editEmployee);
  app.post('/edit-employee/:id', authenticated, employee.updateEmployee);
  app.get('/delete-employee/:id', authenticated, employee.deleteEmployee);

//<==============================>
/**
* Error handling
*/

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
  });
}