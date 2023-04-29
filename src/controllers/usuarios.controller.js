import { pool } from "../db.js"


export const getClientes = async (req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM Clientes')
    res.json(rows)
    } catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    })
    }
}

export const getCliente = async (req, res) => {
try {
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE id = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
        message: 'Usuario not fund'
    })
    res.json(rows[0])
} catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    })
    
}
} 

export const createClientes = async (req, res) => {
    const { nombre, sueldo } = req.body
   try {
    const [rows] = await pool.query('INSERT INTO Clientes  (nombre, sueldo) VALUES (?, ?)', [nombre, sueldo])
    res.send({
     id: rows.insertId,
     nombre,
     sueldo,
    })
   } catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    }) 
   }
}

export const deleteClientes = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Clientes WHERE id = ?', [req.params.id])
    if (result.affectedRows <= 0) return res.status(404).json({
      message: 'Usuario not found'  
    })
    res.send(204)
  } catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    }) 
  }
}

export const updateClientes = async (req, res) => {
    const {id} = req.params
    const {nombre, sueldo} = req.body
try {
    const [result] = await pool.query('UPDATE Clientes SET nombre = IFNULL(?, nombre), sueldo = IFNULL(?, sueldo) WHERE id = ?',
    [nombre, sueldo, id])

    console.log(result);
    if (result.affectedRows === 0) return res.status(404).json({
      message: "Usuario not found"  
    })
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE id = ?', [id])
    res.json(rows[0]) 
} catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    })  
} 
}

