const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

// Middleware per il parsing del body delle richieste in formato JSON
app.use(express.json());

// Connessione al database MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'jaita', // Inserire il nome utente del database
    password: 'jaita107', // Inserire la password del database
    database: 'javeat' // Inserire il nome del database
  });
  
  
connection.connect(err => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
    throw err;
  }
  console.log('Connessione al database MySQL avvenuta con successo');
});

// Middleware per gestire gli errori di connessione
const handleConnectionError = (req, res, next) => {
  if (!connection) {
    res.status(500).json({ error: 'Errore nella connessione al database' });
  } else {
    next();
  }
};

app.get('/api/restaurants', handleConnectionError, (req, res) => {
    connection.query('SELECT * FROM restaurant', (error, results) => {
      if (error) {
        console.error('Errore durante il recupero dei dati:', error);
        res.status(500).json({ error: 'Errore durante il recupero dei dati' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Nessun ristorante trovato' });
        return;
      }
  
      res.json(results);
    });
  });

  // Avvio del server Express
app.listen(PORT, () => {
    console.log(`Server Express in esecuzione sulla porta ${PORT}`);
  });
  