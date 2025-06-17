const mysql = require('mysql2');
const {faker} = require('@faker-js/faker');
const express= require('express');
const app= express();
const PORT=5500;
const path= require('path');

app.set ('view engine','ejs');
app.use('views', path.join(__dirname,"/views"))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'Parth._017'
})

let getRandomUser = ()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}




app.get('/',(req,res)=>{
  let q= `SELECT count(*) FROM student`;
  try {
  connection.query(q, (err,result)=>{
    if(err) throw err;
    console.log(result[0]["count(*)"]);
    res.send(result[0]["count(*)"]);
  })
} catch (err) {
  console.log(err);
  
}
})







app.listen(PORT,(req,res)=>{
  console.log("app is running on port 5500");
  
})

