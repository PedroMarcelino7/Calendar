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

app.get('/activities/filter/priority', (req, res) => {
    const query = `
        SELECT * FROM ACTIVITY
        WHERE ACTIVITY_ACTIVE = 1
        ORDER BY ACTIVITY_PRIORITY
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching activities:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

app.get('/activities/filter/status', (req, res) => {
    const query = `
        SELECT * FROM ACTIVITY
        WHERE ACTIVITY_ACTIVE = 1
        ORDER BY ACTIVITY_STATUS
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching activities:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

app.get('/activities/filter/date', (req, res) => {
    const query = `
        SELECT * FROM ACTIVITY
        WHERE ACTIVITY_ACTIVE = 1
        ORDER BY ACTIVITY_DATE
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching activities:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

app.post('/activity', (req, res) => {
    const { title, date, dateEnd, description, priority, status } = req.body;

    const query = `
        INSERT INTO
        ACTIVITY (ACTIVITY_TITLE, ACTIVITY_DATE, ACTIVITY_DATE_END, ACTIVITY_DESCRIPTION, ACTIVITY_PRIORITY, ACTIVITY_STATUS)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [title, date, dateEnd, description, priority, status];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error creating activity:", err);
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
