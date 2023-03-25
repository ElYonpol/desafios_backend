const fs = require("fs");

class CartManager {
	constructor() {
		this.path = "./src/files/carts.json";
	}

	getCarts = async () => {
		try {
			if (fs.existsSync(this.path)) {
				const carts = await fs.promises.readFile(this.path, "utf-8");
				return JSON.parse(carts);
			}
			throw new Error();
		} catch (error) {
			return [];
		}
	};

	getCartByID = async (cid) => {
		const carts = await this.getCarts();

		const cartFound = carts.find((cart) => cart.id === cid);

		if (!cartFound) return console.error("Cart not found");

		console.table(cartFound);

		return cartFound;
	};

	addProductToCart = async (cid, pid) => {
		try {
			const carts = await this.getCarts();

			const cartFoundIndex = carts.findIndex((cart) => cart.id === cid);

			if (cartFoundIndex === -1) return console.error("Cart not found");

			const productFoundIndex = carts[cartFoundIndex].products.findIndex(
				(prod) => prod.id === pid
			);
			if (productFoundIndex === -1) {
				carts[cartFoundIndex].products.push({ id: pid, quantity: 1 });
			} else {
				carts[cartFoundIndex].products[productFoundIndex].quantity += 1;
			}

			// carts[cartFoundIndex] = {
			// 	...carts[cartFoundIndex],
			// 	...cartToUpdate,
			// };
			// console.log("El carrito actualizado es:", carts[cartFoundIndex]);

			await fs.promises.writeFile(
				this.path,
				JSON.stringify(carts, null, 2),
				"utf-8"
			);
		} catch (error) {}
	};

	addCart = async (newCart) => {
		const carts = await this.getCarts();

		carts.length === 0
			? (newCart.id = 1)
			: (newCart.id = carts[carts.length - 1].id + 1);

		carts.push({ id: newCart.id, ...newCart });

		await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

		return carts;
	};

	updateCart = async (cartToUpdate) => {
		const { id } = cartToUpdate;
		console.log(id);
		const carts = await this.getCarts();

		const cartFoundIndex = carts.findIndex((cart) => cart.id === id);
		if (cartFoundIndex === -1) return console.error("Cart not found");

		carts[cartFoundIndex] = {
			...carts[cartFoundIndex],
			...cartToUpdate,
		};
		console.log("El carrito actualizado es:", carts[cartFoundIndex]);

		await fs.promises.writeFile(this.path, JSON.stringify(carts));
	};

	deleteCart = async (IdCartToDelete) => {
		const carts = await this.getCarts();

		const cartFoundIndex = carts.findIndex(
			(cart) => cart.id === IdCartToDelete
		);

		if (cartFoundIndex === -1) return console.error("Cart not found");
		console.log("El carrito a eliminar es:", carts[cartFoundIndex]);
		carts.splice(cartFoundIndex, 1);

		await fs.promises.writeFile(this.path, JSON.stringify(carts));
	};
}

module.exports = CartManager;
