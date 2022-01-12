const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const isAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [[ 'date_created', 'DESC']],
            include: [{ model: Comment }, { model: User }],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        if (!userData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
      const postData = await Post.create(req.body);
  
    res.status(200).json(postData);

    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', isAuth, async (req, res) => {
    try {
        const postData = await Post.update({ 
            title: req.body.title,
            post_text: req.body.post_text
        },
           { where: { id: req.body.id } });

        if (!postData) {
            res.status(400).json({ message: 'No post found with that id' });
            return;
        }

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;