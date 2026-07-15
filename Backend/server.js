const express = require("express");
const cors = require("cors");
const { sql, config } = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// Prueba de conexión
app.get("/", async (req, res) => {
    try {
        await sql.connect(config);
        res.send("✅ Backend conectado a SQL Server");
    } catch(error) {
        res.status(500).send(error.message);
    }
});


// Buscar imágenes por título
app.get("/galeria/:titulo", async (req, res) => {

    const titulo = req.params.titulo;

    try {

        await sql.connect(config);

        const resultado = await sql.query`
            SELECT 
                ID_IMAGEN,
                TITULO,
                DESCRIPCION,
                CATEGORIA,
                ARCHIVO,
                FECHA
            FROM imagenes
            WHERE TITULO LIKE ${'%' + titulo + '%'}
        `;


        const imagenes = resultado.recordset.map(img => ({
            id: img.ID_IMAGEN,
            titulo: img.TITULO,
            descripcion: img.DESCRIPCION,
            categoria: img.CATEGORIA,
            fecha: img.FECHA,

            // convierte VARBINARY(MAX) a Base64
            imagen: img.ARCHIVO.toString("base64")
        }));


        res.json(imagenes);


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});