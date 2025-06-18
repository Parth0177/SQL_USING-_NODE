const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');
const express = require('express');
const app = express();
const PORT = 5500;
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Parth._017',
});

// Function to generate a random user
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// HOME ROUTE
app.get('/', (req, res) => {
  let q = `SELECT COUNT(*) AS count FROM student`;
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database Error');
    }
    let count = result[0].count;
    res.render('home.ejs', { count });
  });
});

// SHOW USERS ROUTE
app.get('/user', (req, res) => {
  let q = `SELECT * FROM student`;
  connection.query(q, (err, users) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database Error');
    }
    res.render('user.ejs', { users });
  });
});

// EDIT ROUTE
app.get('/user/:id/edit', (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM student WHERE id = ?`;
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database Error');
    }
    let user = result[0];
    res.render('edit.ejs', { user });
  });
});

// UPDATE ROUTE (PATCH)
app.patch('/user/:id', (req, res) => {
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;

  let q = `SELECT * FROM student WHERE id = ?`;
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database Error');
    }

    let user = result[0];
    if (formPass !== user.password) {
      return res.send('Wrong Password!');
    }

    let q2 = `UPDATE student SET username = ? WHERE id = ?`;
    connection.query(q2, [newUsername, id], (err, updateResult) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Database Error');
      }
      res.redirect('/user');
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
