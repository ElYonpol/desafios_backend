class Product {
	constructor(title, description, price, thumbnail, code, stock) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
	}
}

class ProductManager {
	constructor() {
		this.products = [];
		this.lastId = 0;
	}

	addProduct(newProduct) {
		let areFieldsMissing =
			!newProduct.title ||
			!newProduct.description ||
			!newProduct.price ||
			!newProduct.thumbnail ||
			!newProduct.code;

		let productExists = this.products.find(
			(prod) => prod.code === newProduct.code
		);

		if (areFieldsMissing) {
			console.log("Debe completar todos los campos");
		} else if (productExists) {
			console.log("El código ingresado ya existe");
		} else {
			newProduct.id = ++this.lastId;
			this.products.push(newProduct);
		}
	}

	getProducts = () => {
		console.table(this.products);
		return this.products.length === 0 ? [] : this.products;
	};

	getProductByID = (id) => {
		const productFound = this.products.find((product) => product.id === id);
		if (productFound) {
			console.table(productFound);
			return productFound;
		} else {
			console.error("Product not found");
			return null;
		}
	};
}

const prodManager = new ProductManager();

prodManager.getProducts();
try {
	prodManager.addProduct(
		new Product(
			"producto prueba",
			"Este es un producto prueba",
			200,
			"Sin imagen",
			"abc123",
			25
		)
	);
} catch (error) {
	console.error(error.message);
}

prodManager.getProducts();
debugger;
try {
	prodManager.addProduct(
		new Product(
			"producto prueba 2",
			"Descripción",
			300,
			"Sin imagen",
			"def456",
			10
		)
	);
} catch (error) {
	console.error(error.message);
}

prodManager.getProducts();
prodManager.getProductByID(1);
prodManager.getProductByID(3);
