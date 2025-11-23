var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assignment Tracker' });
});

// /applications  → list page
router.get('/', async (req, res, next) => {
  const assignments = await Assignment.find({});
  res.render('AssignmentDatabase/list', {
    title: 'Assignments',
    assignments
  });
});

// /applications/add → add page
router.get('/add', (req, res, next) => {
  res.render('AssignmentDatabase/add', {
    title: 'Add Assignment'
  });
});


module.exports = router;
