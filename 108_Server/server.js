import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './src/routes/userRoutes.js';

// קריאת קובץ .env
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // לטיפול ב-CORS
app.use(express.json()); // לטיפול בנתונים בפורמט JSON

// חיבור ל-MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // עצור את השרת אם החיבור נכשל
  });

// חיבור נתיבים
app.use('/api/users', userRouter);

// ניהול שגיאות גלובלי
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
