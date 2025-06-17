const mysql = require('mysql2');
const {faker} = require('@faker-js/faker');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'Parth._017'
})

connection.end();

let getRandomUser = ()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}
