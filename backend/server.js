import express from 'express';
import cors from 'cors';
import { connection } from './db.js';

const app = express();
const SECRET_KEY = 'logged';

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/activities', (req, res) => {
    const query = `
        SELECT * FROM ACTIVITY
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching activities:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

// app.post('/users', (req, res) => {
//     const { userEmail, userPassword } = req.body;

//     if (!userEmail || !userPassword) {
//         return res.status(400).json({ error: 'userEmail and userPassword are required' });
//     }

//     const query = `
//         INSERT INTO USERS (USER_EMAIL, USER_PASSWORD)
//         VALUES (?, ?)
//     `;

//     const values = [userEmail, userPassword];

//     connection.query(query, values, (err, results) => {
//         if (err) {
//             console.error("Error inserting user:", err);
//             return res.status(500).send(err);
//         }

//         res.status(201).json(results);
//     });
// });

// app.get('/movies', (req, res) => {
//     const query = `
//         SELECT * FROM REVIEWS
//     `;

//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching movies:", err);
//             return res.status(500).send(err);
//         }

//         res.json(results);
//     });
// });

// app.post('/movies/reviews', (req, res) => {
//     const { movieTitle, movieReview, movieRating, movieReleaseDate, movieImg } = req.body;

//     const query = `
//         INSERT INTO 
//         REVIEWS (REVIEW_MOVIE_TITLE, REVIEW_MOVIE_DATE, REVIEW_MOVIE_IMG, REVIEW_MOVIE_RATING, REVIEW_MOVIE_REVIEW)
//         VALUES (?, ?, ?, ?, ?)
//     `;

//     const values = [movieTitle, movieReleaseDate, movieImg, movieRating, movieReview];

//     connection.query(query, values, (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         res.status(201).json(results);
//     });
// });

// app.post('/movies/reviews/edit', (req, res) => {
//     const { id, movieTitle, movieReview, movieRating, movieReleaseDate, movieImg } = req.body;

//     const query = `
//         UPDATE REVIEWS
//         SET REVIEW_MOVIE_TITLE = ?,
//             REVIEW_MOVIE_DATE = ?,
//             REVIEW_MOVIE_IMG = ?,
//             REVIEW_MOVIE_RATING = ?,
//             REVIEW_MOVIE_REVIEW = ?
//         WHERE REVIEW_ID = ?;
//     `;

//     const values = [movieTitle, movieReleaseDate, movieImg, movieRating, movieReview, id];

//     connection.query(query, values, (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         res.status(201).json(results);
//     });
// });

// app.post('/movies/reviews/archive', (req, res) => {
//     const { id } = req.body;

//     const query = `
//         UPDATE REVIEWS
//         SET REVIEW_STATUS = 0
//         WHERE REVIEW_ID = ?;
//     `;

//     const values = [id];

//     connection.query(query, values, (err, results) => {
//         if (err) {
//             return res.status(500).send(err);
//         }

//         res.status(201).json(results);
//     });
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
