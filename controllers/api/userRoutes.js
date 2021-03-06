const router = require('express').Router();
const { Post, User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user = {
        id: userData.id,
        username: userData.username,
        logged_in: true,
      }
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {

      req.session.user = {
        id: userData.id,
        username: userData.username,
        logged_in: true,
      }
    
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/addpost', async (req, res) => {
  try {
    let newPost = req.body
    newPost.user_id = req.session.user.id
    const postData = await Post.create(newPost);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
