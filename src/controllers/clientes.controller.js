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
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE ID_Cliente = ?', [req.params.id])
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
    const { Nombre, Apellido } = req.body
   try {
    const [rows] = await pool.query('INSERT INTO Clientes  (Nombre, Apellido) VALUES (?, ?)', [Nombre, Apellido])
    res.send({
     id: rows.insertId,
     Nombre,
     Apellido,
    })
   } catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    }) 
   }
}

export const deleteClientes = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Clientes WHERE ID_Cliente = ?', [req.params.ID_Cliente])
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
    const {ID_Cliente} = req.params
    const {Nombre, Apellido} = req.body
try {
    const [result] = await pool.query('UPDATE Clientes SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido) WHERE ID_Cliente = ?',
    [Nombre, Apellido, ID_Cliente])

    console.log(result);
    if (result.affectedRows === 0) return res.status(404).json({
      message: "Usuario not found"  
    })
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE ID_Cliente = ?', [ID_Cliente])
    res.json(rows[0]) 
} catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    })  
} 
}

