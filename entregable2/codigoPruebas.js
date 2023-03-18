const ProductManager = require("./ProductManager.js");

let prodManager = new ProductManager("./files/Productos.json");

const prueba = async () => {
	await prodManager.getProducts();

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

	await prodManager.addProduct(new Product(pruebaProducto1));
	await prodManager.getProducts();
	await prodManager.getProductByID(1);

	await prodManager.addProduct(new Product(pruebaProducto2));
	await prodManager.getProducts();
	await prodManager.getProductByID(2);
	await prodManager.getProductByID(3);

	await prodManager.addProduct(new Product(pruebaProductoExiste));

	await prodManager.updateProduct({
		id: 1,
		title: "producto prueba",
		description: "Este es un producto que existe pero mejorado",
		price: 400,
		thumbnail: "Sin imagen",
		code: "abc123",
		stock: 534,
	});

	await prodManager.deleteProduct(1);
	await prodManager.deleteProduct(3);
};
prueba();
