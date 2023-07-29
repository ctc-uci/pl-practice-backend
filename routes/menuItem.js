const express = require('express');
const db = require('../server/db');

const menuItemRouter = express.Router();

menuItemRouter.get('/', async (req, res) => {
    try {
        const allMenuItems = await db.query(`
            SELECT * FROM public."MenuItem";
        `);
        res.status(200).send(allMenuItems.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET menu item by id
menuItemRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await db.query('SELECT * FROM public."MenuItem" WHERE id = $1', [id]);
        res.status(200).send(menuItem.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create new menu item
menuItemRouter.post('/add-menu-item', async (req, res) => {
    console.log('This is what just got sent:');
    console.log(req);
    const { name, description, tags, type, calories, total_fat, saturated_fat, sodium, carbs, fiber, sugar, protien } = req.body;
    try {
        const newMenuItem = await db.query(`
            INSERT INTO public."MenuItem" (name, description, tags, type, calories, total_fat, saturated_fat, sodium, carbs, fiber, sugar, protien)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`, [name, description, tags, type, calories, total_fat, saturated_fat, sodium, carbs, fiber, sugar, protien]
        );
        res.status(201).json({
            status: "Success",
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            msg: err.message
        })
    }
});

// UPDATE menu item row
menuItemRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, tags, type, calories, total_fat, saturated_fat, sodium, carbs, fiber, sugar, protien } = req.body;
        console.log(req.body);

        const updatedMenuItem = await db.query(
            `UPDATE "MenuItem" SET
            name = $1, 
            description = $2,
            tags = $3,
            type = $4,
            calories = $5,
            total_fat = $6,
            saturated_fat = $7,
            sodium = $8,
            carbs = $9,
            fiber = $10,
            sugar = $11,
            protien = $12
            WHERE id = $13
            RETURNING *;`,
            [name, description, tags, type, calories, total_fat, saturated_fat, sodium, carbs, fiber, sugar, protien, id],
        );
        return res.status(200).send(updatedMenuItem.rows[0]);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

// DELETE a menu item
menuItemRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM public."MenuItem" WHERE id = $1', [id]);
        res.status(200).send('Deleted menu item');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = menuItemRouter;
