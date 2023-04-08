import { pool } from "../db.js";

export const ping = async (req,res)=>{
    const [resultado] = await pool.query('SELECT "Pong" AS Resultado');
    res.json(resultado[0]);
};