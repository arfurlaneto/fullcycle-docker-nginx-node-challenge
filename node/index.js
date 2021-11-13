const express = require('express')
const mysql = require('mysql')

const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

// Migrations
const connection = mysql.createConnection(config)
connection.query('create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id));'); 
connection.query("insert into people(name) values('Tony');")
connection.end();

const app = express()

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)
  connection.query("select name from people limit 1;", function(error, results) {
    if (error) throw error;
    res.send(`<h1>Full Cycle! Name is ${results[0].name}!</h1>`)
  })
  connection.end();
})

app.listen(port, () => {
  console.log('Application is running on port ' + port)
})
