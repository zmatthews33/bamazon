const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected");

  showGoods();
});

function showGoods() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function(err, res) {
    console.log("~~~ Items Available for Sale ~~~");
    res.forEach(function(product) {
      console.log(
        "ID: " +
          product.item_id +
          " | " +
          product.product_name +
          " | " +
          product.price
      );
      console.log("\n----------------------\n");
    });
  });
}
