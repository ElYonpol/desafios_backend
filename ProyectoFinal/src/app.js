const express = require("express");
const ProductManager = require("./Daos/ProductDaos/ProductManager.js");
const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
// handlebars config _______________________________________________________
const handlebars = require("express-handlebars");

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// handlebars config _______________________________________________________

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/public"));

app.use("api/products/", productsRouter);
app.use("api/carts/", cartRouter);

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error al iniciar el servidor");
	}
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});
