const mysql= require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'Parth._017'
  });

  //INSERTING NEW DATA
let q= "INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)";
let user= ["256","1233_newUser", "abc2@gmail.com", "abcd"];

try{connection.query(q ,user , (err,result)=>{
  if (err) throw err;
  console.log(result);
})
}catch(err){
  console.log(err);
}
connection.end();