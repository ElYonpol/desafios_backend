const fs = require("fs");

class ProductManager {
	constructor(ruta) {
		this.ruta = ruta;
	}

	getProducts = async () => {
		try {
			if (fs.existsSync(this.ruta)) {
				const products = await fs.promises.readFile(this.ruta, "utf-8");
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

		if (products.length === 0) {
			newProduct.id = 1;
		} else {
			newProduct.id = products[products.length - 1].id + 1;
		}

		let areFieldsMissing =
			title.trim().length === 0 ||
			description.trim().length === 0 ||
			price === 0 ||
			thumbnail.trim().length === 0 ||
			code.trim().length === 0 ||
			stock === 0;

		let productExists = products.find((product) => product.code === code);

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

const prueba = async () => {
	let producto1 = new ProductManager("./files/Productos.json");

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

	// await producto1.addProduct(pruebaProducto1);
	// await producto1.getProducts();
	// await producto1.getProductByID(1);

	// await producto1.addProduct(pruebaProducto2);
	// await producto1.getProducts();
	// await producto1.getProductByID(2);
	// await producto1.getProductByID(3);

	//await producto1.addProduct(pruebaProductoExiste);

	// await producto1.updateProduct({
	// 	id: 1,
	// 	title: "producto prueba",
	// 	description: "Este es un producto que existe pero mejorado",
	// 	price: 400,
	// 	thumbnail: "Sin imagen",
	// 	code: "abc123",
	// 	stock: 534,
	// });

	// await producto1.deleteProduct(1)
	// await producto1.deleteProduct(3)
};
prueba();
