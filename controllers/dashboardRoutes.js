const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const isAuth = require('../utils/auth');

router.get('/', isAuth, async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            include: [
                { model: Comment }, { model: User }
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', isAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: Comment }, { model: User }
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        const post = postData.get({ plain: true });

        res.render('edit-post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/create', isAuth, async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                { model: Comment }, { model: User }
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('create-post', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;