const express = require('express')
const { check_query_param, check_body_dogs, check_dog_exists } = require('./dogs_middleware')
const Dogs_model = require('./dogs_model')
const dogs = express.Router()

dogs.get('/', check_query_param, async (req, res, next) => {
    try {
        const { database } = req.query

        const data = await Dogs_model.get_all(database)
        res.status(200).json(data)
    } catch (err) {
        next({ status: 500, message: "Error in getting data: " + err.message })
    }
})

dogs.post('/dogs', [check_query_param, check_body_dogs], async (req, res, next) => {
    try {

        if (res.locals.database === 'dogs') {
            const new_dog = await Dogs_model.create(req.body, res.locals.database)
            res.status(201).json(new_dog)
        } else {
            next({status: 400, message: "Provided query must match endpoint!"})
        }
    } catch (err) {
        next({ status: 500, message: "Error in creating new dog: " + err.message })
    }
})

dogs.put('/dogs/:id', [check_query_param, check_dog_exists, check_body_dogs], async (req, res, next) => {
    try {
        if (res.locals.database === 'dogs') {
            const updated_dog = await Dogs_model.update(req.body, req.params.id, res.locals.database)
            res.status(200).json(updated_dog)
        } 
    } catch(err) {
        next({status: 500, message: "Error in updating new dog of id: " + req.params.id + " " + err.message})
    }
})


module.exports = dogs