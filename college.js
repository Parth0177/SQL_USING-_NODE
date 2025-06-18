const mysql = require('mysql2');
const faker = require('@faker-js/faker');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'CollegeDB',
  password: 'Parth._017',
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};