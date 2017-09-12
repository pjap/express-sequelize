var express = require('express');
var router = express.Router();
const models = require('../models')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { pageTitle: 'Halaman Index' });
// });

router.get('/login', function(req,res) {
  res.render('login', {pageTitle: 'Express Sequelize'})
})

// router.post('/login', function(req,res) {
//   models.User.findAll({
//     where: {username: req.body.username}
//     .then(user => {
//       if(user[0].password === req.body.password){
//         req.session.login = true;
//         req.session.username = user[0].username;
//         req.session.role = user[0].role
//         res.redirect('/')
//       } else {
//         res.render('login')
//       }
//     })
//   })
//   .catch(err => {
//     res.send(err)
//   })
// })

router.post('/login', (req,res) => {
 models.User.findAll({where: {username:req.body.username}})
 .then(data => {
     if(data[0].password === req.body.password){
       req.session.login= true;
       req.session.username= data[0].username
       req.session.role= data[0].role
       res.redirect('/')
     }else {
       res.render('login', {err:"“Invalid Password”", pageTitle: 'Express Sequelize', session: req.session})
     }
 })
 .catch(err => {
   res.render('login', {err:'“Invalid Username”', pageTitle: 'Express Sequelize', session: req.session})
 })
})

router.use((req,res,next) => {
  if(req.session.login == true) {
    next()
  } else {
    res.redirect('login')
  }
})

router.get('/', function(req,res) {
  res.render('index')
})

router.get('/logout', function(req,res) {
  req.session.destroy()
  res.redirect('login')
})

module.exports = router;
