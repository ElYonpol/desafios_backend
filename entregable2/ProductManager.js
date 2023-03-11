const fs = require("fs");
const path = "./files/Usuarios.json";

class ProductManager {
	static products = [];
	constructor(id, title, description, price, thumbnail, code, stock, ruta) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
		this.ruta = path;
	}

	getProducts = async () => {
		try {
			if (fs.existsSync(path)) {
				const products = await fs.promises.readFile(this.ruta, "utf-8");
				return JSON.parse(products);
			} else {
				return [];
			}
		} catch (error) {
			return [];
		}
	};

	getProductByID = async (id) => {
		const products = await this.getProducts();

		const productFound = products.find((product) => product.id === id);

		if (productFound) {
			console.table(productFound);
			return productFound;
		} else {
			console.error("Product not found");
		}
	};

	addProduct = async (newProduct) => {
		const products = await this.getProducts();

		const [title, description, price, thumbnail, code, stock] = newProduct;

		if (products.length === 0) {
			newProduct.id = 1;
		} else {
			newProduct.id = products[products.length - 1].id + 1;
		}

		let fieldsMissing =
			title.trim().length === 0 ||
			description.trim().length === 0 ||
			price === 0 ||
			thumbnail.trim().length === 0 ||
			code.trim().length === 0 ||
			stock === 0;

		let productExists = products.find((product) => product.code === code);

		if (fieldsMissing) {
			console.log("Debe completar todos los campos");
		} else if (productExists) {
			console.log("El código ingresado ya existe");
		} else {
			let newProduct = new ProductManager(
				id,
				title,
				description,
				price,
				thumbnail,
				code,
				stock
			);
			ProductManager.products.push(newProduct);

			console.log(newProduct);

			products.push(newProduct);
			await fs.promises.writeFile(this.ruta, JSON.stringify(products));

			return newProduct;
		}
	};

	updateProduct = async (productToUpdate) => {
		const products = await this.getProducts();

		const productFound = products.find((product) => product.id === productToUpdate.id);

		if (productFound) {
			//Acá hay que actualizar el producto en el objeto products y grabarlo al archivo
			await fs.promises.writeFile(this.ruta, JSON.stringify(products));
		} else {
			console.error("Product not found");
		}
	};

	deleteProduct = async (productToDeleteID) => {
		const products = await this.getProducts();

		const productFound = products.find((product) => product.id === productToDeleteID);

		if (productFound) {
			//Acá hay que borrar el producto del objeto products y grabarlo al archivo
			await fs.promises.writeFile(this.ruta, JSON.stringify(products));
		} else {
			console.error("Product not found");
		}
	}
}

let producto1 = new ProductManager();

producto1.getProducts();

producto1.addProduct(
	"producto prueba",
	"Este es un producto prueba",
	200,
	"Sin imagen",
	"abc123",
	25
);

let producto2 = new ProductManager();

producto2.getProducts();

producto2.addProduct(
	"producto prueba 2",
	"Descripción",
	300,
	"Sin imagen",
	"def456",
	10
);
producto2.getProducts();
producto1.getProductByID(1);
producto1.getProductByID(3);
