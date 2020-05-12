const router = require('express').Router();
const db = require("../data/dbConfig.js");

router.get('/', (req, res) => {
    return db('accounts')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        })
})

router.get('/:id', (req, res) => {
    return db('accounts')
        .where({ id : req.params.id })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        })
})

router.post('/', (req, res) => {
    const { name, budget } = req.body;
    if(!name || !budget) {
        return res.status(500).json({ message: "Invalid name or budget. Cannot be blank." })
    }
    return db('accounts')
        .insert({ name, budget })
        .then(response => {
            return db('accounts').where({ id:parseInt(response) })
            .then(response => {
                res.status(201).json(response)
            })
            .catch(error => {
                res.status(500).json({ message: error })
            })
        })

})

router.put('/:id', (req, res) => {
    return db('accounts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        })
})

router.delete('/:id', (req, res) => {
    return db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" })
        })
})

module.exports = router;