const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'firebase-uid', 'Authorization']
}));

app.use(express.json());

// Available Routes
// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Fix for Railway: Always listen if not imported as a module (e.g. "node index.js")
// OR if specifically running in a production server environment like Railway
if (require.main === module || process.env.NODE_ENV === 'production') {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening at http://0.0.0.0:${port}`)
  })
}

module.exports = app;
