import { getConnection } from "../database/connection.js";
import sql from "mssql";

export const getProducts = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM products')
    res.json(result.recordset)
}

export const getProduct = async (req, res) => {
    console.log(req.params.id)

    const pool = await getConnection()
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('SELECT * FROM products WHERE id = @id')
    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(400).json({ message: "producto no encontrado" })
    }

    return res.json(result.recordset[0])
}

export const createProduct = async (req, res) => {
    console.log(req.body)

    const pool = await getConnection()
    const result = await pool.request()
        .input('name', sql.VarChar, req.body.name)
        .input('descripcion', sql.Text, req.body.descripcion)
        .input('quantity', sql.Int, req.body.quantity)
        .input('price', sql.Decimal, req.body.price)
        .query('INSERT INTO products (name, descripcion, quantity, price) VALUES (@name, @descripcion, @quantity, @price); SELECT SCOPE_IDENTITY() AS id;') //con este select hay el id en recordset
    console.log(result)
    res.json({
        id: result.recordset[0].id,
        name: req.body.name,
        descripcion: req.body.descripcion,
        quantity: req.body.quantity,
        price: req.body.price
    })
}

export const updateProduct = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.name)
        .input("descripcion", sql.Text, req.body.descripcion)
        .input("quantity", sql.Int, req.body.quantity)
        .input("price", sql.Decimal, req.body.price)
        .query("UPDATE products SET name = @name, descripcion = @descripcion, quantity = @quantity, price = @price WHERE id = @id")
    console.log(result)

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "producto no encontrado" })
    }

    return res.json({
        id: req.params.id,
        name: req.body.name,
        descripcion: req.body.descripcion,
        quantity: req.body.quantity,
        price: req.body.price
    })

}

export const deleteProduct = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('DELETE FROM products WHERE id = @id')

    console.log(result)
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "producto no encontrado" })
    }
    return res.json({ message: "producto eliminado" })
}