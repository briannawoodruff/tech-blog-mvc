const { User } = require('../models');

const userdata = [
  {
    username: 'Brianna',
    email: 'brianna@email.com',
    password: 'Password1',
  },
  {
    username: 'AshleyLee',
    email: 'ash@email.com',
    password: 'Password12',
  },
  {
    username: 'MaxAllen1',
    email: 'mallen@email.com',
    password: 'Password123',
  },
  {
    username: 'Neo7',
    email: 'neo1@email.com',
    password: 'Password1234',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;