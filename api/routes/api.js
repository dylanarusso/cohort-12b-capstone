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


// GET - Fetch questions - /api/v1/categories/:categoryId/questions
router.get('/categories/:categoryId/questions', async function(req, res, next) {
    // Figure this part out
});

// POST - Create questions - /api/v1/categories/:categoryId/questions
router.get('/categories/:categoryId/questions', async function(req, res, next) {
    // Figure this part out
});

// GET - Fetch answers - /api/v1/questions/:questionId/answers
router.get('/questions/:questionId/answers', async function(req, res, next) {
    // Figure this part out
});

// POST - Create answers - /api/v1/questions/:questionId/answers
router.get('/questions/:questionId/answers', async function(req, res, next) {
    // Figure this part out
});


module.exports = router;