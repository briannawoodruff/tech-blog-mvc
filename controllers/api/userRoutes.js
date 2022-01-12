const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const isAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_text', 'date_created']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'date_created'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
          ]

    })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with that id' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(userData => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.email = userData.email;
        req.session.logged_in = true;
  
        res.json(userData)
      })
    })    
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(userData => {
      if(!userData) {
        res.status(400).json({ message: 'Email not Found' });
        return;
      }
      const validPassword = userData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect Password' });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.email = userData.email;
        req.session.logged_in = true;
        res.json({user: userData, message: 'You are now logged in!' });
      });
    });
  });

router.post('/logout', isAuth, (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;