//require Inquirer and MySQL
const inquirer = require("inquirer");
const mysql = require("mysql");

//create connection to DB
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

//show customer goods for sale
function showGoods() {
  var query = "SELECT item_id, product_name, price FROM products";
  connection.query(query, function(err, res) {
    console.log("\x1b[1m\x1b[32m", "BAMAZON");
    console.log("\x1b[0m\x1b[1m", "~-~-~ Items Available for Sale ~-~-~");
    res.forEach(function(product) {
      console.log(
        "\x1b[0m",
        "ID: " +
          product.item_id +
          " | " +
          product.product_name +
          " | " +
          product.price
      );
    });
    console.log("\x1b[0m\x1b[1m", "\n-~-~-~-~-~-~-~-~-~-~-~-~-~-\n");

    //prompt user to select an item to purchase
    inquirer
      .prompt([
        {
          type: "input",
          name: "productID",
          message:
            "Which product would you like to buy? (Please Enter the Product ID)"
        },
        {
          type: "input",
          name: "quantity",
          message: "How many would you like to purchase?"
        }
      ])
      .then(function(resp) {
        // get item by id
        var productID = resp.productID;
        var quantity = parseInt(resp.quantity, 10);

        //get quantity
        var query = "SELECT * FROM products WHERE item_id=?";
        connection.query(query, resp.productID, function(err, res) {
          var item = res[0];
          if (item.stock_quantity >= quantity) {
            var newStockQuantity = item.stock_quantity - quantity;
            var queryUpdate =
              "UPDATE products SET stock_quantity=? WHERE item_id=?";
            var total = quantity * item.price;
            totalPrice = total.toFixed(2);
            //show total and change stock quantity
            connection.query(
              queryUpdate,
              [newStockQuantity, productID],
              function(err, res) {
                console.log(
                  "\x1b[0m\x1b[1m",
                  "\n-~-~-~-~-~-~-~-~-~-~-~-~-~-\n"
                );
                console.log(
                  "TOTAL: $" + totalPrice + " | Thank you for your purchase.\n"
                );
                console.log("\x1b[1m", "-~-~-~-~-~-~-~-~-~-~-~-~-~-\n");
                continueOrLeave();
              }
            );
          } else {
            console.log("\x1b[1m", "\n-~-~-~-~-~-~-~-~-~-~-~-~-~-\n");
            console.log(
              "Sorry, there isn't enough of this item in stock to fullfill your purchase.\n"
            );
            console.log("-~-~-~-~-~-~-~-~-~-~-~-~-~-\n");
            continueOrLeave();
          }
        });
      });
  });
}
//continue shopping or leave the store?
function continueOrLeave() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "continue",
        message: "Would you like to continue shopping?"
      }
    ])
    .then(function(conf) {
      if (conf.continue) {
        showGoods();
      } else {
        console.log("\x1b[1m", "\n-~-~-~-~-~-~-~-~-~-~-~-~-~-\n");
        console.log("Thanks for shopping. Goodbye!");
        connection.end();
      }
    });
}
