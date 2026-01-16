const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Available Routes
// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening at http://0.0.0.0:${port}`)
})
