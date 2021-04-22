const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: [{
        model: Comment,
          attributes: [
            'username',
            'comment',
            'user_id',
            'post_id',
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
    res.json(dbPostData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: { 
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: [{
        model: Comment,
          attributes: [
            'username',
            'comment',
            'user_id',
            'post_id',
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
    res.json(dbPostData)
    // const viewOnePost = dbSinglePostData.map(post => post.get({ plain: true }));
    // res.render('viewonepage', {viewOnePost, "user": req.session.user, })
    if(!dbPostData){
      res.status(404).json({message: "No post with this id was found."})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try{
    const commentData = await Post.create(req.body);
      req.session.comment= {
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id,
      };
      res.json(commentData)
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post was found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;