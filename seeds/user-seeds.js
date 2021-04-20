const { User } = require('../models');

const userData = [
  {
    username: 'Jim Jones',
    password: 'jim123'
  },
  {
    username: 'Sarah Smith',
    password: 'sarah123'
  },
  {
    username: 'Kelly Thomas',
    password: 'kelly123'
  },
  {
    username: 'Ben Humphrey',
    password: 'ben123'
  },
  {
    username: 'Pam Johnson',
    password: 'pam123'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
