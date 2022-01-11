const { Comment } = require('../models');

const commentdata = [
    {
      comment_text: 'I like using it!',
      date_created: '2021-12-11',
      user_id: 3,
      post_id: 1,
    },
    {
      comment_text: 'Handlebars is an ok engine.',
      date_created: '2022-01-03',
      user_id: 2,
      post_id: 3,
    },
    {
      comment_text: 'Makes sense.',
      date_created: '2022-01-11',
      user_id: 4,
      post_id: 4,
    },
    {
      comment_text: 'A good principle to keep things organized.',
      date_created: '2021-12-22',
      user_id: 1,
      post_id: 2,
    },
  ];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;