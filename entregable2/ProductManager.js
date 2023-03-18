const fs = require("fs");

class ProductManager {
	constructor(ruta) {
		this.ruta = ruta;
	}

	getProducts = async () => {
		try {
			if (fs.existsSync(this.ruta)) {
				const products = await fs.promises.readFile(this.ruta, "utf-8");
				console.table(JSON.parse(products));
				return JSON.parse(products);
			}
			throw new Error();
		} catch (error) {
			return [];
		}
	};

	getProductByID = async (id) => {
		const products = await this.getProducts();

		const productFound = products.find((product) => product.id === id);

		if (!productFound) return console.error("Product not found");

		console.table(productFound);

		return productFound;
	};

	addProduct = async (newProduct) => {
		const products = await this.getProducts();

		const { title, description, price, thumbnail, code, stock } = newProduct;

		products.length === 0
			? (newProduct.id = 1)
			: (newProduct.id = products[products.length - 1].id + 1);

		let areFieldsMissing =
			!newProduct.title ||
			!newProduct.description ||
			!newProduct.price ||
			!newProduct.thumbnail ||
			!newProduct.code;

		let productExists = products.some((prod) => prod.code === newProduct.code);

		if (areFieldsMissing) {
			console.log("Debe completar todos los campos");
		} else if (productExists) {
			console.log("El código ingresado ya existe");
		} else {
			products.push(newProduct);

			await fs.promises.writeFile(this.ruta, JSON.stringify(products));

			return newProduct;
		}
	};

	updateProduct = async (productToUpdate) => {
		const { id } = productToUpdate;
		console.log(id);
		const products = await this.getProducts();

		const productFoundIndex = products.findIndex(
			(product) => product.id === id
		);
		if (productFoundIndex === -1) return console.error("Product not found");

		products[productFoundIndex] = {
			...products[productFoundIndex],
			...productToUpdate,
		};
		console.log("El Producto actualizado es:", products[productFoundIndex]);

		await fs.promises.writeFile(this.ruta, JSON.stringify(products));
	};

	deleteProduct = async (IdProductToDelete) => {
		const products = await this.getProducts();

		const productFoundIndex = products.findIndex(
			(product) => product.id === IdProductToDelete
		);

		if (productFoundIndex === -1) return console.error("Product not found");
		console.log("El producto a eliminar es:", products[productFoundIndex]);
		products.splice(productFoundIndex, 1);

		await fs.promises.writeFile(this.ruta, JSON.stringify(products));
	};
}

/* Código para pruebas */

/*const prueba = async () => {
	let prodManager = new ProductManager("./files/Productos.json");

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

	await prodManager.addProduct(pruebaProducto1);
	await prodManager.getProducts();
	await prodManager.getProductByID(1);

	await prodManager.addProduct(pruebaProducto2);
	await prodManager.getProducts();
	await prodManager.getProductByID(2);
	await prodManager.getProductByID(3);

	await prodManager.addProduct(pruebaProductoExiste);

	await prodManager.updateProduct({
		id: 1,
		title: "producto prueba",
		description: "Este es un producto que existe pero mejorado",
		price: 400,
		thumbnail: "Sin imagen",
		code: "abc123",
		stock: 534,
	});

	await prodManager.deleteProduct(1)
	await prodManager.deleteProduct(3)
};
prueba(); */
