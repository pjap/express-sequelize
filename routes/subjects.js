const express = require('express')
const route = express.Router()
const models = require('../models')


// READ DATA TABLE FROM SUBJECT
route.get('/', function(req,res) {
  models.Subject.findAll({
    include: [
      {
        model: models.Teacher
      }
    ]
  })
  .then(subjects => {
    //res.send(subjects)
    res.render('subjects', {data: subjects, pageTitle: 'Express Sequelize'})
  })
  .catch(err => {
    res.send(err)
  })
})


// READ DATA TABLE FROM SUBJECT
// route.get('/', function(req,res) {
//   models.Subject.findAll()
//   .then(subjects => {
//     res.render('subjects', {data: subjects, title: 'HALAMAN SUBJECT'})
//   })
//   .catch(err => {
//     res.send(err)
//   })
// })

// CREATE DATA
route.get('/addSubjects/', function(req,res) {
  models.Subject.findAll()
  .then(subjects => {
    res.render('addSubjects')
  })
  .catch(err => {
    res.send(err)
  })
})

// CREATE DATA TABLE FROM SUBJECT
route.post('/addSubjects', function(req,res) {
  models.Subject.build({
    subject_name: req.body.subject_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .save()
  .then(subjects => {
    res.redirect('/subjects')
  })
})

// DELETE DATA TABLE FROM SUBJECT
route.get('/delete/:id', function(req,res) {
  models.Subject.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/subjects')
  })
})

// EDIT DATA TABLE FROM MODULE SUBJECTS
route.get('/edit/:id', function(req,res) {
  models.Subject.findAll({
    where : {
      id : req.params.id
    }
  })
  .then(subjects => {
    res.render('editSubjects', {data: subjects[0], pageTitle: 'Express Sequelize'})
  })
})

route.post('/edit/:id', function(req,res) {
  models.Subject.update(
    {
      subject_name: req.body.subject_name
    },
    {
      where: { id: req.params.id}
    }
  )
  .then(subjects =>
    res.redirect('/subjects')
  )
})


module.exports = route
