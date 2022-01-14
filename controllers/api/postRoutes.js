const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const isAuth = require('../../utils/auth');

// GET post by id - http://localhost:3001/api/posts/1
router.get('/:id', isAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_text',
      'date_created',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = postData.get({ plain: true });
      res.render('single-post', {
        post,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET all users posts on dashboard - http://localhost:3001/api/posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_text',
      'date_created'
    ],
    order: [['date_created', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      },
    ]
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET single-post by id - http://localhost:3001/api/posts/1
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_text',
      'date_created',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('single-post', {
        posts,
        logged_in: req.session.logged_in
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with that id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a post in the db if logged in - http://localhost:3001/api/posts/create
router.post('/', isAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id
  })
    .then(postData => res.json(postData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE post by id if logged in - http://localhost:3001/api/posts/1
router.put('/:id', isAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE post by id if logged in - http://localhost:3001/api/posts/1
router.delete('/:id', isAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;