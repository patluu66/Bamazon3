var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
  // database: "ice_creamDB"
});

connection.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) {
      throw err;
    };

    startBamazon(res);

  });

}


function startBamazon(res) {
  displayAllItem(res);
  inquirer.prompt([
    {
      type: 'input', 
      name: "id",
      message: "Enter product ID for item that you want to purchase?",
      validate: function(value) {
        if(value <= 10) {
          return true;
        } else {
          // console.log("Try again! Select a valid ID.");
          return false;
        }
      }
    }, {
      type: "input",
      name: "quantity",
      message: "Enter number of quantity?"
    }]).then(function(answers) {

      var query = "SELECT * FROM products WHERE ?";
      connection.query(query, { id: answers.id }, function(err, res) {

        if(res[0].stock_quantity >= answers.quantity) {

          var adjustedQuantity = res[0].stock_quantity - answers.quantity;
          var query = "UPDATE products SET ? WHERE ?";

          connection.query(query, [{ stock_quantity: adjustedQuantity }, {id: answers.id}], function(err, res) {
            if (err) throw err;
            console.log("------------------------------");
            console.log("Success! you bought the item.");
            console.log("------------------------------");
            console.log("\n\n");
            afterConnection();
          });

        } else {
            console.log("Sorry insufficient quantity!");
            afterConnection();
        }

      });

  });

} 


function displayAllItem(res) {
  console.log('======================= Welcome to Bamazon =============================');
  console.log();
  for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------');
  }
}
  





function updateQuery(answers) {

  var query = "SELECT * FROM products WHERE ?";
  connection.query(query, { id: answers.id }, function(err, res) {
    console.log("quantity: " + answers.quantity);
    var adjustedQuantity = res[0].stock_quantity - answers.quantity;
    // var adjustedQuantity = 100000;
    console.log("adjustedQuantity: " + adjustedQuantity);

    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{ stock_quantity: adjustedQuantity }, {id: answers.id}], function(err, res) {
      // console.log(res);
      // displayAllItem(res);
      // startBamazon();
      // console.log(res);
      // displayAllItem(res);
    });

  });

};


function selectQuery(answers) {

  var query = "SELECT product_name FROM products WHERE ?";
  connection.query(query, { id: answers.id }, function(err, res) {
    console.log(res);
    startBamazon();
  });

}

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: 100
      },
      {
        id: 2
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      console.log(res);
      // connection.end();
      // Call deleteProduct AFTER the UPDATE completes
      // deleteProduct();
    }
  );

  // logs the actual query being run
  // console.log(query.sql);
}






