const { Post } = require('../models');

const postData = [
  {
    title: 'Test 1 title',
    content: 'Test 1 content',
    user_id: 1,
  },
  {
    title: 'Test 2 title',
    content: 'test 2 content.',
    user_id: 2,
  },
  {
    title: 'Test 3 title',
    content: 'Content test 3.',
    user_id: 3,
  },
  {
    title: 'Test 4 title',
    content: 'Content test 4.',
    user_id: 4,
  },
  {
    title: 'Test 5 title',
    content: 'Content test 5.',
    user_id: 5,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
