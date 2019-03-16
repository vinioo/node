const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Posts')

// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    // Body Parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
// Rotas
    app.get('/', (req, res) => {
        Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
            res.render('home', {posts: posts})
        })
    })

    app.get('/cad', (req, res) => {
        res.render('formulario')
    })

    app.post('/add', (req, res) => {
       Post.create({
           titulo: req.body.titulo,
           conteudo: req.body.conteudo
       }).then(() => {
            res.redirect('/')
       }).catch((error) => {
            res.send("Houve um erro" + erro)
       })
    })

    app.get('/deletar/:id', (req,res) => {
        Post.destroy({where: {'id': req.params.id}}).then(() => {
            res.send("Postagem deletada com sucesso!")
        }).catch((error) => {
            res.send("Esta postagem não existe!")
        })
    })

app.listen(8081, () => {
    console.log("Servidor rodando na porta 8081!")
})


