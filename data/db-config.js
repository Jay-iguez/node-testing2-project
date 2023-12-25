const knex = require('knex')

const config = require('../knexfile')

const env = process.env.NODE_ENV //eslint-disable-line

module.exports = knex(config[env])