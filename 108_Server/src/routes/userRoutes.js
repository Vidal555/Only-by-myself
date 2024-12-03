import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// נתיב הרשמה (Sign Up)
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // בדיקה שכל השדות נשלחו
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // יצירת משתמש חדש
        const newUser = new User({ name, email, password });
        await newUser.save();

        // תשובה למשתמש
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// נתיב התחברות (Login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // בדיקה שכל השדות נשלחו
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // חיפוש המשתמש במסד הנתונים
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // בדיקת סיסמה
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // תשובה למשתמש
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to log in' });
    }
});

export default router;
