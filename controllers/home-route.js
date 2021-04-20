const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
      const dbPostData = await Post.findAll( {
        attributes: [
          'id',
          'title',
          'content',
          'created_at',
        ],
        include: [{
          model: User,
          attributes: [
            'username',
          ],
        },
        ]
      });
      
      const homepagePosts = dbPostData.map(post => post.get({ plain: true }));
      console.log(homepagePosts)
      res.render('home', {homepagePosts})
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