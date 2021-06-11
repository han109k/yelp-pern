require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("tiny"));
app.use(express.json());

// node-postgres
const db = require("./db/index");

/**
 * * Restaurant Routes
 * todo: CRUD Operation        METHOD     URL
 * Retrieve All Restaurants     GET     /api/v1/restaurants
 * Retrieve One Restaurant      GET     /api/v1/restaurants/:id
 * Create a Restaurant          POST    /api/v1/restaurants
 * Update a Restaurant          PUT     /api/v1/restaurants/:id
 * Delete a Restaurant         DELETE   /api/v1/restaurants/:id
 *
 */

// Retrieve All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        console.log(results);

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// Retrieve One Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        // console.log(req);
        // * Parameterized query
        const result = await db.query("SELECT * FROM restaurants WHERE id=$1", [
            req.params.id,
        ]);
        // $1 means req.params.id -> SELECT * FROM restaurants WHERE id=req.params.id
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const result = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING (name, location, price_range);",
            [req.body.name, req.body.location, req.body.price_range]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 RETURNING (name, location, price_range);",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Delete a Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
        res.status(204).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch (err) {
        console.log(err);
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening #port ${port}`);
});
