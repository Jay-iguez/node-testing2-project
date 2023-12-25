const db = require('../../data/db-config')
const { create_query_id_body } = require('./dogs_utility')


const get_all = async (table) => {
    return await db(table)
}

const get_by_id = async (id, table) => {
    const id_query = create_query_id_body(table)
    const [fetched_data] = await db(table).where(id_query, id)

    return fetched_data
}

const create = async (body, table) => {

    const [id] = await db(table).insert(body)

    const new_data = await get_by_id(id, table)

    return new_data
}

const update = async (body, id, table) => {
    const id_query = create_query_id_body(table)

    await db(table).update(body).where(id_query, id)

    const new_data = await get_by_id(id, table)

    return new_data
}


module.exports = {
    get_all,
    get_by_id,
    create,
    update
}