const { Router } = require('express')

const cartRouter = Router()


const carts = []


// GET http://localhost:xxxx /api/usuarios  /
cartRouter.get('/', (req, res)=>{
    
    res.send('get de usuarios')
})

// POST http://localhost:xxxx /api/usuarios  /
cartRouter.post('/', (req, res)=>{
    const {name, last_name, email, phone} = req.body
    users.push({ id:Date.now(), name, last_name,email, phone })
    return res.json({
        status: 'success',
        message: 'usuario agregado correctamente',
        users
    })
})

module.exports = { 
    cartRouter
}