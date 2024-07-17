// Get the client
const mysql = require('mysql2');
//get the faker
const { faker } = require('@faker-js/faker');

const path = require("path");



//craeting server
const express = require('express');
const app = express();
const port = 3000;

//using method override
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

//specifing the views and public folder path
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


//Home route
app.get('/home', (req, res) =>{
    let q="select count(*) from user";
    try{
            connection.query(q,(err,result)=>{
                if (err) throw err;
                // console.log(result[0]['count(*)']);
                // res.send(`${result[0]['count(*)']}`);
                let count =result[0]['count(*)'];
                res.render("home.ejs",{count});
            });
        }catch(err){
            console.log(err);
            res.send("some error in database");
        }
 
});

//Show All Users route
app.get("/showUsers",(req,res)=>{
  let q="select * from user";
  try{
    connection.query(q,(err,users)=>{
      if(err) throw err;
      // console.log(result);
      res.render("showUsers.ejs",{users});
      
    });
  }catch(err){
    console.log(err);
    res.send("some error occured in show route db");
  }
});


//edit route
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q =`select * from user where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      // console.log(result[0]);
      let user=result[0];
      res.render("edit.ejs",{user});
      
    });
  }catch(err){
    console.log(err);
    res.send("some error occured in show route db");
  }
  
});


//upadate in DB route
app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let{password:formpass, username:newusername}=req.body;
  let q =`select * from user where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      // console.log(result[0]);
      let user=result[0];
      if(formpass != user.password)
      {
        res.send("WRONG PASSWORD!");
      }
      else
      {
        
        let q2 =`update user set username='${newusername}' where id='${id}'`;
        connection.query(q2,(err,result)=>{
        if(err) throw err;        
        // res.send(result);
        else{
          res.redirect("/home");
        }
        
      });
        
      }
    });
  }catch(err){
    console.log(err);
    res.send("some error occured in show route db");
  }
  
});


//delete route
app.get("/user/:id/delete",(req,res)=>{
  let {id}=req.params;
  let q =`select * from user where id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      // console.log(result[0]);
      let user=result[0];
      res.render("delete.ejs",{user});
      
    });
  }catch(err){
    console.log(err);
    res.send("some error occured in show route db");
  }
  
});

//delete in DB route
app.delete("/user/:id",(req,res)=>{
  let {id}=req.params;
  let{password:formpass}=req.body;
  let q =`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      // console.log(result[0]);
      let user=result[0];
      if(formpass != user.password)
      {
        res.send("WRONG PASSWORD!");
      }
      else
      {
        
        let q2 =`delete from user where id='${id}'`;
        connection.query(q2,(err,result)=>{
        if(err) throw err;   
        
        else{
          // res.send(result);
        res.redirect("/home");
        }
        
      });
        
      }
    });
  }catch(err){
    console.log(err);
    res.send("some error occured in show route db");
  }
  
});



//New route
app.get("/newuser",(req,res)=>{
  res.render("new.ejs");
});
app.post("/newuser",(req,res)=>{
  let {username,email,password}=req.body;
  let id=faker.string.uuid();
  // let data=[{id,username,email,password}];

  let q=`INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;
  try{
    connection.query(q,[id, username, email, password],(err,result)=>{
      if(err){
        console.error(err);
      return res.render("exist.ejs");
      }
      // console.log("added new user");
      res.redirect("/home");
    });
  }catch(err){
    console.log(err);
    res.send("some error occured in show route db");
  }
  // console.log(data);
  // console.log({id,username,email,password});
  
})



app.listen(port, () =>{
    console.log(`app listening on port ${port}!`);
});

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Delta_app',
    password:'Ninad@8767046619', 
  });

//querry variable
// let q="insert into user(id,username,email,password) values ?";
// let users=[
//     ["1","ninad","ninad@gmail.com","ninad123"],
//     ["2","sanket","sanket@gmail.com","sanket123"],
//     ["3","shubham","shubham@gmail.com","shubham123"],
//     ["4","pavan","pavan@gmail.com","pavan123"],
    
// ];
//data created and inserted using faker

let getRandomUser=()=> {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
      
    ];
  };

// creating bulk of data
let data=[];
for(let i=1;i<=20;i++)
{
    data.push(getRandomUser());
}



// first querry
// let q="insert into user(id,username,email,password) values ?";
// try{
//     connection.query(q,[data],(err,result)=>{
//         if (err) throw err;
//         console.log(result);
//         // console.log(result.length);
//         // console.log(result[0]);
//         // console.log(result[1]);
//     });
// }catch(err){
//     console.log(err);
// }

// to cut connection
// connection.end();

 

// console.log(getRandomUser());

