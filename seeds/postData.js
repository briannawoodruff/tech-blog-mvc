const { Post } = require('../models');

const postdata = [
  {
    title: 'Why use MVC?',
    post_text: 'MVC allows developers to better organize their file structure under a true separation of concerns.',
    date_created: '2021-12-10',
    user_id: 1,
  },
  {
    title: 'What is separation of concerns?',
    post_text: 'A design principle where each section of a program addresses a separate concern',
    date_created: '2021-12-21',
    user_id: 2,
  },
  {
    title: 'Examples of template engines',
    post_text: 'A template engine is software that allows us to combine data with a static tmeplate to generate dynamic HTML, for example, this website uses Handlebars.',
    date_created: '2022-01-02',
    user_id: 3,
  },
  {
    title: 'Authentication vs Authorization',
    post_text: 'Authentication means confirming your own identity vs authorization means being given access to a system.',
    date_created: '2022-01-10',
    user_id: 4,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;