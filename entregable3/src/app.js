const express = require("express");
const ProductManager = require("./ProductManager.js");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = new ProductManager("./files/Productos.json");

app.get("/products", async (req, res) => {
	const productos = await products.getProducts();
	const limit = parseInt(req.query.limit);
	if (!limit) return res.send({ productos });
	const productsFiltered = productos.filter((product) => product.id <= limit);
	res.send({ productsFiltered });
});

app.get("/products/:pid", async (req, res) => {
	const productos = await products.getProducts();
	const productId = parseInt(req.params.pid);
	console.log(productId);

	const producto = productos.find((prod) => prod.id === productId);

	if (!producto)
		return res
			.status(400)
			.send({ status: "error", error: "No se encontró el producto" });

	res.status(200).send({ producto });
});

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error al iniciar el servidor");
	}
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});
