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

	addProduct(title, description, price, thumbnail, code, stock) {
		let fieldsMissing =
			title.trim().length === 0 ||
			description.trim().length === 0 ||
			price === 0 ||
			thumbnail.trim().length === 0 ||
			code.trim().length === 0 ||
			stock === 0;

		let productExists = ProductManager.products.find(
			(product) => product.code === code
		);

		if (ProductManager.products.length === 0) {
			newProduct.id = 1;
		} else {
			newProduct.id =
				ProductManager.products[ProductManager.products.length - 1].id + 1;
		}

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
		}
	}

	getProducts = () => {
		console.table("Los productos son:", ProductManager.products);
		return ProductManager.products;
	};

	getProductByID = (id) => {
		/* let productFound = []; */
		const productFound = ProductManager.products.find(
			(product) => product.id === id
		);
		if (productFound) {
			console.table(productFound);
			return productFound;
		} else {
			console.error("Product not found");
		}
	};
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
