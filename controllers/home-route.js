const router = require('express').Router();
const { Gallery, Painting } = require('../models');

router.get('/', async (req, res) => {
    try {
      res.render('home')
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/login', async (req, res) => {
    try {
      res.render('login')
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/dashboard', async (req, res) => {
    try {
      res.render('dashboard')
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/comment', async (req, res) => {
    try {
      res.render('newComment')
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router