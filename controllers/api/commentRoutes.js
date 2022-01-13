const router = require('express').Router();
const { Comment } = require('../../models');
const isAuth = require('../../utils/auth');

// find all comments - http://localhost:3001/api/comment/
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// post a comment if logged in - http://localhost:3001/api/comment/
router.post('/', isAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;