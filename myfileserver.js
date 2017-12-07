var http = require('http');
var mysql = require("mysql");
var express =  require("express");
var bodyParser =  require("body-parser");
var app =  express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var path = require('path');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });

app.get('/api/users/getid',function(req,res){
  console.log("got into get request");
  con.query('select * from users',function(err,rows){
    console.log("this is the result set");
    console.log(rows);
  	res.end(JSON.stringify(rows));
  });
});
app.get('/api/users/find/:id',function(req,res){
  con.query('select * from users where id = ?', [req.params.id] ,function(err,rows){
  	res.end(JSON.stringify(rows));
  });
});
app.get('/api/users', function(req,res){
  console.log('entered get method');
  res.render('form');
});
app.post('/api/users',function(req,res){
  console.log("entered post method");
  console.log("value from request are");
  console.log(req.body);
 
	con.query('insert into users(id, name, email, salary) values(?,?,?,?)' ,[req.body.id,req.body.name,req.body.email,req.body.salary],function(err,rows){
  	res.end(JSON.stringify(rows));
  });
});


app.listen(1337, (err,res)=>{
  if(err){
    console.log("some error");
  } else{
    console.log("listening on 1337");
  }
});