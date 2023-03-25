const fs = require("fs");

class ProductManager {
	constructor(path) {
		this.path = path;
	}

	getProducts = async () => {
		try {
			if (fs.existsSync(this.path)) {
				const products = await fs.promises.readFile(this.path, "utf-8");
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

			await fs.promises.writeFile(this.path, JSON.stringify(products));

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

		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};

	deleteProduct = async (IdProductToDelete) => {
		const products = await this.getProducts();

		const productFoundIndex = products.findIndex(
			(product) => product.id === IdProductToDelete
		);

		if (productFoundIndex === -1) return console.error("Product not found");
		console.log("El producto a eliminar es:", products[productFoundIndex]);
		products.splice(productFoundIndex, 1);

		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};
}

module.exports = ProductManager;