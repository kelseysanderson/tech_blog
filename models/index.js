const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

Post.belongsTo (User, {
  foreignKey: 'user_id',
});

User.hasMany (Post, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany( Comment, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

module.exports = { Post, Comment, User };


//user has many posts
//comment belongs to post
//post belongs to one user
//comment belongs to user
//post has many comments
//user has many comments

