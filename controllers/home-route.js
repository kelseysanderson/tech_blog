const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

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
    res.render('home', {homepagePosts, "user": req.session.user, })

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

router.get('/newpost', withAuth, async (req, res) => {
  try {
    res.render('newpost', {"user": req.session.user})

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try{
    const dbPostData = await Post.findAll( {
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: 
      [{
        model: Comment,
        attributes: [
          'id',
          'comment',
          'post_id',
          'user_id',
        ],
      },
      {
        model: User,
        attributes: [
          'username',
        ],
      },
      ]
    });
    console.log(dbPostData)
    const onePost = dbPostData.map(post => post.get({ plain: true }))[0];
    console.log(onePost)
    res.render('viewonepost', {onePost, "user": req.session.user})
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router