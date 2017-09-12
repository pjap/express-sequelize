const express = require('express');
const route = express.Router();
const models = require('../models')

//READ DATA TABLE FROM MODULE STUDENTS
route.get('/', function(req,res) {
  models.Student.findAll()
  .then(students => {
    res.render('students', {data: students, pageTitle: 'Express Sequelize'})
  })
  .catch(err => {
    res.send(err)
  })
})

route.get('/addStudents', function(req,res) {
  models.Student.findAll()
  .then(students => {
    res.render('addStudents')
  })
  .catch(err => {
    res.send(err)
  })
})

route.post('/addStudents', function(req,res) {
  models.Student.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .save()
  .then(students => {
    res.redirect('/students')
  })
})

// DELETE DATA TABLE FROM MODULE TEACHER
route.get('/delete/:id', function(req,res) {
  models.Student.destroy({
    where: {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
})
//
// EDIT DATA TABLE FROM MODULE TEACHERS
route.get('/edit/:id', function(req,res){
  models.Student.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(students => {
    res.render('editStudents', {data: students[0], pageTitle: 'Express Sequelize'})
  })
})

route.post('/edit/:id', function(req,res) {
  models.Student.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(students =>
    res.redirect('/students')
  )
})



module.exports = route
