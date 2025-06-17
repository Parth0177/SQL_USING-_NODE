const mysql= require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'Parth._017'
  });

  //INSERTING NEW DATA
let q= "INSERT INTO user (id,username,email,password) VALUES ?";
let users= [["2562","12233_newUser", "ab2c2@gmail.com", "a2bcd"],
            ["234","1234_newUser2", "bcd@gmail.com","1326"]];

try{connection.query(q , [users] , (err,result)=>{
  if (err) throw err;
  console.log(result);
})
}catch(err){
  console.log(err);
}
connection.end();