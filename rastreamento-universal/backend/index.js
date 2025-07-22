
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post('/localizacao', async (req, res) => {
  const { user_id, lat, lng, timestamp } = req.body;
  try {
    await pool.query(
      'INSERT INTO localizacoes (user_id, lat, lng, timestamp) VALUES ($1, $2, $3, $4)',
      [user_id, lat, lng, timestamp]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/localizacoes/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const result = await pool.query(
    'SELECT * FROM localizacoes WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 100',
    [user_id]
  );
  res.json(result.rows);
});

app.get('/', (_, res) => res.send('API rodando!'));

app.listen(process.env.PORT || 3000, () =>
  console.log('API online 🚀')
);
