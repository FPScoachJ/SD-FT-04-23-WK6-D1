require("dotenv").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "users",
  user: "postgres",
  password: process.env.DB_PASSWORD,
});

app.use(express.json());

// Your routes will go here...
//Recipe Routes
//Get Recipes
app.get("/get_recipes", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    client.query(`SELECT * FROM recipes;`, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Create Recipe
app.post("/create_recipe", (req, res) => {
  const recipeName = req.body.recipeName;
  console.log(recipeName);

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `INSERT INTO recipes (recipe_name) VALUES ($1);`;
    const values = [recipeName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Get Recipe by ID
app.get("/get_recipes/:id", (req, res) => {
  const { id } = req.params;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `SELECT * FROM recipes WHERE id = $1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Update Recipe By ID
app.put("/update_recipe/:id", (req, res) => {
  const { id } = req.params;
  const recipeName = req.body.recipeName;
  const newRecipeName = req.body.newRecipeName;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `Update recipes SET recipe_name=$2 WHERE recipe_name =$1`;
    const values = [recipeName, newRecipeName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Delete a recipe by ID:
app.delete("/delete_recipe/:id", (req, res) => {
  const { id } = req.params;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `DELETE FROM recipes WHERE id=$1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Customer Routes
//Get Customers
app.get("/get_customers", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    client.query(`SELECT * FROM customers;`, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Create a customer
app.post("/create_customer", (req, res) => {
  const customerName = req.body.customerName;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `INSERT INTO customers (customer_name) VALUES ($1);`;
    const values = [customerName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Get Customer by ID
app.get("/get_customers/:id", (req, res) => {
  const { id } = req.params;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `SELECT * FROM customers WHERE id = $1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Update Customer By ID
app.put("/update_customer/:id", (req, res) => {
  const { id } = req.params;
  const customerName = req.body.customerName;
  const newCustomerName = req.body.newCustomerName;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `Update customers SET customer_name=$2 WHERE customer_name =$1`;
    const values = [customerName, newCustomerName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Delete a customer by ID:
app.delete("/delete_customer/:id", (req, res) => {
  const { id } = req.params;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `DELETE FROM customers WHERE id=$1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Get Orders
// app.get("/get_orders", (req, res) => {
//   pool.connect((err, client, release) => {
//     if (err) {
//       release();
//       console.log("Error connecting to the database:", err);
//       res.status(500).send("Internal service error");
//     }
//     client.query(`SELECT * FROM orders;`, (err, result) => {
//       release();
//       if (err) {
//         console.log("Error in executing the query: ", err);
//         res.status(500).send("Internal server error");
//         return;
//       }
//       res.send(result);
//     });
//   });
// });

app.get("/get_orders", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    client.query(
      `SELECT customers.customer_name, orders.customer_id, orders.recipe_id, recipes.recipe_name
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN recipes ON orders.recipe_id = recipes.id;`,
      (err, result) => {
        release();
        if (err) {
          console.log("Error in executing the query: ", err);
          res.status(500).send("Internal server error");
          return;
        }
        res.send(result);
      }
    );
  });
});

//Create Order
app.post("/create_order", (req, res) => {
  const customerID = req.body.customerID;
  const recipeID = req.body.recipeID;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `INSERT INTO orders (customer_id, recipe_id) VALUES ($1,$2);`;
    const values = [customerID, recipeID];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Get Order by ID
// app.get("/get_orders/:id", (req, res) => {
//   const { id } = req.params;
//   pool.connect((err, client, release) => {
//     if (err) {
//       release();
//       console.log("Error connecting to the database:", err);
//       res.status(500).send("Internal service error");
//     }

//     const sqlQuery = `SELECT * FROM orders WHERE id = $1;`;
//     const values = [id];

//     client.query(sqlQuery, values, (err, result) => {
//       release();
//       if (err) {
//         console.log("Error in executing the query: ", err);
//         res.status(500).send("Internal server error");
//         return;
//       }
//       res.send(result);
//     });
//   });
// });

app.get("/get_orders/:id", (req, res) => {
  const { id } = req.params;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `SELECT customers.customer_name, orders.customer_id, orders.recipe_id, recipes.recipe_name
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN recipes ON orders.recipe_id = recipes.id WHERE orders.id = $1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});
//Update Order By ID
app.put("/update_order/:id", (req, res) => {
  const { id } = req.params;
  const orderID = req.body.orderID;
  const newOrderID = req.body.newOrderID;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `Update orders SET id=$2 WHERE id=$1`;
    const values = [orderID, newOrderID];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Delete an order by ID:
app.delete("/delete_order/:id", (req, res) => {
  const { id } = req.params;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `DELETE FROM orders WHERE id=$1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

// Start the server
const port = 3000; // Update with your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//app.delete("/delete_user/:id", (req, res) => {
//   const { id } = req.params;
//   res.send(id);
// });
