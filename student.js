const mysql = require('mysql2');
const {faker} = require('@faker-js/faker');
const express= require('express');
const app= express();
const PORT=5500;
const path= require('path');
const { log } = require('console');

app.set ('view engine','ejs');
app.set('views', path.join(__dirname,"/views"))

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



//HOME ROUTE
app.get('/',(req,res)=>{
  let q= `SELECT count(*) FROM student`;
  try {
  connection.query(q, (err,result)=>{
    if(err) throw err;
    let count= result[0]["count(*)"];
    console.log();
    res.render('home.ejs',{count})
  })
} catch (err) {
  console.log(err);
  
}
})

//SHOW USERS ROUTE
app.get("/user",(req,res)=>{
  let q= `SELECT * FROM student`;
  try {
  connection.query(q, (err,users)=>{
    if(err) throw err;
    //console.log(result);
    res.render('user.ejs',{users});
  })
} catch (err) {
  console.log(err);
  
}
});

//EDIT ROUTE
app.get('/user/:id/edit',(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM student WHERE id= '${id}'`;
  try {
  connection.query(q, (err,result)=>{
    if(err) throw err;
    let user = result[0];
    res.render('edit.ejs',{user});
  })
} catch (err) {
  console.log(err);
}
  
})







app.listen(PORT,(req,res)=>{
  console.log("app is running on port 5500");
  
})

