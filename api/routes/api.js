var express = require('express');
var router = express.Router();
let models = require('../lib/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET - Fetch categories - /api/v1/categories
// GET - Fetch questions - /api/v1/categories/:categoryId/questions
// POST - Create questions - /api/v1/categories/:categoryId/questions
// GET - Fetch answers - /api/v1/questions/:questionId/answers
// POST - Create answers - /api/v1/questions/:questionId/answers


// GET - Fetch categories - /api/v1/categories
router.get('/categories', async function(req, res, next) {
    let categories = await models.Category.findAll({});
    res.json(categories);
});


// POST - Create questions - /api/v1/categories/:categoryId/questions
router.post('/categories/:categoryId/questions', async function(req, res, next) {
    console.log('req.body', req.body);
    let question = await models.Question.create({questionTxt: req.body.questionTxt, categoryId: req.params.categoryId});
    res.json(question);
});

// GET - Fetch questions - /api/v1/categories/:categoryId/questions
router.get('/categories/:categoryId/questions', async function(req, res, next) {
    let questions = await models.Question.findAll({where: {categoryId: req.params.categoryId}});
    res.json(questions);
});

// GET - Fetch answers - /api/v1/questions/:questionId/answers
router.get('/questions/:questionId/answers', async function(req, res, next) {
    let answers = await Answer.findAll({where: {questionId: req.params.questionId}})
    res.json(answers);
});

// POST - Create answers - /api/v1/questions/:questionId/answers
router.post('/questions/:questionId/answers', async function(req, res, next) {
    let answer = await models.Answer.create({answerTxt: req.body.questionTxt, questionId: req.params.questionId});
    res.json(answer);
});


module.exports = router;