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
});

connection.connect(function(err) {
  if (err) {
    throw err;
  };
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {

  startBamazon();

}


function startBamazon() {
  // displayAllItem(res);
  inquirer.prompt([
    {
      type: 'list', 
      name: "menu",
      message: "Mr. Manager, what would you like to do today?",
      choices: ['View Products for Sale',
      'View Low Inventory',
      'Add to Inventory',
      'Add New Product']

    }]).then(function(answers) {

       switch(answers.menu) {
          case("View Products for Sale"):
            displayAllItem();
            break;
          case("View Low Inventory"):
            displayLowInv();
            break;  
        }

  });

}


// function addNewProduct() {

//   var query2 = "SELECT * FROM products";
//   connection.query(query2, function(err, res) {
//     console.log('======================= Welcome to Bamazon =============================');
//     console.log();
//     for (var i = 0; i < res.length; i++) {
//         console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
//         console.log('--------------------------------------------------------------------------------------------------');
//     }
//    startBamazon(res);
//   });

// }


function displayLowInv() {

  // console.log("low Inventory");
  var query2 = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query2, function(err, res) {
    console.log('======================= Welcome to Bamazon =============================');
    console.log();
    for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------');
    }
   startBamazon(res);
  });

}


function displayAllItem() {

  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    console.log('======================= Welcome to Bamazon =============================');
    console.log();
    for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------');
    }
   startBamazon(res);
  });

}
  
