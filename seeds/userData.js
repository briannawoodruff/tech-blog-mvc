const { User } = require('../models');

const userdata = [
  {
    name: 'Brianna',
    email: 'brianna@email.com',
    password: 'Password1',
  },
  {
    name: 'AshleyLee',
    email: 'ash@email.com',
    password: 'Password12',
  },
  {
    name: 'MaxAllen1',
    email: 'mallen@email.com',
    password: 'Password123',
  },
  {
    name: 'Neo7',
    email: 'neo1@email.com',
    password: 'Password1234',
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;