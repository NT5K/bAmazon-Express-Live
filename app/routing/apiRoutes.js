
const connection = require("./../public/javascript/connection");
const express = require('express');
const router = express.Router();

module.exports = router;

//===========================================================================
// select all products from table

router.get('/fromdatabase', (__, res) => {
    const query = "Select * FROM products;";
    // query the products database for all products
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('nekorb')
        } else {
            // display json so can grab data using ajax
            return res.json(result);
        };
    });
});

//===========================================================================
// select all products with stock quantity less than 20 units

router.get('/fromdatabase20', (__, res) => {
    const query = "Select * FROM products WHERE stock_quantity <= 20;";
    // query the products database for quantity less than 20
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('brkend');
        } else {
            // display json so can grab data using ajax
            return res.json(result);
        };
    });
});

//===========================================================================
// get the last row in the database 

router.get('/fromdatabaselastrow', (__, res) => {
    const lastRow = "SELECT * FROM products ORDER BY id DESC LIMIT 1;";
    // query the products database for last column in the database
    connection.query(lastRow, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('brokened');
        } else {
             // display json so can grab data using ajax
            return res.json(result);
        };
    });
});

//===========================================================================
// most recent updated column

router.get('/mostrecentitem', (__, result) => {
    const query = "SELECT * FROM products ORDER BY createdAt desc LIMIT 1;";
    // query the products database for latest updated column
    connection.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return res.status(500).send('broken');
        } else {
            // display json so can grab data using ajax for recent item success page
            return result.json(res);
        };
    })
})       

//===========================================================================
// post a new item to the database

router.post("/posttodatabase",(req, res) => {
    const query = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?);";
    const body = [req.body.product, req.body.department, req.body.price, req.body.quantity];
    connection.query(query, body, (err, result) => {
        if (err) {
            // catch error
            return res.status(500).end();
        }
        // return json to display on success page
        return res.json(result);
    });
});

//===========================================================================
// update the quantity of a item

router.put("/addquantity", (req, result) => {

    const itemId = req.body.id;
    const quantity = req.body.quantity;

    const columnQuery = "SELECT * FROM products WHERE id = ?;";

    connection.query(columnQuery, [itemId], (err, res) => { 
        // catch any errors
        if (err) {
            console.log(err);
            return res.status(500).send('oops');
        };

        //stock_quantity from first connection.query is the first ?
        const updateQuery = "UPDATE products SET ? WHERE ?;";

        // add input to the stock_quantity row
        const updateQuantity = res[0].stock_quantity + parseFloat(quantity);

        //object for query
        const updateObject = [
            {
                stock_quantity: updateQuantity
            },
            {
                id: itemId
            }
        ];

        // second query for adding the input quantity to the table
        connection.query(updateQuery, updateObject, (err, data) => {
            // catch any errors
            if (err) {
                console.log(err);
                return res.status(500).send('bfgsder');
            };
            console.log(data);
            return result.json(data);
        });
    });
});

//===========================================================================
// delete a item from the database

router.delete("/delete", (req, res) => {
    const query = "DELETE FROM products WHERE id = ?;";
    connection.query(query, [req.body.id], (err, result) => {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        } else if (result.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        };
        return res.status(200).end();
    });
});
