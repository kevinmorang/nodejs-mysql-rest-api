import express from 'express';
import empleadosRutas from './routes/empleados.routes.js';
import indexRutas from './routes/index.routes.js';

const app = express();

app.use(express.json());
app.use('/api',empleadosRutas);
app.use('/api',indexRutas);

app.use((req,res) => {
    res.status(404).json({
        "mensaje": "Endpoint Not Found"
    });
});

export default app;