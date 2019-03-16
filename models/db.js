const Sequelize = require('sequelize')
// Conexao com o banco SQL
const sql = new Sequelize('dados','root','vinicius', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sql: sql
}

