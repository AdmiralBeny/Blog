//Carregando Modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const app = express()
    const admin = require("./routes/admin")
    const path = require("path")
    const mongoose = require('mongoose')
    const session = require("express-session")
    const flash = require('connect-flash')

// Configurações
    // Sessão
        app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
        }))
        app.use(flash())
    // Middleware
        app.use((req, res, next) =>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    // (Express moderno ja vem com bodyparser)
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
    // Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Mongoose
        mongoose.connect('mongodb://27017/blogapp').then(() =>{
            console.log('Conectando ao Mongo')
        }).catch((err)=>{
            console.log("Erro ao se conectar: "+err)
        })
    // Public
        app.use(express.static(path.join(__dirname,"public")))

        app.use((req, res, next)=> {
            console.log("Oi eu sou um middleware")
            next()
        })
//Rotas
    app.get('/', (req, res) =>{
        res.send('Rota Principal')
    })

    app.get('/posts', (req, res)=>{
        res.send('Lista de Posts')
    })
    app.use('/admin', admin)


//Outros
const PORT = 8081
app.listen(PORT, ()=> {
    console.log('Servidor rodando!')
})
