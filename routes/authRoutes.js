const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');

// Landing page
router.get('/', (req, res) => {
    res.render('landing', { title: 'KickNHit - Welcome' });
});

// Admin login page
router.get('/admin/login', (req, res) => {
    res.render('admin-login', { title: 'Admin Login', error: null });
});

// User login page
router.get('/user/login', (req, res) => {
    res.render('user-login', { title: 'User Login', error: null });
});

// User signup page
router.get('/user/signup', (req, res) => {
    res.render('user-signup', { title: 'User Signup', error: null });
});

// Admin login process
router.post('/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin) {
            return res.render('admin-login', {
                title: 'Admin Login',
                error: 'Invalid admin credentials'
            });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.render('admin-login', {
                title: 'Admin Login',
                error: 'Invalid admin credentials'
            });
        }

        req.session.user = {
            _id: admin._id,
            firstName: admin.firstName,
            role: admin.role,
            type: 'admin'
        };

        res.redirect('/admin/dashboard');

    } catch (error) {
        console.error('Admin login error:', error);
        res.render('admin-login', {
            title: 'Admin Login',
            error: 'Login failed'
        });
    }
});

// User login process
router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || user.role !== 'user') {
            return res.render('user-login', {
                title: 'User Login',
                error: 'Invalid user credentials'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('user-login', {
                title: 'User Login',
                error: 'Invalid user credentials'
            });
        }

        req.session.user = {
            _id: user._id,
            firstName: user.firstName,
            role: user.role
        };

        res.redirect('/user/dashboard');

    } catch (error) {
        console.error('User login error:', error);
        res.render('user-login', {
            title: 'User Login',
            error: 'Login failed'
        });
    }
});

// User signup process
router.post('/user/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.render('user-signup', {
                title: 'User Signup',
                error: 'User already exists'
            });
        }

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            role: 'user'
        });

        await newUser.save();

        req.session.user = {
            _id: newUser._id,
            firstName: newUser.firstName,
            role: newUser.role
        };

        res.redirect('/user/dashboard');

    } catch (error) {
        console.error('User signup error:', error);
        res.render('user-signup', {
            title: 'User Signup',
            error: 'Signup failed'
        });
    }
});

// Admin dashboard
router.get('/admin/dashboard', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/admin/login');
    }
    res.render('admin-dashboard', { 
        title: 'Admin Dashboard',
        user: req.session.user 
    });
});

// User dashboard
router.get('/user/dashboard', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'user') {
        return res.redirect('/user/login');
    }
    res.render('user-dashboard', { 
        title: 'User Dashboard',
        user: req.session.user 
    });
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
