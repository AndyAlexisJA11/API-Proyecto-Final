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
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE ID_Cliente = ?', [req.params.ID_Cliente])
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
    const { Nombre, Apellido, Direccion, Telefono } = req.body
   try {
    const [rows] = await pool.query('INSERT INTO Clientes  (Nombre, Apellido, Direccion, Telefono) VALUES (?, ?, ?, ?)', [Nombre, Apellido, Direccion, Telefono])
    res.send({
     ID_Cliente: rows.insertId,
     Nombre,
     Apellido,
     Direccion,
     Telefono,
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
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
        message: "Something goes wrong"
    }) 
  }
}


// actualizacion de ddatos
/* export const updateClientes = async (req, res) => {
    const {ID_Cliente} = req.params
    const {Nombre, Apellido, Direccion, Telefono} = req.body
try {
    const [result] = await pool.query('UPDATE Clientes SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido), Direccion = IFNULL(?, Direccion), Telefono = IFNULL(?, Telefono)  WHERE ID_Cliente = ?',
    [ID_Cliente, Nombre, Apellido, Direccion, Telefono])

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
} */
// aqui termina 
export const updateClientes = async (req, res) => {
    const { ID_Cliente } = req.params;
    const { Nombre, Apellido, Direccion, Telefono } = req.body;

    try {
        // Validación de datos
        if (!Nombre || !Apellido || !Direccion || !Telefono) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const [result] = await pool.query(
            'UPDATE Clientes SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido), Direccion = IFNULL(?, Direccion), Telefono = IFNULL(?, Telefono) WHERE ID_Cliente = ?',
            [Nombre, Apellido, Direccion, Telefono, ID_Cliente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario not found",
            });
        }

        const [rows] = await pool.query('SELECT * FROM Clientes WHERE ID_Cliente = ?', [ID_Cliente]);

        res.json({
            success: true,
            data: rows[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred",
        });
    }
};
