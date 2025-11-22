let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Assignment = require('../models/AssignmentDatabase');
const Assignment_Model = require('../models/AssignmentDatabase');

router.get('/', (async (req, res, next) => {
    try {
        const assignments = await Assignment.find({});
        console.log(assignments);
        res.render('AssignmentDatabase/list', {title: 'Assignments', assignments: assignments});
    } catch (err) {
        console.error(err);
        res.render('AssignmentDatabase/list', {
            error:'Error on server'
        })
    }
}));

router.get('/add',async(req, res, next) => {
    try {
        res.render('JobApplications/add', {title: 'Add Assignment'});
    }
    catch (err) {
        console.error(err);
        res.render('JobApplications/add', {
            error:'Error on server'
        })
    }

})

router.post('/add',async(req, res, next) => {
    try {
        let newAssignment = Assignment_Model({
            "title": req.body.title,
            "course": req.body.course,
            "dueDate": req.body.dueDate,
            "status": req.body.status,
            "priority": req.body.priority,
            "description": req.body.description,
            "timestamp": new Date()
        });
        Assignment_Model.create(newAssignment).then(()=> {
            res.redirect('/applications');
        });
    }
    catch (err) {
        console.error(err);
        res.render('JobApplications/add', {
            error:'Error on server'
        });
    }

});

router.get('/edit/:id',async(req, res, next) => {
    try {
        let id = req.params.id;
        const assignment = await Assignment_Model.findById(id);
        res.render('AssignmentDatabase/edit', {title: 'Edit Assignment', assignment: assignment});
    }
    catch (err) {
        console.error(err);
        res.render('AssignmentDatabase/edit', {
            error:'Error on server'
        })
    }
})

router.post('/edit/:id',async(req, res, next) => {
    try {
        let id = req.params.id;
        let updateData = {
            title: req.body.title,
            course: req.body.course,
            dueDate: req.body.dueDate,
            status: req.body.status,
            priority: req.body.priority,
            description: req.body.description
        };
        await Assignment_Model.findByIdAndUpdate(id, updateData);
        res.redirect('/applications');
    }
    catch (err) {
        console.error(err);
        res.render('AssignmentDatabase/edit', {
            error:'Error on server'
        })
    }
})

router.get('/delete/:id',async(req, res, next) => {
    try {
        let id = req.params.id;
        await Assignment_Model.findByIdAndDelete(id);
        res.redirect('/applications');
    }
    catch (err) {
        console.error(err);
        res.redirect('/applications');
    }
})


module.exports = router;