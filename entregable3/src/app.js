const express = require("express");
const ProductManager = require("./ProductManager.js");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = new ProductManager("./files/Productos.json");

app.get("/products", async (req, res) => {
	const productos = await products.getProducts();
	res.send({ productos });
});

app.get("/products/:pid", async (req, res) => {
	const productos = await products.getProducts();
	const { pid } = req.params;
	console.log(pid);

	const producto = productos.find((prod) => prod.id === pid);

	if (!producto) return res.status(400).send("No se encontró el producto.");

	res.status(200).send({ producto });
});

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error al iniciar el servidor");
	}
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});
