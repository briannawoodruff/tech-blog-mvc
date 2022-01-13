const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const isAuth = require('../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'post_text',
      'date_created',
    ],

    order: [['date_created', 'DESC']],
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
      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/', isAuth, (req, res) => {
//   Post.findAll({
//     where: {
//       user_id: req.session.user_id
//     },
//     attributes: [
//       'id',
//       'title',
//       'post_text',
//       'date_created',
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(postData => {
//       const posts = postData.map(post => post.get({ plain: true }));
//       res.render('dashboard', { posts, logged_in: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get('/edit/:id', (req, res) => {
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

router.get('/create', isAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'post_text',
      'date_created',
    ],
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
      }
    ]
  })
    .then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('create-post', { posts, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;