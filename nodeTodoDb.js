const mysql = require('mysql');

const config = require('./config').config;

exports.addTodo = function (sessionId, todo, callback) {
  const con = mysql.createConnection(config);
  // call con.connect();
  con.connect(function(err)
  {
    if(err)
    {
      return callback(err);
    }
    console.log("Connection Successful");
    var sql = "INSERT INTO Todos (description, sessionID) VALUES (?,?);";
    con.query(sql, [todo,sessionId], function(err, result)
    {
      if(err) throw err;
      con.end();
    });

  });
};

exports.getTodos = function (sessionId, callback) {
  const con = mysql.createConnection(config);
  con.connect(function(err) 
  {   // con.connect() is called 
    if (err) 
    {
      return callback(err);
    }
    console.log("Connection Successful");
    var sql = "SELECT * FROM Todos WHERE sessionId = ?;";
    con.query(sql, sessionId, function(err, result)
    {
      if (err) 
      {
        throw err;
      }
      callback(err, result);
      con.end();
    });
  });
};