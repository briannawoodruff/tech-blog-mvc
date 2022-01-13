const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const isAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_text',
            'date_created',
          ],

        order: [[ 'date_created', 'ASC']],
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
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
        console.log(err);
        // res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;