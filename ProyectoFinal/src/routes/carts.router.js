const express = require("express");
const CartManager = require("../Daos/CartDaos/CartManager");

const cartRouter = Router();

const cartMgr = new CartManager("../files/carts.json");

// const carts = []

// GET http://localhost:xxxx /api/carts  /
cartRouter.get("/api/carts", async (req, res) => {
	const resp = await cartMgr.getCarts();
	res.send(resp);
});

// POST http://localhost:xxxx /api/carts  /
cartRouter.post("/", async (req, res) => {
	const resp = await cartMgr.addCart({ products: [] });
	res.send(resp);
});

cartRouter.get("/:cid", async (req, res) => {
	const { cid } = req.params;
	const resp = await cartMgr.getCartByID(parseInt(cid));
	res.send({ resp });
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
	const { cid, pid } = req.params;
	const resp = await cartMgr.addProductToCart(parseInt(cid), parseInt(pid));
	res.send({ resp });
});

module.exports = cartRouter;
