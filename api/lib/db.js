// This file deals with connecting to the database

const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('mysql://root:Homerunstre6@localhost/cohort12b-capstone-api', {logging: false});
module.exports = {sequelize};