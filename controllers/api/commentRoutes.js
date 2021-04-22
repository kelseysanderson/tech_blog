const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      where: { 
        id: req.params.id
      },
    });
    res.json(dbCommentData);

    if(!dbCommentData){
      res.status(404).json({message: "No post with this id was found."})
    }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try{
    const commentData = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
      res.json(commentData);
  } catch {
      console.log(err);
      res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No post was found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;