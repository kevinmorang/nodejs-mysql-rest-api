import { pool } from "../db.js";

export const obtieneEmpleados = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT * FROM EMPLEADOS");
        res.json(resultado);        
    } catch (error) {
        res.status(500).json({
            "mensaje": "Algo ha salido mal"
        });
    };
};

export const obtieneEmpleado = async (req, res) => {
    try {
        const {id} = req.params;
        const [resultado] = await pool.query("SELECT * FROM EMPLEADOS WHERE ID_USUARIO = ?", [id]);
        if (resultado.length <= 0){
            return res.status(404).json({
                "codigo": 1001,
                "mensaje": "Empleado no encontrado"
            });
        };
        res.json(resultado[0]);
    } catch (error) {
        res.status(500).json({
            "mensaje": "Algo ha salido mal"
        });
    };
};

export const registraEmpleados = async (req, res) => {
    try {
        const {nombre, salario} = req.body;
        const [resultado] = await pool.query("INSERT INTO EMPLEADOS (NOMBRE, SALARIO) VALUES (?,?)", [nombre, salario]);
        res.send({
            "id": resultado.insertId,
            "nombre": nombre,
            "salario": salario,
        });
    } catch (error) {
        res.status(500).json({
            "mensaje": "Algo ha salido mal"
        });
    };
};

export const actualizaEmpleados = async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre, salario} = req.body;
        const [resultado] = await pool.query("UPDATE EMPLEADOS SET NOMBRE = IFNULL(?,NOMBRE), SALARIO = IFNULL(?,SALARIO) WHERE ID_USUARIO= ? ",[nombre, salario, id]);

        if(resultado.affectedRows < 1){
            return res.status(404).json({
                "codigo": 1002,
                "mensaje": "Empleado no encontrado"
            });        
        };
        const [registros] = await pool.query("SELECT * FROM EMPLEADOS WHERE ID_USUARIO = ?", [id]);
        res.json(registros[0]);
    } catch (error) {
        
    };
};

export const eliminaEmpleados = async (req, res) =>{
    try {
        const {id} = req.params;
        const [resultado] = await pool.query("DELETE FROM EMPLEADOS WHERE ID_USUARIO = ?",[id]);

        if(resultado.affectedRows < 1) {
            return res.status(404).json({
                "codigo": 1001,
                "mensaje": "Empleado no encontrado"});
        };
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            "mensaje": "Algo ha salido mal"
        });
    };
};