// Import Express and the Assignment model
let express = require('express');
let router = express.Router();
let Assignment = require('../models/AssignmentDatabase'); 

// GET: list all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.render('AssignmentDatabase/list', {
      title: 'Assignments',
      assignments,
      user: req.user || null           // 👈 add this
    });
  } catch (err) {
    console.error(err);
    res.render('AssignmentDatabase/list', {
      title: 'Assignments',
      assignments: [],
      user: req.user || null,          // 👈 and this
      error: 'Error on server'
    });
  }
});

// GET: Add form
router.get('/add', (req, res) => {
    res.render('AssignmentDatabase/add', { title: 'Add Assignment' });
});

// POST: Add assignment
router.post('/add', async (req, res) => {
    try {
        const newAssignment = new Assignment({
            title: req.body.title,
            course: req.body.course,
            dueDate: req.body.dueDate,
            status: req.body.status,
            priority: req.body.priority,
            description: req.body.description,
            timestamp: new Date()
        });

        await newAssignment.save();
        res.redirect('/applications');
    } catch (err) {
        console.error(err);
        res.render('AssignmentDatabase/add', { error: 'Error on server' });
    }
});

// GET: Edit form
router.get('/edit/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.render('AssignmentDatabase/edit', { title: 'Edit Assignment', assignment });
    } catch (err) {
        console.error(err);
        res.render('AssignmentDatabase/edit', { error: 'Error on server' });
    }
});

// POST: Edit assignment
router.post('/edit/:id', async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            course: req.body.course,
            dueDate: req.body.dueDate,
            status: req.body.status,
            priority: req.body.priority,
            description: req.body.description
        });

        res.redirect('/applications');
    } catch (err) {
        console.error(err);
        res.render('AssignmentDatabase/edit', { error: 'Error on server' });
    }
});

// GET: Delete
router.get('/delete/:id', async (req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.redirect('/applications');
    } catch (err) {
        console.error(err);
        res.redirect('/applications');
    }
});

module.exports = router;
