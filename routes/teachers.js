const express = require('express')
const route = express.Router()
const models = require('../models')

// READ DATA TABLE FROM MODULE TEACHER
route.get('/', function(req,res) {
  models.Teacher.findAll({
    order: [['first_name', 'ASC']],
    include: [
      {
        model: models.Subject
      }
    ]
  })
  .then(teachers => {
    res.render('teachers', {data: teachers, pageTitle: 'Express Sequelize' })
  })
  .catch(err => {
    res.send(err)
  })
})

route.get('/addTeachers/', function(req,res) {
  models.Subject.findAll()
  .then(subjects => {
    res.render('addTeachers', {data: subjects})
  })
  .catch(err => {
    res.render('addTeachers')
  })
})


// CREATE DATA TABLE FROM MODULE TEACHERS
route.post('/addTeachers', function(req,res) {
  models.Teacher.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    subjectsId: req.body.subjectsId
  })
  .save()
  .then(teachers => {
    res.redirect('/teachers')
  })
})

// DELETE DATA TABLE FROM MODULE TEACHER
route.get('/delete/:id', function(req,res) {
  models.Teacher.destroy({
    where: {
      id : req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
})
//
// EDIT DATA TABLE FROM MODULE TEACHERS
// route.get('/edit/:id', function(req,res){
//   models.Teacher.findAll({
//     where : {
//       id : req.params.id
//     }
//   })
//   .then(teachers => {
//     res.render('editTeachers', {data: teachers[0], title: 'HALAMAN EDIT TEACHER!'})
//   })
// })
route.get('/edit/:id', function(req,res) {
  models.Teacher.findById(req.params.id)
  .then(teachers => {
    models.Subject.findAll().then(subjects => {
      res.render('editTeachers', {
        data: teachers,
        data2: subjects,
        title: 'HALAMAN EDIT'
      })
    })
  })
})

route.post('/edit/:id', function(req,res) {
  models.Teacher.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      subjectsId: req.body.subjectsId
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(teachers =>
    res.redirect('/teachers')
  )
})


module.exports = route
