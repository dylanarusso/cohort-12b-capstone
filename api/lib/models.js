const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../lib/db');


class User extends Model {

}

User.init({
    // Model attributes are defined here
    email: {
        type: 'LONGTEXT',
        // allowNull: false
    },
    password: {
        type: 'LONGTEXT',
        // allowNull: false
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
});


class Category extends Model {

}

Category.init ({
    name: {
        type:'LONGTEXT',
    },

}, {
    //Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Category', // We need to choose the model name
});

class Question extends Model {

}

Question.init ({
    questionTxt: {
        type: 'LONGTEXT',
    }

}, {
    //Other model options go here
    sequelize, // We need to pass the connect instance
    modelName: 'Question', // We nned to choose the model name
});

class Answer extends Model {

}

Answer.init ({
    answerTxt: {
        type: 'LONGTEXT',
    }

}, {
    //Other model options go here
    sequelize, // We need to pass the connect instance
    modelName: 'Answer', // We nned to choose the model name
});


Category.hasMany(Question,{foreignKey: 'categoryId'});
Question.belongsTo(Category, {foreignKey: 'categoryId'});

Question.hasMany(Answer, {foreignKey: 'questionId'});
Answer.belongsTo(Question, {foreignKey: 'questionId'});

const seedCategories = async () => {
    let categories = await Category.findAll({})
    if(categories.length == 0){
        await Category.create({name: 'Category 1'});
        await Category.create({name: 'Category 2'});
        await Category.create({name: 'Category 3'});
        await Category.create({name: 'Category 4'});
        await Category.create({name: 'Category 5'});
    }
};
seedCategories();

sequelize.sync({alter: true});

module.exports = {
    Category, Question, Answer, User
};