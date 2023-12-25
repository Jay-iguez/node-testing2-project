const db = require('../../data/db-config')
const Dogs_model = require('./dogs_model')


const check_query_param = (req, res, next) => {
    const { database } = req.query

    if (database === undefined || database.trim() === '') {
        next({ status: 400, message: 'Database not provided!' })
    } else {
        res.locals.database = database
        next()
    }
}

const check_body_dogs = (req, res, next) => {
    const { dog_name, dog_breed, dog_lbs, dog_sheds, office_id } = req.body

    const needed_params = [dog_name, dog_breed, dog_lbs, dog_sheds, office_id]

    let undefined_param = undefined

    for (let i = 0; i < needed_params.length; i++) {
        if (needed_params[i] === undefined || typeof needed_params[i] === 'string' ? needed_params[i].trim() === '' : needed_params[i] === 0) {
            undefined_param = needed_params[i]
            break
        }
    }

    if (undefined_param !== undefined) {
        next({ status: 400, message: "Make sure needed body is not undefined and provided" })
    } else {
        next()
    }
}

const check_dog_exists = async (req, res, next) => {

    if (res.locals.database !== 'dogs') {
        next({ status: 400, message: "Provided query must match endpoint!" })
    } else {
        const dog = await Dogs_model.get_by_id(req.params.id, res.locals.database)

        if (!dog) {
            next({ status: 404, message: "This dog of id: " + req.params.id + " does not exist!" })
        } else {
            next()
        }
    }
}

module.exports = {
    check_query_param,
    check_body_dogs,
    check_dog_exists
}