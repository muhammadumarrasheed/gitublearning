const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Member');

// init Middleware
// const logger = require('./Middleware/logger');
// app.use(logger);


//Get All Members
router.get('/', (req, res) => {
    res.json(members);
});

//get a member
router.get('/:id', (req, res) => {
    const isFound = members.some(member => member.id === req.params.id);
    if (isFound) {
        res.json(members.filter(member => member.id === req.params.id));
    } else {
        res.status(400).json({ msg: `No member found with ${req.params.id} id` });
    }
});

//CREATE Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ message: 'Please fill name and email' });
    }
    members.push(newMember);
    res.json(members);
});


//UPDATE MEMBER
router.put('/:id', (req, res) => {
    const isFound = members.some(member => member.id === req.params.id);
    if (isFound) {
        const updmember = req.body;
        members.forEach(member => {
            if (member.id === req.params.id) {
                member.name = updmember.name ? updmember.name : member.name;
                // member.email = updmember.email ? updmember.email : member.email;
                res.json({ msg: "Member is updated successfully", member });
            }
        });
        res.json(members.filter(member => member.id === req.params.id));
    } else {
        res.status(400).json({ msg: `No member found with ${req.params.id} id` });
    }
});

// Delete member
router.delete('/:id', (req, res) => {
    const isFound = members.some(member => member.id === req.params.id);
    if (isFound) {
        res.json({
            msg: 'Member is deleted successfully',
            members: members.filter(member => member.id !== req.params.id)
        });
    } else {
        res.status(400).json({ msg: `No member found with ${req.params.id} id` });
    }
});
module.exports = router;
module.exports = router;