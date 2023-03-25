const express = require("express");
const { uploader } = require("../utils/multer");
const ProductManager = require("../Daos/ProductDaos/ProductManager.js");

const productsRouter = express.Router();

const productMgr = new ProductManager("../files/products.json");

productsRouter.get("/api/products", async (req, res) => {
	const resp = await productMgr.getProducts();
	res.send(resp);
});

// productsRouter.post('/', uploader.single('file') ,(req, res)=>{
//     const { title, thumbnail } = req.body

//     return res.json({
//         title,
//         dato1: req.dato1,
//         dato2: req.dato2,
//         thumbnail
//     })
// })

module.exports = productsRouter;
