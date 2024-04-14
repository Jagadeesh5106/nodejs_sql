const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodejs_complete','root','jagadeesh99',{
    dialect:'mysql',host:'localhost'
})

module.exports = sequelize