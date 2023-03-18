const express = require("express")

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", (req,res)=>{
    res.send("Hola a todos!!!!")
})

app.get("/products/:pid", (req,res)=>{
    res.send("Hola a todos!!!!")
})

app.get("/bienvenida", (peticion, respuesta) => {
	respuesta.send(
		"<h1 style='color: blue'>Hola Mundo servidor express ejercicio.</h1>"
	);
});




app.listen(PORT, (err) => {
	if (err) {
		console.error("Error al iniciar el servidor");
	}

	console.log(`Servidor iniciado en el puerto ${PORT}`);
});