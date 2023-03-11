const ProductManager = require("./ProductManager.js")

let producto1 = new ProductManager("./files/Productos.json");

const prueba = async () => {

	await producto1.getProducts();

	let pruebaProducto1 = {
		title: "producto prueba",
		description: "Este es un producto prueba",
		price: 200,
		thumbnail: "Sin imagen",
		code: "abc123",
		stock: 25,
	};

	let pruebaProducto2 = {
		title: "producto prueba 2",
		description: "Este es un producto prueba 2",
		price: 300,
		thumbnail: "Sin imagen",
		code: "abc124",
		stock: 2,
	};

	let pruebaProductoExiste = {
		title: "producto prueba existe",
		description: "Este es un producto que existe",
		price: 400,
		thumbnail: "Sin imagen",
		code: "abc123",
		stock: 5,
	};

	let pruebaProductoUpdate = {
		title: "producto prueba",
		description: "Este es un producto que existe pero mejorado",
		price: 400,
		thumbnail: "Sin imagen",
		code: "abc123",
		stock: 534,
	};

	await producto1.addProduct(pruebaProducto1);
	await producto1.getProducts();
	await producto1.getProductByID(1);

	await producto1.addProduct(pruebaProducto2);
	await producto1.getProducts();
	await producto1.getProductByID(2);
	await producto1.getProductByID(3);

	await producto1.addProduct(pruebaProductoExiste);

	await producto1.updateProduct({
		id: 1,
		title: "producto prueba",
		description: "Este es un producto que existe pero mejorado",
		price: 400,
		thumbnail: "Sin imagen",
		code: "abc123",
		stock: 534,
	});

	await producto1.deleteProduct(1)
	await producto1.deleteProduct(3)
};
prueba();
